# CoupoZ - Landing Page

A modern, static landing page for **CoupoZ** - a time and location-based coupon activation platform for malls, stores, and consumers.

Hosted for free on [GitHub Pages](https://pages.github.com/).

---

## File tree

```
/
  index.html          Main landing page
  404.html            Custom 404 error page
  robots.txt          Search engine crawler instructions
  sitemap.xml         Sitemap for SEO
  CNAME               Custom domain configuration (coupoz.com)
  README.md           This file
  assets/             Image folder (add og-image.png here for social sharing)
  css/
    styles.css        Custom styles and component definitions
  js/
    main.js           Vanilla JS (dark mode, menu, FAQ, animations)
  images/             Legacy image folder (kept for compatibility)
```

---

## A) How to add files to the repository

### Using the GitHub website (no Git needed)

1. Go to [https://github.com/ronile21/coupozWebSite](https://github.com/ronile21/coupozWebSite).
2. Click **Add file** > **Upload files**.
3. Drag and drop your file (image, PDF, etc.) or click to browse.
4. Scroll down, add a short commit message, and click **Commit changes**.

### Using Git on your computer

```bash
# Clone the repo (first time only)
git clone https://github.com/ronile21/coupozWebSite.git
cd coupozWebSite

# Add your file(s)
cp ~/my-image.png assets/

# Stage, commit, and push
git add assets/my-image.png
git commit -m "Add OG image"
git push
```

---

## B) How to enable GitHub Pages (free hosting)

1. Go to your repository on GitHub: [https://github.com/ronile21/coupozWebSite](https://github.com/ronile21/coupozWebSite).
2. Click **Settings** (top tab).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment > Source**, select **Deploy from a branch**.
5. Choose branch **main** (or **master**) and folder **/ (root)**.
6. Click **Save**.
7. GitHub will show your live URL (e.g. `https://ronile21.github.io/coupozWebSite/`) within a minute.

**Using a custom domain (e.g. coupoz.com):**

1. In the Pages settings, enter your domain in the **Custom domain** field and click Save.
2. At your DNS provider, create a CNAME record pointing `www` to `ronile21.github.io`, or four A records pointing your apex domain to GitHub's IPs.
3. The `CNAME` file in this repo already contains `coupoz.com` - do not delete it.

---

## C) Where to edit text and colors quickly

### Text content
- Open `index.html` in any text editor.
- Each section is clearly commented: `<!-- HERO -->`, `<!-- PROBLEM -->`, etc.
- Find the text you want to change and edit it directly.

### Brand color
The primary brand color is `#6C3EFF` (purple). To change it:

1. Open `css/styles.css`.
2. At the top, change `--brand-500` and `--brand-600` in `:root {}`.
3. Open `index.html` and search for `brand-500` / `brand-600` in the Tailwind config `<script>` block near the top, and update the hex values there too.

### Fonts
The site uses **Inter** from Google Fonts. To swap fonts, change the `<link>` tag in `<head>` of `index.html` and update `fontFamily.sans` in the Tailwind config script.

### Contact links
- Email: search `info@coupoz.com` in `index.html` and replace globally.
- WhatsApp: find `https://wa.me/15550000000` and replace with your WhatsApp Business number.
- Telegram: find `https://t.me/coupoz` and replace with your handle.

---

## D) Updating the base URL after a domain change

If you move to a new domain, update these three places:

### 1. `sitemap.xml`
```xml
<loc>https://YOUR-NEW-DOMAIN.com/</loc>
```

### 2. `robots.txt`
```
Sitemap: https://YOUR-NEW-DOMAIN.com/sitemap.xml
```

### 3. `index.html` - OpenGraph and Twitter meta tags
Search for `og:url` and `og:image` near the top of `index.html`:
```html
<meta property="og:url"    content="https://YOUR-NEW-DOMAIN.com/" />
<meta property="og:image"  content="https://YOUR-NEW-DOMAIN.com/assets/og-image.png" />
<meta name="twitter:image" content="https://YOUR-NEW-DOMAIN.com/assets/og-image.png" />
<link rel="canonical"      href="https://YOUR-NEW-DOMAIN.com/" />
```

---

## Social sharing image (OpenGraph)

Place a `1200 x 630 px` image named `og-image.png` inside the `assets/` folder.
It will automatically be used when the site is shared on LinkedIn, Twitter/X, WhatsApp, etc.

---

## Local development

No build step required. Open `index.html` directly in any modern browser:

```bash
# Option 1: just open the file
open index.html

# Option 2: serve with Python (avoids some browser file:// quirks)
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## Contact

Business inquiries: [info@coupoz.com](mailto:info@coupoz.com)
