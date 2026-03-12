# Claudex — Portable Multi-Skin CLI Agent Framework

A lightweight repo structure that gives your CLI AI agent a persistent home: a global config, swappable domain "skins," and a gitignored scratch space for outputs. Works with Claude Code, OpenAI Codex CLI, Gemini CLI, and OpenCode.

---

## Quickstart

**Minimum setup — under 10 minutes:**

1. Click **"Use this template"** → create your own repo
2. Clone it locally
3. Open `CLAUDE.md` and edit the identity section with your name and preferences
4. Open `skins/example.md` — read the structure, then replace it with a skin useful to you
5. Start your CLI agent pointed at this repo root
6. Say **"use [your skin name]"** to activate it

That's it. The agent will read its config, load your skin on request, and write outputs to `/workspace/`.

**Optional from here:**

- Add a tool in `/tools/` to let the agent read an external service (see [Adding Tools](#optional-adding-tools))
- Set up the web output layer for a hosted dashboard (see [Web Output Layer](#optional-web-output-layer))

---

## How Skins Work

A skin is a plain-text markdown file in `/skins/` that defines a persona, workflows, vocabulary, and output conventions for a specific domain. Examples: a writing assistant, a research helper, a project planner, a fitness coach.

**To activate a skin:** say "use [skin name]" to your agent. It loads the file and follows its guidance for the rest of the session.

**To create a skin:** copy `skins/example.md`, rename it (e.g., `skins/finance_planner.md`), and rewrite its contents for your domain. No code changes needed — skins are additive by design.

**Skin authoring tips:**
- Keep instructions operational. Prefer checklists and rules over prose.
- Include: persona, user context, workflows/decision rules, available tools, output format, domain vocabulary.
- Avoid platform-specific syntax; skins should be portable across Claude Code, Codex CLI, etc.

See `skins/README.md` for full authoring guidelines.

---

## How Workspace Works

`/workspace/` is the agent's scratch pad. All session outputs — drafts, plans, research notes, generated files — go here first. It is gitignored, so it never reaches your remote repo. Think of it as the agent's "Downloads folder."

**Workspace sync (no hosting needed):** If you want your outputs accessible from other devices, point `/workspace/` (or a symlink) at a folder synced by Google Drive, iCloud, Dropbox, or your Obsidian vault. The agent just writes files; the sync service does the rest.

---

## Platform Notes

| Platform | Config file read | Notes |
|---|---|---|
| Claude Code | `CLAUDE.md` | Most capable for this use case; supports MCP tools |
| OpenAI Codex CLI | `agents.md` | Keep in sync with `CLAUDE.md` |
| Gemini CLI | `GEMINI.md` (create one) | Copy `CLAUDE.md` content; rename as needed |
| OpenCode | Config varies | Point it at `CLAUDE.md` or adapt |

`CLAUDE.md` and `agents.md` are intentionally kept in sync. When you update one, update the other.

---

## Optional: Adding Tools

Tools are standalone scripts in `/tools/` that the agent can invoke to read external services, parse files, or run computations. They follow one rule: **credentials come from environment variables only.**

**To add a tool:**

1. Write your script in `/tools/` (Python, shell, or Node — whatever fits)
2. Copy `.env.example` to `.env` and fill in any credentials your tool needs
3. Add a line to the `Tools` section of `CLAUDE.md` describing the tool and how to invoke it

`tools/example_tool.py` is a minimal stub showing the pattern: read env vars, do something useful, emit JSON, never log secrets. Replace or extend it.

---

## Optional: Web Output Layer

The web layer lives in `/optional/web/`. It gives you a URL you can visit from any device to see outputs you've deliberately promoted from `/workspace/`.

- `/public/` — no auth required; share freely
- `/private/` — password protected (HTTP Basic Auth)
- A dashboard index that auto-regenerates when you add output directories

**Setup:** See `optional/web/README.md` for full instructions. Requires Node.js 18+ and a hosting platform (Railway, Fly.io, Render, or a VPS).

**Skip it if:** you're happy keeping outputs in `/workspace/` and syncing via a folder service (see [How Workspace Works](#how-workspace-works) above). Most people don't need the web layer.

---

## Directory Structure

```
claudex/
├── CLAUDE.md                    # Global config for Claude Code
├── agents.md                    # Same config for Codex CLI (kept in sync)
├── README.md                    # This file
├── .env.example                 # Blank template for credentials
├── .gitignore
│
├── skins/
│   ├── README.md                # Skin authoring guidelines
│   └── example.md               # Generic demo skin — replace with your own
│
├── tools/
│   ├── README.md                # How to write a tool
│   └── example_tool.py          # Minimal stub — replace or extend
│
├── workspace/                   # Gitignored agent scratch space
│   └── .gitkeep
│
└── optional/
    └── web/                     # Opt-in hosted output layer
        ├── README.md
        ├── server.js
        ├── web.config.json
        ├── package.json
        ├── railway.toml
        ├── scripts/
        │   └── build_dashboard.js
        ├── templates/
        │   └── output.html
        ├── public/
        └── private/
            └── .gitkeep
```
