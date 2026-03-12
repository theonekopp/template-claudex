'use strict';

// NOTE: This script expects to be run from the repo root:
//   node scripts/build_dashboard.js
//
// When you move optional/web/ to web/ at your repo root (per web/README.md),
// move this file to scripts/build_dashboard.js at the repo root as well.
// The ROOT path below will then resolve correctly.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'web.config.json');
const PRIVATE_DIR = path.join(ROOT, 'private');
const OUTPUT_PATH = path.join(PRIVATE_DIR, 'index.html');

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const now = new Date();

function parseDate(filename) {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? new Date(match[1]) : null;
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

let sections = '';

for (const entry of config.private) {
  const dirPath = path.join(PRIVATE_DIR, entry.dir);
  if (!fs.existsSync(dirPath)) {
    console.warn(`Warning: directory "${entry.dir}" does not exist — skipping.`);
    continue;
  }

  const files = fs.readdirSync(dirPath)
    .filter(f => f !== 'index.html' && !f.startsWith('.'))
    .map(f => ({ name: f, date: parseDate(f) }))
    .sort((a, b) => {
      if (!a.date && !b.date) return a.name.localeCompare(b.name);
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date - a.date;
    });

  const items = files.length
    ? files.map(f =>
        `      <li><a href="/private/${entry.dir}/${encodeURIComponent(f.name)}">${f.name}</a>${f.date ? `<span class="date">${formatDate(f.date)}</span>` : ''}</li>`
      ).join('\n')
    : '      <li class="empty">No files yet.</li>';

  sections += `
  <section>
    <h2>${entry.label}</h2>
    <ul>
${items}
    </ul>
  </section>`;
}

if (!sections) {
  sections = '\n  <p class="empty">No directories configured. Edit <code>web/web.config.json</code> to add sections.</p>';
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Private Dashboard</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; max-width: 800px; margin: 0 auto; padding: 1rem 1.5rem; color: #222; }
    h1 { font-size: 1.4rem; margin-bottom: 0.2rem; }
    .updated { font-size: 0.85rem; color: #666; margin: 0 0 2rem; }
    section { margin-bottom: 2rem; }
    h2 { font-size: 1.05rem; border-bottom: 1px solid #ddd; padding-bottom: 0.3rem; margin-bottom: 0.5rem; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { padding: 0.3rem 0; display: flex; align-items: baseline; gap: 0.5rem; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .date { font-size: 0.8rem; color: #999; }
    .empty { color: #aaa; font-style: italic; font-size: 0.9rem; }
    code { background: #f4f4f4; padding: 0.1em 0.35em; border-radius: 3px; font-size: 0.9em; }
    @media (max-width: 600px) { body { padding: 0.75rem 1rem; } }
  </style>
</head>
<body>
  <h1>Private Dashboard</h1>
  <p class="updated">Last updated: ${now.toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>
${sections}
</body>
</html>`;

fs.writeFileSync(OUTPUT_PATH, html);
console.log(`Dashboard written to ${OUTPUT_PATH}`);
