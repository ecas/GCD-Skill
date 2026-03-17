# Platform Adapter: Gemini CLI
# Skill: gcp-sales-enablement
# Version: 1.0.0

---

## Overview

Gemini CLI does not have a native skill-loading mechanism. This adapter explains how to
activate the GCP Sales Enablement skill within a Gemini CLI session.

There are two approaches:
- **System prompt injection** (recommended): Load the skill as context at session start
- **Simplified single-agent mode**: A reduced version for quick single-turn queries

---

## Approach 1: System Prompt Injection (Recommended)

### How It Works

Gemini CLI accepts a `--system-instruction` flag (or equivalent prompt prefix depending on
your CLI version). You paste the contents of `SKILL.md` as the system instruction.

### Setup Steps

**Step 1: Export the skill prompt to a variable**

```bash
SKILL_PROMPT=$(cat /path/to/GCD-Skill/SKILL.md)
```

**Step 2: Start Gemini CLI with the skill as system instruction**

```bash
gemini chat --system-instruction "$SKILL_PROMPT"
```

Or if your Gemini CLI version uses `--context`:

```bash
gemini --context "$SKILL_PROMPT"
```

**Step 3: Verify skill is loaded**

Type the following to confirm the skill is active:

```
Are you operating as a GCP Sales Enablement assistant?
```

Expected response: Confirmation that the skill is loaded and a prompt for what type of
task you want to begin (research, pitch, or demo).

**Step 4: Optionally load a reference file**

If your query requires a specific reference module (e.g., regulatory frameworks), append it:

```bash
REF=$(cat /path/to/GCD-Skill/references/regulatory-frameworks.md)
FULL_CONTEXT="$SKILL_PROMPT\n\n---\nADDITIONAL REFERENCE:\n$FULL_CONTEXT"
gemini chat --system-instruction "$FULL_CONTEXT"
```

---

## Approach 2: Inline Prompt Prefix (One-Shot Queries)

For a single query without an ongoing session, prefix your question with the skill role:

```bash
gemini "$(cat /path/to/GCD-Skill/SKILL.md)

---

USER REQUEST:
Research PKO Bank Polski for a GCP pitch. Focus on AI/ML and data platform opportunities.
Audience: CTO and VP Digital."
```

This is less reliable for multi-turn agent work but useful for quick one-off outputs.

---

## Approach 3: Simplified Single-Agent Mode

For Gemini CLI users who want a lighter version without multi-agent orchestration,
use this condensed system prompt:

```
You are a Google Cloud Sales Enablement assistant. When asked to research a company,
produce a structured account profile with pain points and GCP product recommendations.
When asked to build a pitch, generate slide-by-slide content for the specified audience
persona (CxO, CTO, CFO). When asked to prepare demo materials, generate email, document,
and calendar content using fictional company names.

Rules:
- Never fabricate financials, employee counts, or technology stacks. Flag all inferred data.
- Match language to the user: English by default, Polish if requested.
- Keep product names in English even in Polish output.
- Demo content must use fictional company names only — no real customer data.

Output format: Use Markdown headers. Label each section clearly.
```

Paste this as a `--system-instruction` value or as a prefix in your prompt.

---

## Reference File Loading in Gemini CLI

Gemini CLI does not automatically load reference files based on query content (unlike
Claude Code's skill system). Load reference files manually when your query requires them:

| Query type | Command |
|------------|---------|
| Regulatory / compliance | `cat references/regulatory-frameworks.md | gemini "..."` |
| Financial services | `cat references/vertical-financial-services.md | gemini "..."` |
| Healthcare | `cat references/vertical-healthcare.md | gemini "..."` |
| Manufacturing | `cat references/vertical-manufacturing.md | gemini "..."` |
| Competitive (vs AWS/Azure) | Reference `competitive-battlecards.md` when available |

Example with reference file piped in:

```bash
SKILL=$(cat SKILL.md)
REF=$(cat references/regulatory-frameworks.md)

gemini --system-instruction "$SKILL" \
  "Map NIS2 and GDPR compliance requirements to GCP controls for a Polish insurance company."
```

---

## Limitations vs. Claude Code

| Capability | Claude Code | Gemini CLI |
|------------|-------------|-----------|
| Automatic skill loading | Yes (native skill system) | Manual system prompt injection |
| Multi-agent orchestration | Yes (parallel agents) | Single-agent only |
| Reference file routing | Automatic (by query type) | Manual per query |
| File creation (Drive, Sheets) | Via Apps Script execution | Not supported natively |
| Session memory | Per-conversation context | Per-session (no persistent memory) |

For full multi-agent orchestration with automatic file creation, use Claude Code.
Gemini CLI is best suited for quick research queries, competitive Q&A, and content drafting.

---

## Quick Reference: Common Commands

```bash
# Research a company
gemini --system-instruction "$SKILL_PROMPT" \
  "Research Orlen for a GCP pitch. Identify top 3 pain points and relevant GCP solutions."

# Build a pitch
gemini --system-instruction "$SKILL_PROMPT" \
  "Build executive overview pitch deck content for Orlen. Audience: CTO and CIO. Industry: Energy."

# Competitive question
gemini --system-instruction "$SKILL_PROMPT" \
  "How does GCP compare to Azure for a Microsoft-heavy enterprise in financial services?"

# Compliance mapping
gemini --system-instruction "$SKILL_PROMPT" \
  "Map NIS2 requirements to GCP controls for a Polish telco."

# Demo content
gemini --system-instruction "$SKILL_PROMPT" \
  "Generate 3 realistic Gmail email scenarios in Polish for a logistics company demo."
```
