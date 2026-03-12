# Web Output Layer (Optional)

This directory contains a lightweight Node.js server that hosts your agent's outputs at a URL you can visit from any device.

- `/public/` — no auth required; openly shareable
- `/private/` — password protected (HTTP Basic Auth); requires `AUTH_USER` and `AUTH_PASS` environment variables
- Dashboard index auto-regenerates via `build_dashboard.js` when you add output directories

**This is entirely optional.** If you don't need a hosted URL, just use `/workspace/` and sync it to Google Drive, iCloud, Dropbox, or an Obsidian vault.

---

## Prerequisites

- Node.js 18+
- A hosting platform: [Railway](https://railway.app), [Fly.io](https://fly.io), [Render](https://render.com), or any VPS

---

## Setup

### Step 1: Move files into place

From your repo root:

```bash
# Move web layer to repo root
mv optional/web web

# Move scripts to repo root
mkdir -p scripts
mv web/scripts/build_dashboard.js scripts/

# Move railway.toml and package.json to repo root
mv web/railway.toml .
mv web/package.json .

# Install dependencies
npm install
```

### Step 2: Update paths

Open `scripts/build_dashboard.js` — the paths already resolve correctly once the file is at `scripts/build_dashboard.js` in your repo root.

### Step 3: Update CLAUDE.md

The web layer section of `CLAUDE.md` references `node scripts/build_dashboard.js` and `web/web.config.json` — these will be correct once you've moved the files.

### Step 4: Deploy

**Railway (recommended for simplicity):**

1. Push your repo to GitHub.
2. Create a new project on [Railway](https://railway.app) → "Deploy from GitHub repo."
3. Add environment variables in Railway's dashboard:
   - `AUTH_USER` — your chosen username for the private dashboard
   - `AUTH_PASS` — your chosen password for the private dashboard
4. Railway auto-deploys on every push to main.

**Other platforms:** set the same two environment variables and use `npm start` as the start command.

---

## Adding Output Directories

1. Create the directory: `mkdir web/private/my-outputs`
2. Add an entry to `web/web.config.json`:
   ```json
   {
     "private": [
       { "dir": "my-outputs", "label": "My Outputs" }
     ],
     "public": []
   }
   ```
3. Run `node scripts/build_dashboard.js` to regenerate the dashboard index.
4. Commit and push.

---

## Promoting an Output

To publish a file from `/workspace/` to the web layer:

```bash
# Private (password protected)
cp workspace/2026-01-15-my-report.html web/private/my-outputs/

# Public (open access)
cp workspace/2026-01-15-my-report.html web/public/

# Regenerate private dashboard index
node scripts/build_dashboard.js
```

Then commit and push to deploy.
