#!/bin/sh
# entrypoint.sh - startup script with optional password reset support

# If RESET_ADMIN_PASSWORD is set, reset the root user's password before starting
if [ -n "$RESET_ADMIN_PASSWORD" ]; then
  echo "[entrypoint] Resetting admin password..."
  # Generate bcrypt hash using Python (available in the container via wget or pre-installed)
  # We use a pre-computed hash passed via env var RESET_ADMIN_HASH
  if [ -n "$RESET_ADMIN_HASH" ]; then
    sqlite3 /data/one-api.db "UPDATE users SET password='${RESET_ADMIN_HASH}' WHERE role=100;"
    echo "[entrypoint] Password reset complete."
  else
    echo "[entrypoint] RESET_ADMIN_HASH not set, skipping password reset."
  fi
fi

# Start the main application
exec /token-continent "$@"
