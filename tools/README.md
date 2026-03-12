Tools

Tools are standalone scripts that give the agent read (or write, when authorized) access to external services, files, or APIs. They live in this directory.

Pattern

Every tool should:
1. Read credentials exclusively from environment variables (never hardcoded, never logged).
2. Emit structured output — JSON is preferred so the agent can parse it reliably.
3. Fail clearly with a non-zero exit code and a generic error message (no secrets in error output).
4. Be invocable from the repo root: `python tools/my_tool.py <args>`

Environment Variables

- Document each required variable at the top of the script.
- Add corresponding entries to `.env.example` (blank values only — no real credentials).
- Users copy `.env.example` to `.env` and fill in their own values.

Referencing a Tool in CLAUDE.md

Add a line to the `Tools` section of `CLAUDE.md` like:

  - My Service (read-only): `python tools/my_tool.py <action> [--option value]`
    - Emits JSON; credentials via environment variables (see `.env.example`).

This tells the agent the tool exists and how to call it.

Files

- `example_tool.py` — minimal stub showing the pattern. Replace or extend it for your own services.
