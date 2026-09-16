# AI Program Control & Risk Workbench

**[View the Live Demo](https://ai-program-control-workbench.vercel.app/)**

A synthetic proof-of-work exploring a practical operating model for managing multiple AI initiatives: structure the intake, surface dependencies, make ownership visible, apply deterministic checks where appropriate, and keep consequential decisions with accountable humans.

> **System determines what can be determined. AI assists where judgment-support is useful. Humans make accountable decisions.**

This project does not claim to know an organization's governance answers. It demonstrates a way to make sure the right questions are surfaced, the right people are accountable for answering them, and unresolved dependencies remain visible before work moves forward.

## The problem

AI programs rarely consist of one idea. Multiple initiatives may be moving at once, each with dependencies spanning areas such as:

* ownership and sponsorship
* data sensitivity
* storage and tooling
* vendor considerations
* human accountability
* audit and logging readiness
* retention and residency review

Those questions can easily become fragmented across meetings, slides, chats, and individual memory.

The workbench explores what happens when they remain attached to the initiative itself: visible to program coordination and leadership, connected to accountable owners, and evaluated consistently as work progresses.

The seven program-control areas used here are part of this demonstration—not a claim that every organization should use the same controls.

## What the workbench demonstrates

### Portfolio

The Portfolio is the operational front door.

Five synthetic initiatives are shown together with ownership, lifecycle, readiness, and unresolved program controls. Stage-aware triage distinguishes between controls that are simply recorded and controls that currently require resolution.

The goal is to make two questions easy to answer:

**What needs attention? Who owns it?**

### Initiative workspace

Each initiative has three supporting views:

* **Intake** — what has been captured and what required information remains incomplete
* **Risk Pre-Check** — recorded classification separated from AI-assisted indicators and suggestions
* **Program Controls** — the organizational dependencies that may affect progression

The persistent workbench hierarchy keeps the initiative in context while moving among those views.

### Leadership Brief

A portfolio-level view consolidates actionable unresolved work into a **Needs attention** table, connecting each open dependency to the affected initiative and accountable owner.

### Guide

The Guide explains the operating model, including Lifecycle, Readiness, Program Controls, AI assistance versus human authority, and an interactive **Follow the Process** walkthrough.

The synthetic examples represent different situations in the process—not one initiative moving through time.

## Operating model

Three concepts intentionally remain separate.

**Lifecycle** — where an initiative currently sits:

`Draft → Intake Review → Risk Review → Ready for Approval → Approved for Launch → In Pilot → Complete`

**Readiness** — whether something at the current stage prevents progression:

`Clear | Blocked`

**Program-control status** — the recorded state of an individual control:

`Open | Satisfied | Not Applicable`

The demonstrated rule is stage-aware. During Draft and Intake Review, Open controls do not by themselves produce Blocked readiness. Beginning at Risk Review, applicable required Open controls can prevent progression.

Resolving a blocker does not automatically advance lifecycle. Progression remains an explicit human action.

## Human-in-the-middle

The workbench deliberately separates deterministic behavior, AI assistance, and human authority.

**Deterministic behavior**

* required intake completeness
* stage-aware readiness
* defined program-control checks

**AI-assisted behavior**

* intake summaries
* missing-information suggestions
* preliminary classification suggestions
* possible risk indicators
* draft leadership language

**Human authority**

* recorded working classification
* program-control decisions and status
* submission and lifecycle progression
* launch approval
* other consequential organizational decisions

AI suggestions remain visibly separate from recorded human decisions. AI does not approve, certify, clear, or advance initiatives.

## Design principles

* Capture information once; verify and enrich it as the initiative moves through review.
* Keep lifecycle, readiness, and control status distinct.
* Make unresolved dependencies and ownership visible.
* Use deterministic rules for deterministic checks.
* Use AI for assistance, not accountable organizational decisions.
* Require explicit human action for consequential progression.
* Prefer visible uncertainty over invented certainty.

## Synthetic examples

The demonstration uses five fictional initiatives:

* **Internal policy assistant**
* **Scheduling assistant**
* **Clinical-note summarization pilot**
* **Claims-document triage pilot**
* **Patient outreach drafting assistant**

All application data is synthetic. The examples do not represent a real healthcare organization, real patients, or a production implementation.

## Boundaries

This is a read-only proof-of-work, not a compliance or production healthcare system.

It:

* does not determine legal, regulatory, HIPAA, privacy, or security compliance
* contains no real patient or organizational data
* makes no live AI or external API calls
* has no persistence or authentication
* performs no functional workflow mutations or autonomous approvals

These boundaries are intentional: the project focuses on the operating model, program controls, authority boundaries, and coordination problem rather than pretending to be a finished enterprise platform.

## Technology

Built with **SvelteKit, TypeScript, Node.js, and Vercel**, using synthetic fixture data.

## Development approach

Development was assisted by AI coding tools under a stepwise, human-directed process with explicit scope control, deterministic validation, versioned known-good checkpoints, independent review, and production verification.

## Run locally

```sh
npm install
npm run dev
```

Validation:

```sh
npm run check
npm run build
```
