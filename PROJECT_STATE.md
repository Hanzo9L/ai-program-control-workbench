# Project Identity

- **Name:** AI Program Control & Risk Workbench
- **Form:** Lightweight proof-of-work
- **Product owner / final decision authority:** Joseph
- **Project architect / project manager:** GPT-5.6 Sol
- **Repository-aware implementation engineer:** Claude Code
- **Canonical remote:** https://github.com/Hanzo9L/ai-program-control-workbench.git
- **Working copy:** The local folder on this machine (`ai-program-control-workbench`) is the working point. Work happens locally first. The remote must be kept up to date after authorized commits.

# Project Intent

Demonstrate thoughtful AI program management: structuring ambiguous AI initiatives, surfacing dependencies and risk, using automation where justified, retaining accountable human review where appropriate, and clearly communicating readiness.

The work should demonstrate competency, judgment, structure, and attention to detail rather than expert theater.

# Non-Goals / Boundaries

- This project is not intended to represent Curana Health systems, policies, architecture, compliance requirements, or actual healthcare workflows.
- Synthetic / fake data only.
- The application must not claim to determine legal, regulatory, HIPAA, privacy, or security compliance.
- The project must not present Joseph as a healthcare compliance expert, security engineer, or deep AI engineer.

# Core Design Principles

- Synthetic / fake data only.
- AI assists; accountable humans retain authority over consequential decisions.
- Human review is intentional where risk, ambiguity, or organizational approval requires it.
- Some human checkpoints may later be candidates for deterministic automation, but only after defined acceptance criteria, representative testing, exception testing, appropriate reliability thresholds, and owner approval.
- The application must not claim to determine legal, regulatory, HIPAA, privacy, or security compliance.
- The project should demonstrate competency, judgment, structure, and attention to detail rather than expert theater.

# Development Methodology

- Work only on the currently authorized step.
- Do not implement future steps.
- Do not scaffold the application until that step is explicitly authorized.
- Do not add dependencies unless the current authorized step requires them.
- Do not refactor unrelated files.
- Do not make architectural decisions beyond what is explicitly authorized.
- If a requested change conflicts with the repository, creates regression risk, or a materially better implementation exists, stop before modifying anything and explain why.
- Model judgment is not evidence of correctness.
- Each implementation step requires objective validation.
- A failed validation remains part of the current step until resolved.
- Once validated, a step becomes a known-good checkpoint and should not be altered without explicit authorization.
- Git commits represent validated known-good checkpoints.
- The local working copy is the source of day-to-day work. Do not treat the empty GitHub remote as having project content until the first authorized commit is pushed.
- After an authorized commit, the GitHub remote must be updated so local and remote stay in sync.

# Architecture Decisions

- Implementation target (authorized as target only; not yet implemented): SvelteKit + TypeScript + Node.js, deployable on Vercel.
- Application scaffolding is **not** authorized in Step 0.
- No further architecture decisions have been authorized.

# Current Authorized Step

Checkpointing Step 0 — repository governance and project-state documentation validated.

# Completed and Validated Steps

- **Step 0 — Establish repository governance and project-state documentation.** Independently validated. Pending commit.

# Validation Evidence

Step 0 independently validated. Confirmed:

- Only `CLAUDE.md` and `PROJECT_STATE.md` exist in the project root besides `.git/`.
- Required first-level headings are present in both files.
- Required project boundaries and implementation rails are recorded.
- No SvelteKit scaffold, dependencies, `package.json`, `src`, `node_modules`, or Svelte config files exist.
- Git remote is `https://github.com/Hanzo9L/ai-program-control-workbench.git`.
- Current branch is `main`.

Validation commands (concise):

```
git status --short
ls -la
grep '^# ' PROJECT_STATE.md
grep '^# ' CLAUDE.md
git remote -v
git branch --show-current
grep -Ei 'synthetic|AI assists|human|compliance|SvelteKit|TypeScript|Node\.js|Vercel|Step 0|Not yet authorized' PROJECT_STATE.md
grep -Ei 'one authorized|refactor|validated|objective|PROJECT_STATE|commit' CLAUDE.md
# absence check: package.json, src, node_modules, svelte.config.js, svelte.config.ts
git branch -M main
git branch --show-current
git status --short
```

# Known-Good Checkpoints

- **Checkpoint 0 (pending commit):** Step 0 repository governance and project-state documentation. First known-good project-state checkpoint, pending authorized commit.

# Blockers

None.

# Open Questions

None recorded.

# Next Authorized Step

Not yet authorized.
