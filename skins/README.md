Skins System

- A skin is a portable, platform-agnostic markdown file that defines an agent's persona, behavior, domain context, workflows, and vocabulary.
- Skins live in this folder as `*.md`. Each file is self-contained and does not assume a specific platform (Claude Code, Codex CLI, Gemini CLI).
- The agent runtime should load one skin at a time based on user request or context. Global preferences live in the platform config (`CLAUDE.md`, `agents.md`).

Authoring Guidelines

- Keep instructions concise and operational. Prefer checklists and rules over prose.
- Include: persona, user context, workflows/decision rules, available tools, outputs/formatting, and domain vocabulary.
- Avoid platform-specific syntax, roles, or tool invocation details; describe tools abstractly.

Skin Structure (recommended sections)

1. **Identity & Persona** — who the agent is in this skin; tone, style, expertise
2. **User Context** — who the user is; their goals, knowledge level, recurring needs
3. **Workflows** — step-by-step procedures for common tasks in this domain
4. **Tools** — what tools are available in this skin and how they're used
5. **Output Conventions** — file format, naming, where to write outputs, promotion rules
6. **Vocabulary** — domain terms, abbreviations, or jargon the agent should know

Adding a New Skin

- Create a new markdown file in this directory, e.g. `finance_planner.md`.
- Follow the structure above.
- No code changes required — skins are additive by design.

Files

- `example.md` — a generic research assistant skin; read it, then replace it with one useful to you.
