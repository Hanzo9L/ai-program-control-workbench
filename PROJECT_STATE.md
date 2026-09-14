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
- The local working copy is the source of day-to-day work. The GitHub remote now has Checkpoint 0 on `origin/main`.
- After an authorized commit, the GitHub remote must be updated so local and remote stay in sync.

# Architecture Decisions

- Implementation target: SvelteKit + TypeScript + Node.js, deployable on Vercel.
- Step 1 established the official `sv@0.17.0` minimal TypeScript baseline in the existing repository root.
- Adapter is `@sveltejs/adapter-auto` (generator default). Vercel-specific adapter configuration is not authorized.
- Application scaffolding was **not** authorized in Step 0.
- `PRODUCT_SPEC.md` is the authoritative product behavior specification.
- Five-screen model: Portfolio Dashboard; AI Workflow Intake; PHI / PII Risk Pre-Check; Workflow Detail / Program Controls; Leadership Brief.
- Seven lifecycle states: `Draft` → `Intake Review` → `Risk Review` → `Ready for Approval` → `Approved for Launch` → `In Pilot` → `Complete`.
- Readiness is independent of lifecycle: `Blocked` | `Clear`. Blocking does not change lifecycle state. Resolving blockers does not advance lifecycle state.
- Gate statuses: `Open` | `Satisfied` | `Not Applicable`. No `Waived` status or invented organizational waiver authority.
- AI may assist with summarization, preliminary classification suggestions, missing-information detection, risk indicators, and leadership-draft generation. AI may not submit intake, finalize classification, set gate status, change lifecycle state, approve launch, or declare compliance.
- Consequential progression remains explicit human action.
- Future automation candidates are limited to reducing clerical friction and remain subject to defined criteria, testing, policy, reliability requirements, and owner approval.
- Initial product uses synthetic data only.
- Typed domain model and synthetic fixtures live in `src/lib/domain/types.ts`, `constants.ts`, `fixtures.ts`, and `validation.ts`.
- Stage-aware readiness: during `Draft` / `Intake Review`, `Open` gates do not by themselves make readiness `Blocked`. From `Risk Review` onward, any required `Open` gate makes readiness `Blocked`.
- No further architecture decisions have been authorized.

# Current Authorized Step

Checkpointing Step 3 — typed domain model and synthetic fixtures validated.

# Completed and Validated Steps

- **Step 0 — Establish repository governance and project-state documentation.** Completed, validated, committed, and pushed.
- **Step 1 — Scaffold and validate the application baseline.** Completed, validated, committed, and pushed.
- **Step 2 — Define the product shape and workflow/state model.** Completed and validated. Pending commit.
- **Step 3 — Define typed domain model and synthetic fixture data.** Completed and validated. Pending commit.

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

Step 1 independently validated. Confirmed:

- Scaffold command used: `npx --yes sv create . --template minimal --types ts --no-add-ons --install npm --no-dir-check --no-download-check`
- Runtime: Node.js `v24.11.1`, npm `11.8.0`
- Installed baseline: Svelte `5.57.0`, SvelteKit `2.70.3`, Vite `8.3.0`, `@sveltejs/adapter-auto` `7.0.1`
- `npm run check` passed with 0 errors and 0 warnings.
- `npm run build` passed successfully.
- Local `adapter-auto` environment warning is expected and is not a build failure.
- `CLAUDE.md` and `PROJECT_STATE.md` were unchanged during scaffold validation.
- No workbench, healthcare, AI, API, database, auth, dashboard, risk, PHI/PII, or business logic was introduced.
- Git branch remains `main`.
- Remote remains `origin`.

Step 2 independently reviewed and validated by the project architect. Confirmed:

- `PRODUCT_SPEC.md` is now the authoritative product behavior specification.
- Five-screen model: Portfolio Dashboard; AI Workflow Intake; PHI / PII Risk Pre-Check; Workflow Detail / Program Controls; Leadership Brief.
- Seven lifecycle states: `Draft` → `Intake Review` → `Risk Review` → `Ready for Approval` → `Approved for Launch` → `In Pilot` → `Complete`.
- Readiness is independent: `Blocked` | `Clear`.
- Blocking does not change lifecycle state.
- Resolving blockers does not advance lifecycle state.
- Gate statuses: `Open` | `Satisfied` | `Not Applicable`.
- No `Waived` status or invented organizational waiver authority.
- AI may assist with summarization, preliminary classification suggestions, missing-information detection, risk indicators, and leadership-draft generation.
- AI may not submit intake, finalize classification, set gate status, change lifecycle state, approve launch, or declare compliance.
- Consequential progression remains explicit human action.
- Future automation candidates are limited to reducing clerical friction and remain subject to defined criteria, testing, policy, reliability requirements, and owner approval.
- Initial product uses synthetic data only.

Step 3 independently validated. Confirmed:

- Created: `src/lib/domain/types.ts`, `src/lib/domain/constants.ts`, `src/lib/domain/fixtures.ts`, `src/lib/domain/validation.ts`.
- Domain model implements the validated seven lifecycle states, independent `Blocked` | `Clear` readiness, and `Open` | `Satisfied` | `Not Applicable` gate status.
- Stage-aware readiness: `Draft` / `Intake Review`: `Open` gates do not by themselves make readiness `Blocked`. `Risk Review` onward: any required `Open` gate makes readiness `Blocked`.
- Five synthetic initiatives created exactly as defined in `PRODUCT_SPEC.md`.
- `npm run check` passed with 0 errors and 0 warnings.
- `npm run build` passed successfully.
- Runtime fixture validation passed: `PASS: all 5 synthetic initiatives validated`.
- Negative validation tests passed: Draft + Open gates may remain Clear; Risk Review + Open gates + Clear rejected; Ready for Approval + no Open gates + Blocked rejected; duplicate required gate rejected; forbidden `Waived` status rejected.
- Temporary validation runners were deleted after execution.
- No dependencies were added.
- No routes/components, auth, persistence, API code, state-management libraries, or workflow engine were introduced.

# Known-Good Checkpoints

- **Checkpoint 0:** Step 0 repository governance and project-state documentation. Completed, validated, committed, and pushed.
  - Commit: `474ea3e5008aacc388b2a5b458c01856eea32d3d`
  - Message: `Initialize project governance and state tracking`
  - Remote branch: `origin/main`
- **Checkpoint 1:** Step 1 clean SvelteKit application baseline. Completed, validated, committed, and pushed.
  - Commit: `375a45d`
  - Message: `Establish validated SvelteKit baseline`
  - Remote branch: `origin/main`
- **Checkpoint 2 (pending commit):** Validated product behavior specification. Pending authorized commit.
- **Checkpoint 3 (pending commit):** Validated typed domain model and synthetic fixture dataset. Pending authorized commit.

# Blockers

None.

# Open Questions

None recorded.

# Next Authorized Step

Not yet authorized.
