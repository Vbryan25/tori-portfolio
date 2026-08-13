---
title: "Design Skills Infrastructure"
excerpt: "A shared Claude Code skills infrastructure that generates design-to-dev specs directly from prototypes."
category: "Design Systems"
company: "Proctorio"
role: "Staff Product Designer — owner and architect"
team: "DesignOps · AI-native workflow · Design systems"
problem: "Designers were spending too much time producing handoff documentation, and engineers were spending too much time deciphering it. Specs were inconsistent, went stale the moment a design changed, and left too much room for interpretation between design intent and shipped code."
outcome: "Built on the RDS v2 design system overhaul (37 components, 94% fewer card variants) — a v2 card dropped from two weeks to 1.5 days to build, saving roughly 64 engineering hours per component."
cardSize: "Large"
featured: true
draft: false
---

Internal design-to-development infrastructure for an enterprise EdTech design and engineering team.

## The problem

Designers were spending too much time producing handoff documentation, and engineers were spending too much time deciphering it. Specs were inconsistent, went stale the moment a design changed, and left too much room for interpretation between design intent and shipped code. As the design system matured, the gap between "designed" and "built" was where time and fidelity kept getting lost.

## What I built

I created and defined a shared Claude Code skills infrastructure that powers designers through every phase of the process. It lives in a single repository that each designer clones and symlinks to their machine, so the whole team works from the same commands and standards.

Each phase has its own command — including `/write-spec`, `/research-synthesis`, and `/ux-copy` — and every skill is grounded in our brand goals and product context so its output stays on-brand and consistent by default.

At the center is a handoff skill that generates design-to-dev specs directly from prototypes built in Claude Code. I defined its output structure so every spec navigates the prototype, documents how a screen looks by design, and documents how it functions by design, with release notes generated automatically whenever a spec is updated. To close the loop, I connected Figma to Claude through MCP and Code Connect so prototypes build from real design-system components, and authored the agentic pipeline that ingests a PRD, aligns it to our coding standards and design system, and outputs production-ready code.

Around the tooling, I documented a formal design-to-dev handoff protocol so the process is repeatable across the team rather than dependent on any one designer.

## Impact

- Cut the time designers spend authoring documentation by moving it into repeatable, context-aware skills.
- Reduced the friction engineers hit when consuming specs, replacing hand-maintained docs with a consistent structure and automated release notes.
- Kept specs in sync with design by generating them from the source prototype instead of maintaining them separately.
- Built on the RDS v2 design system I overhauled (37 components, 94% fewer card variants), where a v2 card dropped from two weeks to 1.5 days to build, saving roughly 64 engineering hours per component.
