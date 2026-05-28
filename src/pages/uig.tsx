import React, { useCallback } from "react"
import type { HeadFC } from "gatsby"
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  Stack,
} from "@mui/material"
import { LayoutAlt } from "../components/Layout"
import { Seo, seoDefaults } from "../components/Seo"
import { Title } from "../components/Title"
import { GateDemo } from "../components/GateDemo"
import uigateTerminal from "../images/uig/uigate_terminal.png"

const skillContent = `---
name: ui-gate
description: Use this skill when the user wants to build software using the UI-GATE methodology (UI-Gated Agentic Task Engineering). Triggers include: any mention of "UI-GATE", "gated agentic", "human-in-the-loop development", or requests to create an implementation plan where a human validates each feature before the agent proceeds. Also use when the user asks to decompose software requirements into agent-ready tickets with UI validation checkpoints, or wants a methodical agentic build plan where nothing ships blind. Do NOT use for general software architecture, code review, or agentic tasks that do not involve sequential human-validated feature delivery.
---

# UI-GATE: UI-Gated Agentic Task Engineering

UI-GATE is a structured agentic development methodology where every feature must pass a human UI validation checkpoint before the agent is allowed to proceed to the next ticket. Nothing ships blind. Nothing stacks on top of unvalidated work.

**Core principle**: The agent builds one thing. You see it working. You approve. The agent builds the next thing.

---

## Your output structure

Produce the following sections in order when given software requirements:

### 1. Requirement decomposition

Break every requirement into atomic, independently testable features. Each feature must:
- Do exactly one thing
- Be visually verifiable by a human (something appears, changes, or responds in the UI)
- Have zero hidden dependencies on unbuilt features
- Be labeled: FEAT-001, FEAT-002, etc.

### 2. Dependency map

List which features must exist before each feature can be built:

\`\`\`
FEAT-003 → requires [FEAT-001, FEAT-002]
FEAT-001 → INDEPENDENT
\`\`\`

### 3. Implementation phases

Group features into sequential phases. Rules:
- Phase 1 must contain only INDEPENDENT features
- No phase may begin until all features in the previous phase are HUMAN VALIDATED
- Each phase must produce a visually testable UI state
- Prefer thin vertical slices (UI + logic + data together) over horizontal layers

### 4. Feature tickets

For each feature, produce a ticket in this exact format:

\`\`\`
---
FEAT-XXX: [Feature Name]
Phase: [N]
Depends on: [FEAT-YYY, FEAT-ZZZ or NONE]

AGENT INSTRUCTIONS:
- [Precise, unambiguous build steps written for an AI coding agent]
- Use imperative language: "Create", "Add", "Wire", "Return"
- Reference exact file paths, component names, or API routes when known
- End with: "Do not proceed past this ticket until human validation is complete."

HUMAN VALIDATION CHECKLIST:
□ [Specific visual action the human performs]
□ [Exact expected result]
□ [Edge case to test]
□ [Confirm: "Mark FEAT-XXX VALIDATED before agent continues"]

DEFINITION OF DONE:
- All checklist items pass
- No console errors during validation
- Human has explicitly marked this feature VALIDATED
---
\`\`\`

### 5. Agent rules

Emit this block for the human to paste at the top of every new agent session:

\`\`\`
You are implementing [Project Name]. The active ticket is FEAT-XXX.
Do not build ahead of the active ticket.
Do not refactor completed tickets unless instructed.
After completing this ticket, stop and output: "FEAT-XXX COMPLETE — AWAITING HUMAN VALIDATION"
Do not continue until the human responds: "FEAT-XXX VALIDATED — PROCEED TO FEAT-YYY"
\`\`\`

### 6. Validation log template

\`\`\`
| Ticket   | Feature | Status                              | Notes |
|----------|---------|-------------------------------------|-------|
| FEAT-001 | ...     | ⬜ Pending / ✅ Validated / ❌ Failed |       |
\`\`\`

---

## Planning rules

1. **UI-first sequencing**: Every phase ends with something a human can see and click.
2. **One ticket, one concern**: Never bundle two features into one ticket.
3. **Fail fast surfaces**: If a feature can break visually, the validation checklist must test that break.
4. **No assumed state**: Agent instructions must not assume any state not yet built and validated.
5. **Stop signals are mandatory**: Every ticket ends with a hard stop. The agent must not auto-continue.
6. **Regression awareness**: When a new ticket touches a validated component, add a regression check.

---

## What UI-GATE is not

- It is not a testing framework — it is a delivery sequencing methodology
- It is not slow — the gate takes minutes, the rework it prevents takes days
- It is not only for Claude — the methodology works with any AI coding agent

---

## Terminology

| Term | Definition |
|------|-----------|
| Gate | The human UI validation checkpoint between tickets |
| Ticket | A single atomic feature with agent instructions and a validation checklist |
| Phase | A group of tickets built sequentially before a phase-level review |
| Validation | The human act of visually confirming a feature works and marking it VALIDATED |
| Stop signal | The mandatory agent output indicating it is awaiting human validation |
`

// ─── Sub-components ──────────────────────────────────────────────────────────

const MonoLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography
    component="div"
    sx={{
      fontFamily: "monospace",
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.2em",
      color: "text.secondary",
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      mb: 4,
      "&::before": {
        content: '""',
        display: "inline-block",
        width: 24,
        height: 1,
        bgcolor: "text.disabled",
      },
    }}
  >
    {children}
  </Typography>
)

const GateChip: React.FC<{ label: string }> = ({ label }) => (
  <Box
    component="span"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 0.5,
      fontFamily: "monospace",
      fontSize: 10,
      fontWeight: 600,
      color: "secondary.main",
      bgcolor: "rgba(56, 180, 198, 0.12)",
      border: "1px solid rgba(56,180,198,0.3)",
      px: 1,
      py: 0.25,
      borderRadius: 0.5,
      letterSpacing: "0.04em",
      mt: 1,
    }}
  >
    ▸ {label}
  </Box>
)

// ─── Page component ─────────────────────────────────────────────────────────

const UigPage: React.FC = () => {
  const handleDownload = useCallback(() => {
    const blob = new Blob([skillContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "uigate-skill.md"
    a.click()
    URL.revokeObjectURL(url)
    const btn = document.getElementById("dlbtn") as HTMLButtonElement | null
    if (btn) {
      btn.textContent = "✓ Downloaded"
      setTimeout(() => {
        btn.textContent = "↓ Download skill file"
      }, 3000)
    }
  }, [])

  return (
    <LayoutAlt>
      {/* ── Hero ── */}
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pb: 10,
          pt: 12,
          px: 3,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  color: "text.disabled",
                  textTransform: "uppercase",
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  "&::before": {
                    content: '""',
                    display: "inline-block",
                    width: 24,
                    height: 1,
                    bgcolor: "text.disabled",
                  },
                }}
              >
                Methodology — Agentic Engineering
              </Typography>

              <Typography
                component="h1"
                sx={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: { xs: "72px", md: "110px" },
                  fontWeight: 400,
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  color: "text.primary",
                  mb: 3,
                }}
              >
                UI-
                <Box component="span" sx={{ color: "secondary.main" }}>
                  GATE
                </Box>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  maxWidth: 560,
                  lineHeight: 1.65,
                  mb: 4,
                  fontWeight: 300,
                }}
              >
                A structured agentic development methodology where every feature
                passes a human UI validation checkpoint before the agent
                proceeds. Nothing ships blind. Nothing stacks on top of
                unvalidated work.
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  document
                    .getElementById("download")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                sx={{
                  alignSelf: "flex-start",
                  fontFamily: "monospace",
                }}
              >
                Download the skill file ↓
              </Button>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: -20,
                    border: "1px solid",
                    borderColor: "rgba(56, 180, 198, 0.1)",
                    zIndex: -1,
                  },
                }}
              >
                <img
                  src={uigateTerminal}
                  alt="UI-GATE Terminal Simulation"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              position: "absolute",
              bottom: 32,
              right: 32,
              fontFamily: "monospace",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.2em",
              writingMode: "vertical-rl",
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&::after": {
                content: '""',
                display: "block",
                width: 1,
                height: 40,
                bgcolor: "text.disabled",
              },
            }}
          >
            scroll
          </Box>
        </Container>
      </Box>

      <Divider />

      {/* ── Definition ── */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <MonoLabel>Definition</MonoLabel>

        <Box
          sx={{
            borderLeft: "1px solid",
            borderColor: "secondary.main",
            pl: 4,
            py: 2,
            mb: 6,
            bgcolor: "rgba(56, 180, 198, 0.10)",
            borderRadius: "0 4px 4px 0",
          }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "secondary.main",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            UI-GATE — UI-Gated Agentic Task Engineering
          </Typography>
          <Typography
            sx={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "text.primary",
              fontWeight: 300,
            }}
          >
            A methodology for AI-assisted software development in which each
            feature is built by an agent, validated visually by a human in the
            actual UI, and marked approved before the agent is permitted to
            proceed to the next ticket.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontFamily: "monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                color: "text.disabled",
                textTransform: "uppercase",
                mb: 1.5,
              }}
            >
              The problem it solves
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontWeight: 300, lineHeight: 1.75 }}
            >
              Most AI-generated codebases fail not because the agent wrote bad
              code — but because{" "}
              <strong style={{ color: "text.primary", fontWeight: 400 }}>
                no one validated feature 3 before the agent built features 4
                through 12 on top of it.
              </strong>{" "}
              By the time the UI breaks, the fix requires unwinding weeks of
              compounded work.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontFamily: "monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                color: "text.disabled",
                textTransform: "uppercase",
                mb: 1.5,
              }}
            >
              The mechanism
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontWeight: 300, lineHeight: 1.75 }}
            >
              UI-GATE inserts a{" "}
              <strong style={{ color: "text.primary", fontWeight: 400 }}>
                hard stop between every ticket.
              </strong>{" "}
              The agent completes one feature, outputs a stop signal, and waits.
              The human tests the feature in the live UI and explicitly marks it
              validated. Only then does the agent unlock the next ticket.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      {/* ── The loop ── */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <MonoLabel>The loop</MonoLabel>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0, mb: 6 }}>
          {[
            {
              n: "01",
              title: "Decompose requirements into atomic tickets",
              body: "Every requirement becomes a single, independently testable feature with a precise agent instruction block and a human validation checklist. One ticket does exactly one thing.",
            },
            {
              n: "02",
              title: "Agent builds the active ticket",
              body: "The agent receives the ticket, builds only what is specified, and does not look ahead. It has no access to future tickets until the current one is validated.",
            },
            {
              n: "03",
              title: "Agent emits a hard stop signal",
              body: (
                <>
                  On completion the agent outputs:{" "}
                  <code
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: "secondary.main",
                    }}
                  >
                    FEAT-XXX COMPLETE — AWAITING HUMAN VALIDATION
                  </code>{" "}
                  and waits. It does not continue.
                  <GateChip label="gate active" />
                </>
              ),
            },
            {
              n: "04",
              title: "Human validates in the live UI",
              body: "The human runs through the validation checklist in the actual running interface — not in code review. Each item is a visual action with an exact expected result.",
            },
            {
              n: "05",
              title: "Human unlocks the next ticket",
              body: (
                <>
                  On passing, the human responds:{" "}
                  <code
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: "secondary.main",
                    }}
                  >
                    FEAT-XXX VALIDATED — PROCEED TO FEAT-YYY
                  </code>
                  . The gate opens. The loop repeats.
                  <GateChip label="gate cleared" />
                </>
              ),
            },
          ].map(({ n, title, body }) => (
            <Box
              key={n}
              sx={{
                display: "grid",
                gridTemplateColumns: "48px 1fr",
                gap: 3,
                position: "relative",
                "&:not(:last-child)::after": {
                  content: '""',
                  position: "absolute",
                  left: 23,
                  top: 48,
                  bottom: -24,
                  width: 1,
                  bgcolor: "divider",
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "text.secondary",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {n}
              </Box>
              <Box sx={{ py: 1 }}>
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "text.primary",
                    mb: 0.5,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "text.secondary",
                    fontWeight: 300,
                    lineHeight: 1.65,
                  }}
                >
                  {body}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      <Container maxWidth="md" sx={{ pb: 10 }}>
        <Typography
          align="center"
          sx={{
            fontFamily: "monospace",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "text.disabled",
            textTransform: "uppercase",
            mb: 3,
          }}
        >
          Interactive Simulation
        </Typography>
        <GateDemo />
      </Container>

      <Divider />

      {/* ── Positioning ── */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <MonoLabel>Positioning</MonoLabel>

        <Grid container spacing={0} sx={{ mb: 6 }}>
          {/* Vibe coding */}
          <Grid item xs={12} md={6}>
            <Box sx={{ bgcolor: "background.paper", p: 4, borderRadius: 0 }}>
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  mb: 3,
                  pb: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  color: "text.disabled",
                }}
              >
                Vibe coding
              </Typography>
              {[
                'Agent runs until "done" — you see results at the end',
                "Features compound before any are validated",
                "Broken feature 3 is discovered at feature 12",
                "Rework unwinds weeks of stacked work",
                "Speed collapses at sprint 2 or 3",
              ].map((item, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize: 13,
                    color: "text.secondary",
                    py: 1.5,
                    borderBottom: i < 4 ? "1px solid" : "none",
                    borderColor: "divider",
                    fontWeight: 300,
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>
          {/* UI-GATE */}
          <Grid item xs={12} md={6}>
            <Box sx={{ bgcolor: "background.default", p: 4, borderRadius: 0 }}>
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  mb: 3,
                  pb: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  color: "secondary.main",
                }}
              >
                UI-GATE
              </Typography>
              {[
                "Agent runs one ticket, stops, waits for human approval",
                "Nothing stacks on top of unvalidated work",
                "Feature 3 is caught before feature 4 begins",
                "Rework is scoped to one ticket, never a cascade",
                "Velocity stays consistent across all sprints",
              ].map((item, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize: 13,
                    color: "text.primary",
                    py: 1.5,
                    borderBottom: i < 4 ? "1px solid" : "none",
                    borderColor: "divider",
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontFamily: "monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                color: "text.disabled",
                textTransform: "uppercase",
                mb: 1.5,
              }}
            >
              Relationship to agentic engineering
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontWeight: 300, lineHeight: 1.75 }}
            >
              Andrej Karpathy coined "agentic engineering" in 2026 to describe
              the discipline of orchestrating AI agents as a developer.{" "}
              <strong style={{ color: "text.primary", fontWeight: 400 }}>
                UI-GATE is a specific methodology within that discipline
              </strong>{" "}
              — the gate is the mechanism that makes agentic engineering
              production-safe.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontFamily: "monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                color: "text.disabled",
                textTransform: "uppercase",
                mb: 1.5,
              }}
            >
              What UI-GATE is not
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontWeight: 300, lineHeight: 1.75 }}
            >
              It is not a testing framework. It is not slow — the gate takes
              minutes, the rework it prevents takes days. It is not only for
              Claude —{" "}
              <strong style={{ color: "text.primary", fontWeight: 400 }}>
                the methodology works with any AI coding agent
              </strong>{" "}
              that can be instructed to stop and wait.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      {/* ── Six planning rules ── */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <MonoLabel>Six planning rules</MonoLabel>

        <Grid container spacing={0} sx={{ mb: 4 }}>
          {[
            {
              n: "01",
              title: "UI-first sequencing",
              body: "Every phase ends with something a human can see and click. Backend-only phases are not permitted unless a UI stub ships in the same phase.",
            },
            {
              n: "02",
              title: "One ticket, one concern",
              body: "Never bundle two features into one ticket. If the instinct arises, split. Atomicity is what makes the gate meaningful.",
            },
            {
              n: "03",
              title: "Fail-fast surfaces",
              body: "If a feature can break visually, the validation checklist must test that break explicitly. Unhappy paths are required checklist items, not optional.",
            },
            {
              n: "04",
              title: "No assumed state",
              body: "Agent instructions must not assume any state that hasn't been built and validated in a prior ticket. Each ticket is written to stand alone.",
            },
            {
              n: "05",
              title: "Stop signals are mandatory",
              body: "Every ticket ends with a hard stop. The agent must not auto-continue. Silence is not validation. The human must explicitly unlock the next ticket.",
            },
            {
              n: "06",
              title: "Regression awareness",
              body: "When a ticket touches a component used by a validated ticket, a regression check is added to the new ticket's checklist. Validated work is protected.",
            },
          ].map(({ n, title, body }) => (
            <Grid item xs={12} sm={6} md={4} key={n}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  p: 3,
                  borderRight: { md: "1px solid" },
                  borderBottom: { md: "1px solid" },
                  borderColor: "divider",
                  height: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    color: "text.disabled",
                    mb: 1.5,
                  }}
                >
                  {n}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "text.primary",
                    mb: 0.75,
                    letterSpacing: "0.01em",
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "text.secondary",
                    fontWeight: 300,
                    lineHeight: 1.65,
                  }}
                >
                  {body}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider />

      {/* ── Download ── */}
      <Container maxWidth="lg" sx={{ py: 10 }} id="download">
        <MonoLabel>Skill file</MonoLabel>

        <Typography
          sx={{
            color: "text.secondary",
            maxWidth: 560,
            mb: 4,
            fontWeight: 300,
            lineHeight: 1.75,
          }}
        >
          The UI-GATE skill file is a structured markdown document you add to
          your LLM context, agent framework, or Claude Projects. It instructs
          the model to decompose requirements into gated tickets, emit stop
          signals, and enforce the validation loop.
        </Typography>

        <Box
          sx={{
            bgcolor: "#0a0a09",
            border: "1px solid",
            borderColor: "divider",
            p: 3,
            mb: 4,
            maxHeight: 320,
            overflow: "hidden",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: "linear-gradient(transparent, #0a0a09)",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "#888880",
              whiteSpace: "pre-wrap",
            }}
          >
            {skillContent.split("\n").slice(0, 24).join("\n")}
          </Typography>
        </Box>

        <Box
          sx={{
            border: "1px solid",
            borderColor: "secondary.main",
            borderRadius: 0,
            bgcolor: "rgba(56, 180, 198, 0.10)",
            p: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 500,
                color: "text.primary",
                mb: 0.5,
              }}
            >
              uigate-skill.md
            </Typography>
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 12,
                color: "text.secondary",
                letterSpacing: "0.04em",
              }}
            >
              Markdown · Plain text — works with any LLM · Claude-optimized
            </Typography>
          </Box>
          <Button
            id="dlbtn"
            variant="outlined"
            color="secondary"
            onClick={handleDownload}
            sx={{
              fontFamily: "monospace",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              borderRadius: 0,
            }}
          >
            ↓ Download skill file
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {[
            "Claude Projects",
            "Claude Code",
            "Cursor Rules",
            "ChatGPT Custom Instructions",
            "Gemini System Prompt",
            "LangGraph",
            "Any agent framework",
          ].map(tag => (
            <Box
              key={tag}
              component="span"
              sx={{
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "text.disabled",
                border: "1px solid",
                borderColor: "divider",
                px: 1.5,
                py: 0.5,
                borderRadius: 0,
                bgcolor: "background.paper",
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>
      </Container>

      <Box
        sx={{
          bgcolor: "background.paper",
          py: 8,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  color: "secondary.main",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Empirical Proof
              </Typography>
              <Typography variant="h4" sx={{ color: "text.primary" }}>
                Built with UI-
                <Box component="span" sx={{ color: "secondary.main" }}>
                  GATE
                </Box>
              </Typography>
            </Box>
            <Typography
              sx={{
                maxWidth: 400,
                color: "text.secondary",
                fontWeight: 300,
                textAlign: { xs: "left", md: "right" },
              }}
            >
              This portfolio and its verification engine were built using the
              UI-GATE methodology. 112 atomic features delivered with zero
              compounding failures.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </LayoutAlt>
  )
}

// ─── Head ────────────────────────────────────────────────────────────────────

export const Head: HeadFC = () => {
  const schema = {
    "@context": "https://schema.org" as const,
    "@type": "WebPage" as const,
    name: "UI-GATE — UI-Gated Agentic Task Engineering",
    url: `${seoDefaults.siteUrl}/uig/`,
    description:
      "UI-GATE is a structured agentic development methodology where every feature passes a human UI validation checkpoint before the agent proceeds. Nothing ships blind.",
    about: [
      { "@type": "Thing" as const, name: "UI-Gated Agentic Task Engineering" },
      { "@type": "Thing" as const, name: "Agentic development methodology" },
      { "@type": "Thing" as const, name: "Human-in-the-loop AI development" },
    ],
  }

  return (
    <Seo
      title="UI-GATE — UI-Gated Agentic Task Engineering"
      description="A structured agentic development methodology where every feature must pass a human UI validation checkpoint before the agent proceeds. Nothing ships blind."
      pathname="/uig/"
      jsonLd={schema}
    />
  )
}

export default UigPage
