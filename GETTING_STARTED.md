# Getting Started — No Developer Experience Required

This guide walks you through everything you need to use this repo with an AI coding agent. You don't need to be a developer. At any point where something isn't clear, paste the step into Claude, ChatGPT, or Gemini and ask for help — that's exactly what these tools are for.

---

## Step 1 — Install a Code Editor

You need one of these. Pick one:

- **[VS Code](https://code.visualstudio.com/)** — free, made by Microsoft, the most widely used
- **[Cursor](https://www.cursor.com/)** — free tier available, built on VS Code, AI-first

Download and install like any other app. If you're on Windows, accept the defaults during installation.

---

## Step 2 — Install Node.js

All the CLI agents below run on Node.js. Install it once and all of them benefit.

1. Go to [nodejs.org](https://nodejs.org/) and download the **LTS** version
2. Install it (accept defaults)
3. Verify it worked: open a terminal and type `node -v` — you should see a version number

> **Opening a terminal:** In VS Code, go to `Terminal → New Terminal`. In Cursor, same thing. On Windows you can also use PowerShell or Windows Terminal.

---

## Step 3 — Choose and Install a CLI Agent

Install whichever agent(s) you want. Each requires an account and API key with the respective company.

### Claude Code (Anthropic)

1. Create an account at [claude.ai](https://claude.ai/) and add credits at [console.anthropic.com](https://console.anthropic.com/)
2. Get an API key from the Anthropic console
3. In your terminal: `npm install -g @anthropic-ai/claude-code`
4. Run `claude` and follow the login prompt

### Codex CLI (OpenAI)

1. Create an account at [platform.openai.com](https://platform.openai.com/) and add credits
2. Get an API key from the OpenAI dashboard
3. In your terminal: `npm install -g @openai/codex`
4. Set your key: `export OPENAI_API_KEY=your-key-here` (or add it to your shell profile)

### Gemini CLI (Google)

1. Get a Gemini API key from [aistudio.google.com](https://aistudio.google.com/)
2. In your terminal: `npm install -g @google/gemini-cli`
3. Run `gemini` and follow the authentication steps

### OpenCode

1. Go to the [OpenCode GitHub page](https://github.com/sst/opencode) and follow its installation instructions — it supports multiple AI providers, so you can reuse a key you already have
2. Run `opencode` to get started

---

## Step 4 — Download This Repo

You have two options:

**Option A — Use it as a template (recommended):**
1. Click **"Use this template"** at the top of the GitHub page
2. Give your copy a name and create it
3. Then clone your copy (see below)

**Option B — Just download it:**
- Click **Code → Download ZIP** on the GitHub page, then unzip it somewhere on your computer

**Cloning (for Option A):**

If you've never cloned a repo before, ask your LLM: *"How do I clone a GitHub repo to my computer?"* — it's a one-line command.

Once cloned, open the folder in VS Code or Cursor: `File → Open Folder`.

---

## Step 5 — Start the Agent in This Folder

The key thing: **your agent needs to be running with this folder as its working directory.** That's what lets it read the config files and behave the way this template is designed.

- In VS Code/Cursor: open the terminal (`Terminal → New Terminal`) — it will automatically be in the project folder
- Then run your agent from that terminal: `claude`, `codex`, `gemini`, or `opencode`

The agent will read `CLAUDE.md` (or `agents.md` for Codex) automatically and load the framework.

---

## Step 6 — Customize It

Once the agent is running:

1. Tell it: *"Help me edit CLAUDE.md to reflect my name and what I want to use this for"*
2. Tell it: *"Help me create a skin for [your use case]"* — e.g., a research helper, writing assistant, or project planner

That's it. The agent will guide you from here.

---

## Quick Reference

| What you need | Where to get it |
|---|---|
| VS Code | code.visualstudio.com |
| Cursor | cursor.com |
| Node.js | nodejs.org (LTS version) |
| Anthropic API key | console.anthropic.com |
| OpenAI API key | platform.openai.com |
| Gemini API key | aistudio.google.com |
| OpenCode | github.com/sst/opencode |

---

## When You Get Stuck

Paste the exact step and error message into Claude, ChatGPT, or Gemini. These tools are very good at walking you through setup problems. You don't need to figure it out alone.
