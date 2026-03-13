# Claudex — Portable Multi-Skin CLI Agent Framework

A lightweight repo structure that gives your CLI AI agent a persistent home: a global config, swappable domain "skins," and a gitignored scratch space for outputs. Works with Claude Code, OpenAI Codex CLI, Gemini CLI, and OpenCode.

---

## Directory Structure

The repo (`claudex/`) lives inside a parent folder alongside a `secrets/` directory that is never committed. This keeps all credentials completely outside version control.

```
parent/                          # Not a repo — just a container folder
├── secrets/
│   └── assistant.env            # All your API keys and credentials (never in git)
└── claudex/                     # This repo
    ├── CLAUDE.md
    ├── agents.md
    ├── claudesafe.sh            # Launch Claude Code (sources ../secrets/assistant.env)
    ├── codexsafe.sh             # Launch Codex CLI
    ├── opencodesafe.sh          # Launch OpenCode
    ├── .env.example             # Reference template for assistant.env
    ├── skins/
    ├── tools/
    ├── workspace/               # Gitignored scratch space
    └── optional/
        └── web/                 # Opt-in hosted output layer
```

---

## Quickstart

**Minimum setup — under 10 minutes:**

1. Create a parent folder anywhere on your machine (e.g., `~/agent-claudex/`)
2. Clone this repo into it as `claudex/`:
   ```bash
   mkdir ~/agent-claudex && cd ~/agent-claudex
   git clone <your-repo-url> claudex
   ```
3. Create the secrets directory and your credentials file:
   ```bash
   mkdir ~/agent-claudex/secrets
   cp claudex/.env.example claudex/../secrets/assistant.env
   # Edit secrets/assistant.env and fill in your API keys
   ```
4. Make the launcher scripts executable:
   ```bash
   chmod +x claudex/claudesafe.sh claudex/codexsafe.sh claudex/opencodesafe.sh
   ```
5. Open `claudex/CLAUDE.md` and customize the identity section
6. Open `claudex/skins/example.md` — read the structure, then replace it with a skin useful to you
7. Launch your agent:
   ```bash
   # For Claude Code:
   ~/agent-claudex/claudex/claudesafe.sh
   # For Codex CLI:
   ~/agent-claudex/claudex/codexsafe.sh
   # For OpenCode:
   ~/agent-claudex/claudex/opencodesafe.sh
   ```
8. Say **"use [your skin name]"** to activate a skin

**Optional from here:**

- Add a tool in `/tools/` to let the agent read an external service (see [Adding Tools](#optional-adding-tools))
- Set up the web output layer for a hosted dashboard (see [Web Output Layer](#optional-web-output-layer))

---

## How Secrets Work

The launcher scripts (`claudesafe.sh`, etc.) use `set -a` / `source` / `set +a` to load every variable in `../secrets/assistant.env` into the environment before starting the agent. The repo never sees or stores any credentials.

`assistant.env` format is standard shell variable assignments:
```
ANTHROPIC_API_KEY=sk-ant-...
MY_SERVICE_API_KEY=...
```

`.env.example` in this repo is the reference template — it shows which variables you need but contains no values. Copy it to `../secrets/assistant.env` and fill it in.

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

| Platform | Config file read | Launch with |
|---|---|---|
| Claude Code | `CLAUDE.md` | `claudesafe.sh` |
| OpenAI Codex CLI | `agents.md` | `codexsafe.sh` |
| OpenCode | `CLAUDE.md` | `opencodesafe.sh` |
| Gemini CLI | `GEMINI.md` (create one) | adapt a launcher script |

`CLAUDE.md` and `agents.md` are intentionally kept in sync. When you update one, update the other.

---

## Optional: Adding Tools

Tools are standalone scripts in `/tools/` that the agent can invoke to read external services, parse files, or run computations. They follow one rule: **credentials come from environment variables only.**

**To add a tool:**

1. Write your script in `/tools/` (Python, shell, or Node — whatever fits)
2. Add any required variables to `../secrets/assistant.env` (and document them in `.env.example`)
3. Add a line to the `Tools` section of `CLAUDE.md` describing the tool and how to invoke it

Since the launcher scripts export all vars from `assistant.env`, any tool the agent invokes inherits those variables automatically.

`tools/example_tool.py` is a minimal stub showing the pattern: read env vars, do something useful, emit JSON, never log secrets. Replace or extend it.

---

## Optional: Web Output Layer

The web layer lives in `/optional/web/`. It gives you a URL you can visit from any device to see outputs you've deliberately promoted from `/workspace/`.

- `/public/` — no auth required; share freely
- `/private/` — password protected (HTTP Basic Auth)
- A dashboard index that auto-regenerates when you add output directories

**Setup:** See `optional/web/README.md` for full instructions. Requires Node.js 18+ and a hosting platform (Railway, Fly.io, Render, or a VPS).

**Skip it if:** you're happy keeping outputs in `/workspace/` and syncing via a folder service (see [How Workspace Works](#how-workspace-works) above). Most people don't need the web layer.
