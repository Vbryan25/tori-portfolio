---
title: "Content-Anchored Quiz Generation"
excerpt: "POC — auto-generate a quiz from the student's own submission to verify authorship."
category: "Product Design"
company: "Proctorio (POC)"
role: "Lead Designer, POC owner"
team: "1 designer, 1 engineer, 1 ML researcher"
timeline: "4-week experiment"
stack: "Figma, Claude API, internal quiz engine"
problem: "Detection tools flag AI-written work but can't prove authorship. A student who wrote it can defend it."
outcome: "3–5 questions per submission; 82% of pilot flags matched follow-up review outcomes."
cardSize: "Wide"
featured: false
draft: false
---

## The hypothesis

Detection tools ask "did AI write this" and give a probability. That's not proof. If a student wrote a paper, they should be able to answer questions about it that an AI author couldn't.

## How generation works

The paper's key claims and specific examples become the source material. The model generates 3–5 short-answer questions the student answers in a proctored window. Answers are graded against the paper itself.

## The reviewer experience

Reviewers see the paper, the questions, the answers, and a similarity score. No AI probability number — just evidence for a human judgment call.

## Pilot results

82% of pilot cases correlated with follow-up review outcomes. Zero automated academic-integrity decisions — this is a tool for a conversation, not a verdict.
