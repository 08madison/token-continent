# TokenLedger — GitHub Pages Deployment Guide

## Prerequisites

- A GitHub account
- A GitHub Personal Access Token with `repo` scope
- (Optional) A custom domain (e.g., `tokenledger.ai`)

---

## Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `tokenledger` (or `yourusername.github.io` for root domain)
3. Set to **Public** (required for free GitHub Pages)
4. Do NOT initialize with README (we'll push existing code)
5. Click **Create repository**

---

## Step 2: Push the Code

In your terminal, from the project root:

```bash
git init
git add .
git commit -m "Initial TokenLedger launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tokenledger.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 3: Enable GitHub Pages

1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow at `.github/workflows/deploy.yml` will automatically deploy on every push to `main`

---

## Step 4: Configure Custom Domain (Optional)

1. In **Settings** → **Pages**, enter your custom domain (e.g., `tokenledger.ai`)
2. Add a `CNAME` file to `client/public/` with your domain:
   ```
   tokenledger.ai
   ```
3. Configure DNS at your domain registrar:
   ```
   A    @    185.199.108.153
   A    @    185.199.109.153
   A    @    185.199.110.153
   A    @    185.199.111.153
   CNAME  www  YOUR_USERNAME.github.io
   ```
4. Enable **Enforce HTTPS** in Pages settings

---

## Step 5: Update Placeholder URLs

Before launch, update these placeholders in the codebase:

| File | Placeholder | Replace With |
|------|-------------|--------------|
| `client/index.html` | `https://tokenledger.ai/` | Your actual domain |
| `client/src/components/Footer.tsx` | Social media URLs | Your actual social handles |
| `client/src/components/Footer.tsx` | Partner CTAs (`href="#"`) | Your token/GPU partner URLs |
| `client/src/components/Navbar.tsx` | Partner CTAs (`href="#"`) | Your token/GPU partner URLs |
| `client/src/pages/Home.tsx` | Partner CTAs (`href="#"`) | Your token/GPU partner URLs |

---

## Step 6: Submit to Search Engines

After deployment:

1. **Google Search Console**: Add property → verify ownership → submit sitemap at `https://yourdomain.com/sitemap.xml`
2. **Bing Webmaster Tools**: Add site → verify → submit sitemap
3. **Bing IndexNow**: Use the IndexNow API to instantly notify Bing (and ChatGPT) of new articles

---

## Updating Content

To add new articles, edit `client/src/lib/articles.ts` and add entries to the `articles` array. Then:

```bash
git add .
git commit -m "Add new articles: [date]"
git push
```

GitHub Actions will automatically rebuild and deploy within 2–3 minutes.

---

## Environment Variables

The following environment variables are used in the build. Set them in **Settings** → **Secrets and variables** → **Actions** if needed:

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_ANALYTICS_ENDPOINT` | Umami analytics endpoint | Empty (analytics disabled) |
| `VITE_ANALYTICS_WEBSITE_ID` | Umami website ID | Empty |
| `VITE_APP_TITLE` | Browser tab title | TokenLedger — AI & LLM Token Intelligence |
