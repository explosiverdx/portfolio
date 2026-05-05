#!/usr/bin/env node
/**
 * Production bundle: copies static assets into dist/ and writes sitemap.xml + robots.txt.
 * Set SITE_URL=https://yourdomain.com when building (no trailing slash required).
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(/\/$/, "");

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function joinUrl(base, pathname) {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base.replace(/\/$/, "")}${p}`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function writeSitemap() {
  const entries = [
    { loc: joinUrl(SITE_URL, "/"), changefreq: "weekly", priority: "1.0" },
    { loc: joinUrl(SITE_URL, "/about.html"), changefreq: "monthly", priority: "0.8" },
    { loc: joinUrl(SITE_URL, "/projects.html"), changefreq: "monthly", priority: "0.8" },
    { loc: joinUrl(SITE_URL, "/contact.html"), changefreq: "monthly", priority: "0.7" },
  ];

  const body = entries
    .map(
      (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
  fs.writeFileSync(path.join(dist, "sitemap.xml"), xml, "utf8");
}

function writeRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${joinUrl(SITE_URL, "/sitemap.xml")}
`;
  fs.writeFileSync(path.join(dist, "robots.txt"), robots, "utf8");
}

fs.rmSync(dist, { recursive: true, force: true });
mkdirp(dist);

const pages = ["index.html", "about.html", "projects.html", "contact.html", "404.html"];
pages.forEach((name) => {
  const from = path.join(root, name);
  if (!fs.existsSync(from)) {
    console.warn("skip missing:", name);
    return;
  }
  fs.copyFileSync(from, path.join(dist, name));
});

mkdirp(path.join(dist, "css"));
const cssFrom = path.join(root, "css", "main.css");
if (!fs.existsSync(cssFrom)) {
  console.error("missing css/main.css — run npm run build:css first");
  process.exit(1);
}
fs.copyFileSync(cssFrom, path.join(dist, "css", "main.css"));

mkdirp(path.join(dist, "assets", "js"));
const jsFrom = path.join(root, "assets", "js", "script.js");
if (fs.existsSync(jsFrom)) {
  fs.copyFileSync(jsFrom, path.join(dist, "assets", "js", "script.js"));
}

const imagesDir = path.join(root, "assets", "images");
if (fs.existsSync(imagesDir)) {
  fs.cpSync(imagesDir, path.join(dist, "assets", "images"), { recursive: true });
}

const resumeDir = path.join(root, "resume");
if (fs.existsSync(resumeDir)) {
  fs.cpSync(resumeDir, path.join(dist, "resume"), { recursive: true });
}

const biodataDir = path.join(root, "biodata");
if (fs.existsSync(biodataDir)) {
  fs.cpSync(biodataDir, path.join(dist, "biodata"), { recursive: true });
}

writeSitemap();
writeRobots();

fs.writeFileSync(path.join(dist, ".nojekyll"), "", "utf8");

console.log("Built:", dist);
console.log("SITE_URL used for sitemap / robots:", SITE_URL);
if (SITE_URL === "https://example.com") {
  console.warn('Tip: set SITE_URL to your real domain, e.g. SITE_URL=https://rohit.dev npm run build');
}
