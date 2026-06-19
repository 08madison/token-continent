#!/bin/bash
# Token Continent - One-Click Deployment Script
# Usage: bash deploy.sh
# Requirements: Ubuntu 20.04+, Docker, Docker Compose, Nginx, Certbot

set -e

DOMAIN="tokencontinent.com"
WWW_DOMAIN="www.tokencontinent.com"
APP_DIR="/opt/token-continent"
REPO_URL="https://github.com/08madison/token-continent.git"

echo "=========================================="
echo "  Token Continent Deployment Script"
echo "=========================================="

# 1. Install dependencies
echo "[1/8] Installing dependencies..."
apt-get update -qq
apt-get install -y -qq docker.io docker-compose nginx certbot python3-certbot-nginx git curl

# Start Docker
systemctl start docker
systemctl enable docker

# 2. Clone or update repository
echo "[2/8] Cloning repository..."
if [ -d "$APP_DIR" ]; then
    cd "$APP_DIR" && git pull
else
    git clone "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# 3. Create .env file if not exists
echo "[3/8] Setting up environment..."
if [ ! -f "$APP_DIR/.env" ]; then
    DB_PASS=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 24)
    REDIS_PASS=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 24)
    SESSION_SECRET=$(openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 32)
    cat > "$APP_DIR/.env" << EOF
DB_PASSWORD=$DB_PASS
REDIS_PASSWORD=$REDIS_PASS
SESSION_SECRET=$SESSION_SECRET
EOF
    echo "  Generated secure passwords in .env"
fi

# 4. Build and start Docker containers
echo "[4/8] Building and starting containers..."
cd "$APP_DIR"
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for app to be ready
echo "  Waiting for application to start..."
sleep 15

# 5. Configure Nginx
echo "[5/8] Configuring Nginx..."
cp "$APP_DIR/nginx/tokencontinent.conf" /etc/nginx/sites-available/tokencontinent.conf

# Temporary HTTP-only config for Certbot
cat > /etc/nginx/sites-available/tokencontinent-temp.conf << EOF
server {
    listen 80;
    server_name $DOMAIN $WWW_DOMAIN;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

ln -sf /etc/nginx/sites-available/tokencontinent-temp.conf /etc/nginx/sites-enabled/tokencontinent.conf
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# 6. Obtain SSL certificate
echo "[6/8] Obtaining SSL certificate..."
certbot --nginx -d "$DOMAIN" -d "$WWW_DOMAIN" --non-interactive --agree-tos --email admin@tokencontinent.com --redirect || {
    echo "  SSL certificate failed - continuing with HTTP only"
    echo "  Run: certbot --nginx -d $DOMAIN -d $WWW_DOMAIN manually after DNS propagation"
}

# 7. Apply full Nginx config with SSL
echo "[7/8] Applying full Nginx configuration..."
ln -sf /etc/nginx/sites-available/tokencontinent.conf /etc/nginx/sites-enabled/tokencontinent.conf
nginx -t && systemctl reload nginx || echo "  Nginx config test failed, check SSL certificates"

# 8. Setup auto-renewal
echo "[8/8] Setting up SSL auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx") | crontab -

echo ""
echo "=========================================="
echo "  Deployment Complete!"
echo "=========================================="
echo "  App URL: https://$WWW_DOMAIN"
echo "  Admin:   https://$WWW_DOMAIN/admin"
echo "  Logs:    docker-compose -f $APP_DIR/docker-compose.prod.yml logs -f"
echo "=========================================="
