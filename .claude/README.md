# `.claude/` — Claude Code project configuration

Everything in this directory is checked into git and shared with anyone who
clones the repo (except `settings.local.json`, which is git-ignored and personal).

## `skills/`

Project-specific [Agent Skills](https://docs.claude.com/en/docs/claude-code/skills).
Each skill is its own folder with a `SKILL.md` file:

```
.claude/skills/
  my-skill/
    SKILL.md          required — YAML frontmatter (name, description) + instructions
    reference.md      optional — extra files the skill can pull in
    scripts/          optional — helper scripts the skill runs
```

Minimal `SKILL.md`:

```markdown
---
name: my-skill
description: One line describing WHAT it does and WHEN to use it. This is what Claude matches against, so be specific.
---

# My Skill

Step-by-step instructions for the task...
```

Claude loads a skill automatically when a request matches its `description`, or
you can invoke it explicitly with `/my-skill`. Run `/doctor` or the
`skill-creator` skill to scaffold and validate new skills.

## `commands/`

Project [slash commands](https://docs.claude.com/en/docs/claude-code/slash-commands).
One Markdown file per command — `deploy.md` becomes `/deploy`. Frontmatter
(`description`, `argument-hint`, `allowed-tools`) is optional; `$ARGUMENTS`,
`$1`, `$2` interpolate what the user typed.

## `settings.json`

Shared project settings: permission allow/deny lists, hooks, environment
variables, default model. Personal overrides go in `settings.local.json`
(git-ignored). See
https://docs.claude.com/en/docs/claude-code/settings.

## MCP servers — `../.mcp.json`

Project-scoped [MCP servers](https://docs.claude.com/en/docs/claude-code/mcp)
live in `.mcp.json` at the **repo root** (not in this folder — that's where
Claude Code looks for project MCP config). It's checked in so the whole team
gets the same tools; Claude Code prompts each user before connecting to a
project server the first time.

Add a server with the CLI:

```bash
claude mcp add --scope project <name> -- <command> [args...]
```

or edit `.mcp.json` directly:

```json
{
  "mcpServers": {
    "example": {
      "command": "npx",
      "args": ["-y", "@some/mcp-server"],
      "env": { "API_KEY": "${EXAMPLE_API_KEY}" }
    }
  }
}
```

`${VAR}` / `${VAR:-default}` expand from the environment, so secrets stay out of
git. List and inspect with `claude mcp list` / `claude mcp get <name>`.
