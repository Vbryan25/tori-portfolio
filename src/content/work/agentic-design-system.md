---
title: "Agentic Design System"
excerpt: "Every agentic design-to-code workflow rests on one thing: a design system structured so a machine can reason about it."
category: "Design Systems"
company: "Proctorio"
role: "Staff Designer"
stack: "Figma, Figma MCP, Claude Code"
problem: "Every traditional handoff has a translation layer — the gap between what the designer meant and what the engineer builds. If a model can read a well-structured design file and generate working UI, the deliverable doesn't have to be documentation anymore. It can be software."
task: "Lead an overhaul of the legacy design system with the goal of aligning with a company rebrand with a new modernized agentic design system."
outcome: "One canonical source — design system components linked to Figma via Code Connect — that everything else derives from or maps to, replacing prose docs and raw hardcoded tokens with structure a machine can reason about."
cardSize: "Large"
featured: true
draft: false
---

## What change is needed

An agent doesn't read your design system the way a human does. It needs clear structure, not prose.

Three failure points do most of the damage: raw tokens the agent hardcodes, component docs written for humans, and conflicting sources of truth.

The fixes: a three-tier token architecture, JSON component metadata, and one canonical source everything else derives from.

## Fix 1: Tokens the agent can reason about

Raw values are the first thing that breaks. Hand an agent `#008b8b` and it will cheerfully hardcode that hex in forty places. The moment you rebrand, every one of them is wrong, and no amount of prompting reliably stops it.

- **Primitives** are raw values — `teal-500: #008b8b`, `space-4: 16px`. The agent should never see these. If it does, it hardcodes them.
- **Semantics** are intent-named aliases — `color/action/primary`, `color/danger/background`. This is the only layer the agent reads and writes. The name describes the job, not the value, so a rebrand updates one alias and everything downstream follows.
- **Component tokens** are optional — `button/background/default → color/action/primary`. Skip them until you're doing multi-brand work.

## Fix 2: Component metadata

Most component documentation is written in prose, for humans. An agent needs a contract with explicit keys, explicit values, no ambiguity. The emerging consensus — surfaced across talks from Indeed, GitHub, and others at the AI Design Systems Conference 2026 — is JSON metadata per component, covering four things:

- **Props** — the states and variants that already exist in Figma. Five states in Figma, five states in the metadata. No interpretation.
- **Relationships** — what the agent must know before placing the component. Is it a form child? A toolbar item? What can it not sit next to? This is the context a human infers and an agent can't.
- **Tokens** — which semantic tokens the component consumes. Load-bearing in an agentic system, not decorative.
- **Usage** — what it's for, and the anti-patterns. Not the obvious ones ("don't put two primary buttons side by side"), but the specific ones only your team knows.

An agent can auto-generate the first draft of this metadata, but it comes back about 80% right and 20% generic. It'll list the obvious anti-patterns and miss the ones that actually bite: "never use a destructive button in onboarding," "loading state shows after 200ms, not immediately."

## Fix 3: One source of truth

The fix is architectural, not editorial. Pick one canonical source — for us, the design system components linked to Figma via Code Connect (or rich component descriptions, which do the same job without enterprise tooling). Everything else derives from it or maps to it. The Figma library, the docs site, the token files: none of them are independent truth. They're all projections of the one contract.

## What it changed

Pick one canonical source and everything else derives from it or maps to it. The Figma library, the docs site, the token files: none of them are independent truth anymore — they're all projections of the one contract.
