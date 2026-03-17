# Platform Adapter: Google Antigravity IDE
# Skill: gcp-sales-enablement
# Version: 1.0.0

---

## Overview

Google Antigravity IDE supports agent-based workflows natively. This adapter explains
how to load the GCP Sales Enablement skill as agent context, how to use the Manager
view for parallel agent execution, and how outputs map to Antigravity's artifact system.

---

## Loading the Skill as Agent Context

### Option A: Project-Level Context (Recommended)

1. Open your Antigravity project
2. Navigate to **Project Settings > Agent Context**
3. Upload `SKILL.md` as the primary agent context document
4. Set context scope to **All Agents in Project**

All agents in the project will now operate within the skill's role definition, mode
detection rules, and output format guidelines.

### Option B: Per-Agent Context

If you want the skill active for specific agents only (e.g., the research agent but
not a code-generation agent in the same project):

1. Open the agent configuration panel for the target agent
2. Under **System Context**, add `SKILL.md` contents
3. Optionally add relevant reference files under **Additional Context**

Reference files to pre-load based on your use case:

| Use Case | Reference File |
|----------|---------------|
| Regulatory / compliance query | `references/regulatory-frameworks.md` |
| Financial services customer | `references/vertical-financial-services.md` |
| Healthcare customer | `references/vertical-healthcare.md` |
| Manufacturing / Industry 4.0 | `references/vertical-manufacturing.md` |
| Competitive displacement deal | `references/competitive-battlecards.md` |

### Option C: Inline Context in Agent Prompt

For one-off agent invocations without modifying project settings:

```
[SKILL CONTEXT]
{{paste contents of SKILL.md here}}
[END SKILL CONTEXT]

USER REQUEST:
Research Allegro for a Google Workspace pitch. Audience: CIO and IT Director.
```

---

## Multi-Agent Orchestration with Manager View

The GCP Sales Enablement skill defines a four-agent pipeline:

```
session-manager → customer-researcher → solution-architect → pitch-designer / demo-engineer
```

In Antigravity Manager View, configure this as follows:

### Agent Configuration

**Agent 1: session-manager**
- Context file: `agents/session-manager.md`
- Role: Collect inputs, detect mode, route to appropriate next agent
- Output: Structured input spec (JSON) for downstream agents

**Agent 2: customer-researcher**
- Context file: `agents/customer-researcher.md`
- Role: OSINT, account profiling, pain point identification
- Input: Company name + industry (from session-manager output)
- Output: `research-output.md` format artifact
- Can run in parallel with session-manager input processing

**Agent 3: solution-architect**
- Context file: `agents/solution-architect.md`
- Role: Pain-to-product mapping, solution recommendation
- Input: customer-researcher artifact
- Output: Solution recommendation artifact
- Must wait for customer-researcher to complete (sequential dependency)

**Agent 4a: pitch-designer** (Mode 2)
- Context file: `agents/pitch-designer.md`
- Role: Deck content, competitive positioning, business case
- Input: solution-architect artifact
- Output: Pitch deck artifact (Antigravity document or exported Markdown)

**Agent 4b: demo-engineer** (Mode 3)
- Context file: `agents/demo-engineer.md`
- Role: Demo materials, Apps Script config, trainer guide
- Input: solution-architect artifact
- Output: Demo package artifact

**Agents 4a and 4b can run in parallel** once solution-architect completes.

### Manager View DAG

```
[session-manager]
        |
        ├── (Mode 1/2/3 routing)
        |
[customer-researcher] ──── parallel with session-manager final steps
        |
[solution-architect]  ──── waits for customer-researcher
        |
        ├── [pitch-designer]    ──── parallel
        └── [demo-engineer]     ──── parallel
```

In Antigravity Manager View:
- Add a **dependency edge** from `customer-researcher` to `solution-architect`
- Add **dependency edges** from `solution-architect` to both `pitch-designer` and `demo-engineer`
- Set `pitch-designer` and `demo-engineer` to run in **parallel** (no dependency between them)
- Set `session-manager` as the entry point

### Example Manager View Setup

```yaml
# Antigravity manager config (conceptual — adapt to actual Antigravity schema)
name: gcp-sales-enablement-pipeline
entry_agent: session-manager

agents:
  - id: session-manager
    context: agents/session-manager.md
    outputs:
      - mode
      - company_name
      - industry
      - personas

  - id: customer-researcher
    context: agents/customer-researcher.md
    depends_on: []
    inputs_from: session-manager
    outputs:
      - research_artifact

  - id: solution-architect
    context: agents/solution-architect.md
    depends_on: [customer-researcher]
    inputs_from: customer-researcher
    outputs:
      - solution_artifact

  - id: pitch-designer
    context: agents/pitch-designer.md
    depends_on: [solution-architect]
    condition: "mode IN ['pitch', 'full']"
    inputs_from: solution-architect

  - id: demo-engineer
    context: agents/demo-engineer.md
    depends_on: [solution-architect]
    condition: "mode IN ['demo', 'full']"
    inputs_from: solution-architect
    parallel_with: pitch-designer
```

---

## Artifact System Mapping

Antigravity's artifact system maps to the skill's output format as follows:

| Skill Output | Antigravity Artifact Type | Format |
|-------------|--------------------------|--------|
| Research output (`research-output.md`) | Document artifact | Markdown |
| Solution recommendation | Document artifact | Markdown |
| Pitch deck content | Document artifact | Markdown (import to Slides manually) |
| Demo materials (emails, docs) | Document artifact | Markdown |
| Apps Script config (`config.gs`) | Code artifact | JavaScript |
| Trainer guide | Document artifact | Markdown |

### Working with Artifacts

**Exporting to Google Slides:**
Antigravity does not natively export Markdown to Google Slides. After pitch-designer
generates slide content:

1. Copy the slide-by-slide Markdown artifact
2. Open Google Slides
3. Use the Slides importer or paste manually by slide
4. Apply customer brand styling

A Google Apps Script importer for slide content is planned for a future version of the skill.

**Exporting Apps Script config:**
The `config.gs` code artifact from demo-engineer can be:
1. Copied directly into a Google Apps Script project
2. Used in combination with the other `.gs` files in `scripts/`

**Using document artifacts in Drive:**
Antigravity artifacts can be exported to Google Drive via:
- **Artifact > Export > Google Drive** in the Antigravity UI
- The exported file will appear in your connected Drive account

---

## Single-Agent Mode in Antigravity

For quick queries without the full pipeline, use a single agent with the full skill context:

1. Create a new agent in Antigravity
2. Load `SKILL.md` as system context
3. Send your query directly to the single agent

This is appropriate for:
- Quick competitive Q&A
- Compliance mapping without full research
- Ad-hoc pitch content generation when research is already available

---

## Tips for Antigravity-Specific Usage

**Context window management:**
The full skill (`SKILL.md`) is approximately 3,000 tokens. Reference files add 1,000–3,000
tokens each. For complex queries with multiple reference files, use the per-query reference
file routing table in `SKILL.md` to load only the necessary files.

**Agent memory between sessions:**
Antigravity supports session artifacts that persist between agent runs. Save the
`research-output.md` artifact from `customer-researcher` to avoid re-running research
when iterating on pitch content for the same company.

**Iterating on pitch content:**
If the pitch-designer output needs refinement:
1. Keep the solution-architect artifact as context
2. Re-run pitch-designer with a refined prompt (e.g., "focus on CFO audience more, reduce technical detail")
3. This avoids re-running the full pipeline

**Polish language output:**
To activate Polish output in Antigravity, either:
- Write your prompt in Polish
- Add the instruction `output_language: pl` to the session-manager input

All agents read the language setting from session-manager output and produce content
in the specified language while keeping product names in English.
