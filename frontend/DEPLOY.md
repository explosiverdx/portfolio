# Deploying the portfolio

## Build (on your machine or on the VPS)

From **`frontend/`**:

```bash
npm install
SITE_URL=https://yourdomain.com npm run build
```

- Output is **`dist/`** — that entire folder is the static site (HTML, `css/`, `assets/`, `resume/`, `404.html`, `sitemap.xml`, `robots.txt`).
- Biodata is now a React + GSAP app built from `biodata-src/` into `/biodata` automatically during `npm run build`.
- The marriage biodata route is published at **`/biodata`** from `frontend/biodata/index.html` (not linked from homepage).
- **`npm run build:prod`** — minified CSS + `dist` (good for production). Run **`npm run build:css`** afterward if you want a readable `css/main.css` for local dev.

Set **`SITE_URL`** to the **HTTPS hostname** you use on the VPS (no trailing slash), so `sitemap.xml` and `robots.txt` are correct.

---

## Hosting on your own VPS (Nginx + Ubuntu)

### 1. Put files on the server

Example: copy **`dist/`** to `/var/www/portfolio/dist` (adjust paths).

```bash
# From your laptop (example)
rsync -avz --delete ./dist/ user@YOUR_SERVER_IP:/var/www/portfolio/dist/
```

Or build on the server: clone the repo, `cd frontend`, `npm ci`, `SITE_URL=... npm run build`, point Nginx `root` at the resulting **`dist/`**.

```bash
sudo mkdir -p /var/www/portfolio
sudo chown -R $USER:www-data /var/www/portfolio   # group www-data if nginx uses it
```

### 2. Nginx site config

Use **`deploy/nginx-site.conf.example`** as a template:

- Replace **`YOUR_DOMAIN`** (and `server_name`).
- Set **`root`** to the absolute path of **`dist/`** on the VPS.
- **`sudo nginx -t`** then **`sudo systemctl reload nginx`**.

### 3. TLS (Let’s Encrypt)

On the VPS (Certbot + Nginx plugin is typical on Ubuntu):

```bash
sudo apt update && sudo apt install -y certbot python3-certbot-nginx
# Use a temporary HTTP-only server block first if you need HTTP validation,
# or configure DNS then:
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot can install or adjust server blocks; merge with the example config as needed.

### 4. Firewall

Allow **80** and **443** (e.g. `ufw allow 'Nginx Full'` or equivalent).

### 5. Deploy updates later

Rebuild locally or on CI, then **`rsync`** (or `scp`) **`dist/`** again so the live site matches.

---

## After go-live

- Replace placeholder social **`href`s** in **`contact.html`** (rebuild + redeploy **`dist/`**).
- Rebuild with the final **`SITE_URL`** whenever the public URL changes.
- Optional: add **`og:image`** when you have a share image (1200×630 or similar).
