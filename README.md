# Rohit Kumar — Portfolio

Professional developer portfolio. **Frontend** (static site) and **backend** (API or services) live in separate folders so you can deploy or version them independently.

## Project layout

| Path | Purpose |
|------|---------|
| `frontend/` | HTML, SCSS source, compiled CSS, JavaScript, images, resume |
| `backend/` | Server, API, or tooling (add your stack here) |

## Step 10 — Compile SCSS with the Sass CLI

Dart Sass turns `assets/scss/main.scss` (and its `@use` partials) into `css/main.css`. **Run the commands below from the `frontend/` directory** so paths match your tree (`assets/scss/...`, `css/main.css`).

### 1. Install Sass

**Globally** (available as `sass` everywhere):

```bash
npm install -g sass
```

**Or** in this project only (recommended; already listed in `frontend/package.json`):

```bash
cd frontend && npm install
```

Then invoke the local binary with `npx sass …` instead of `sass …`, or use the npm scripts below.

### 2. One-off compile

Writes `css/main.css` (overwrites each run):

```bash
cd frontend
sass assets/scss/main.scss css/main.css
```

Equivalent via npm:

```bash
cd frontend && npm run build:css
```

`npm run build:css` also passes `--no-source-map` for a clean single-file output.

### 3. Watch mode (rebuild on save)

**Explicit entry → output** (matches this repo: one `main.scss` driving all partials):

```bash
cd frontend
sass --watch assets/scss/main.scss:css/main.css
```

**Directory watch** (Sass watches `assets/scss` and writes into `css/`; top-level `.scss` files that are not partials become `.css`—here that is effectively `main.scss` → `main.css`):

```bash
cd frontend
sass --watch assets/scss:css
```

npm equivalent for the explicit mapping:

```bash
cd frontend && npm run watch:css
```

### 4. Production-style CSS (optional)

Smaller file, no source map:

```bash
cd frontend
sass --no-source-map --style=compressed assets/scss/main.scss css/main.css
```

### Development workflow

1. **First time:** `cd frontend && npm install` so `sass`, `serve`, and `concurrently` are available.
2. **While building UI:** run **`npm run dev`** — it runs **`npm run watch:css`** and a static server on port **3000** together, so every SCSS save refreshes `css/main.css` and you can reload the browser at `http://localhost:3000`.
3. **CI or before deploy:** run **`npm run build:css`** (or the `sass` one-liner above) so committed or deployed `css/main.css` matches the latest SCSS.
4. **If you only use the global CLI:** use the same paths, but from `frontend/`:

   ```bash
   sass assets/scss/main.scss css/main.css
   sass --watch assets/scss/main.scss:css/main.css
   ```

HTML always links to **`css/main.css`**; edit only files under **`assets/scss/`**, then compile (manually, watch, or `npm run dev`).

### From the monorepo root (`rohit-portfolio/`)

If your shell is one level up, prefix paths with `frontend/`:

```bash
sass frontend/assets/scss/main.scss frontend/css/main.css
sass --watch frontend/assets/scss/main.scss:frontend/css/main.css
```

## Serve the frontend

Any static file server pointed at `frontend/` works, for example:

```bash
cd frontend && npx serve .
```

Or use **`npm run dev`** (watch + serve on port 3000). Open the printed URL and navigate between pages via the site navigation.
