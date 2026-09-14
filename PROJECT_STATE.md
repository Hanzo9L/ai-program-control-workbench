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
- The root route renders a read-only Portfolio Dashboard from `SYNTHETIC_INITIATIVES`. No duplicate initiative data source.
- Initiative names on the dashboard link to `/initiatives/{initiative.id}`. The detail route loads the matching fixture record; unknown IDs return SvelteKit 404.
- `/initiatives/{id}/risk-precheck` is a read-only PHI / PII Risk Pre-Check. It loads the matching fixture record, separates recorded human classification from AI suggestions/indicators, and does not generate missing suggestions.
- `/leadership-brief` is a read-only Leadership Brief derived from `SYNTHETIC_INITIATIVES`. Existing `leadership_draft` suggestions are shown separately and are not the recorded brief.
- `/initiatives/{id}/intake` is a read-only AI Workflow Intake. It loads the matching fixture record, evaluates deterministic intake completeness separately from readiness, and displays existing AI suggestions separately from recorded human data.
- No further architecture decisions have been authorized.

# Current Authorized Step

PAUSED — Checkpoint 8 is the last known-good state. Five-screen read-only MVP validated.

# Completed and Validated Steps

- **Step 0 — Establish repository governance and project-state documentation.** Completed, validated, committed, and pushed.
- **Step 1 — Scaffold and validate the application baseline.** Completed, validated, committed, and pushed.
- **Step 2 — Define the product shape and workflow/state model.** Completed, validated, committed, and pushed.
- **Step 3 — Define typed domain model and synthetic fixture data.** Completed, validated, committed, and pushed.
- **Step 4 — Read-only Portfolio Dashboard.** Completed, validated, committed, and pushed.
- **Step 5 — Read-only Workflow Detail / Program Controls.** Completed, validated, committed, and pushed.
- **Step 6 — Read-only PHI / PII Risk Pre-Check.** Completed, validated, committed, and pushed.
- **Step 7 — Read-only Leadership Brief.** Completed, validated, committed, and pushed.
- **Step 8 — Read-only AI Workflow Intake.** Completed, validated, committed, and pushed.

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

Step 4 independently validated. Confirmed:

- Root route now renders the read-only Portfolio Dashboard directly from `SYNTHETIC_INITIATIVES`.
- No duplicate/hard-coded initiative data source was introduced.
- Dashboard displays: total initiatives; blocked count; Ready for Approval count; In Pilot count; initiative name; owner; lifecycle; readiness; open gate count and labels; last updated.
- Derived validated counts: Total 5; Blocked 2; Ready for Approval 1; In Pilot 1.
- Runtime HTML validation confirmed all five synthetic initiative names render.
- Runtime HTML validation confirmed the synthetic-data / no-compliance disclaimer renders.
- `npm run check` passed with 0 errors and 0 warnings.
- `npm run build` passed.
- Only `src/routes/+page.svelte` was changed for implementation.
- No dependencies, domain behavior, persistence, auth, AI behavior, workflow transitions, APIs, or state-management libraries were introduced.

Step 5 independently validated. Confirmed:

- Added: `src/routes/initiatives/[id]/+page.ts`, `src/routes/initiatives/[id]/+page.svelte`.
- Portfolio Dashboard initiative names now link to `/initiatives/{initiative.id}`.
- Detail route loads the matching initiative from `SYNTHETIC_INITIATIVES`.
- Unknown IDs return SvelteKit 404 with `Initiative not found`.
- Detail screen renders: lifecycle; readiness; owner; sponsor; problem/outcome; intended users; synthetic data description; tools/vendors; success signal; known constraints; classification; last updated; initiative notes; all seven program controls; recorded human actor/timestamp where present; AI-assisted suggestions separately from recorded human decisions.
- Runtime validation confirmed: Clear initiative route returns 200 and renders Scheduling assistant, Ready for Approval, Clear.
- Runtime validation confirmed: Blocked initiative renders Clinical-note summarization pilot, Risk Review, Blocked; blocking gates Storage / tool approval and Data sensitivity review render; all seven controls render.
- Runtime validation confirmed: nonexistent initiative returns HTTP 404 with `Initiative not found`.
- `npm run check` passed with 0 errors and 0 warnings.
- `npm run build` passed successfully.
- No dependencies, persistence, auth, AI execution, workflow transitions, state-management libraries, or domain behavior changes were introduced.

Step 6 independently validated. Confirmed:

- Added: `src/routes/initiatives/[id]/risk-precheck/+page.ts`, `src/routes/initiatives/[id]/risk-precheck/+page.svelte`.
- Initiative detail screen now links to the Risk Pre-Check using the fixture ID.
- Risk Pre-Check loads directly from `SYNTHETIC_INITIATIVES`.
- Unknown IDs return SvelteKit 404 with `Initiative not found`.
- Screen explicitly separates: recorded human classification; AI-assisted preliminary classification suggestion; AI-assisted possible risk indicators; recorded program controls; compliance determination.
- AI suggestions/indicators are displayed only when already present in fixture data; none are generated or inferred by the screen.
- Stage-aware readiness uses the existing validated domain constant and policy.
- Program Controls renders all seven gates.
- Human Authority section explicitly preserves human responsibility for classification, gate status, and progression decisions.
- Synthetic/no-compliance disclaimer is visible.
- Runtime validation confirmed: Clinical-note summarization pilot — Risk Review, Blocked, PHI described, expected AI suggestion/indicator and two Open blocking controls.
- Runtime validation confirmed: Scheduling assistant — Ready for Approval, Clear, Neither PHI nor PII described, no invented preliminary suggestion, no invented risk indicators.
- Both scenarios render seven controls.
- Unknown ID returns HTTP 404 with `Initiative not found`.
- `npm run check` passed with 0 errors and 0 warnings.
- `npm run build` passed successfully.
- No dependencies, domain behavior, persistence, auth, AI execution, workflow transitions, APIs, or state-management libraries were introduced.

Step 7 independently validated. Confirmed:

- Added `src/routes/leadership-brief/+page.svelte`.
- Portfolio Dashboard now links to `/leadership-brief`.
- Leadership Brief derives all content directly from `SYNTHETIC_INITIATIVES`.
- Runtime-validated counts: Total 5; Blocked 2; Ready for Approval 1; Approved for Launch 0; In Pilot 1.
- Blocked section includes: Clinical-note summarization pilot; Patient outreach drafting assistant.
- Unresolved dependencies include: Storage / tool approval; Data sensitivity review; Human accountability; Retention / residency review.
- Draft / Intake Review Open gates are excluded from leadership-level blocker grouping by the validated stage-aware rule.
- Owner/action items are derived only from recorded owners and Open gates.
- Launch/readiness summary is deterministic and descriptive only.
- Existing `leadership_draft` suggestions are displayed in a separate Existing AI-assisted draft snippets section and explicitly labeled as not the recorded leadership brief.
- No recommendations, compliance claims, or new facts are generated.
- `npm run check` passed with 0 errors and 0 warnings.
- `npm run build` passed successfully.
- No dependencies, domain behavior, persistence, auth, workflow transitions, API calls, or state-management libraries were introduced.

Step 8 independently validated. Confirmed:

- Added: `src/routes/initiatives/[id]/intake/+page.ts`, `src/routes/initiatives/[id]/intake/+page.svelte`.
- Initiative detail screen now links to `/initiatives/{initiative.id}/intake`.
- Intake route loads directly from `SYNTHETIC_INITIATIVES`.
- Unknown IDs return SvelteKit 404 with `Initiative not found`.
- Initial-product required intake fields are exactly: initiative name; problem / outcome; intended users; synthetic data description; tools / vendors; owner; sponsor; success signal.
- Known constraints is displayed but is not required for submission.
- Deterministic incompleteness means null, empty/whitespace-only, or the explicit synthetic placeholder `Not yet specified`.
- Intake completeness remains separate from readiness.
- Internal policy assistant runtime validation: Draft; Clear; Complete fields 4 of 8; Incomplete fields 4; incomplete: Tools / vendors, Owner, Sponsor, Success signal.
- Scheduling assistant runtime validation: Ready for Approval; Clear; Complete fields 8 of 8; Incomplete fields 0.
- AI intake summary, missing-information suggestions, and preliminary-classification suggestions are displayed separately from deterministic completeness and recorded human data.
- Human submission boundary is explicit: no Save/Submit controls; submission is a human action; completing required fields does not auto-submit; AI cannot submit or advance lifecycle.
- Unknown intake ID returns HTTP 404 with `Initiative not found`.
- `npm run check` passed with 0 errors and 0 warnings.
- `npm run build` passed successfully.
- No dependencies, domain behavior, persistence, auth, workflow mutations, API calls, or state-management libraries were introduced.

# Known-Good Checkpoints

- **Checkpoint 0:** Step 0 repository governance and project-state documentation. Completed, validated, committed, and pushed.
  - Commit: `474ea3e5008aacc388b2a5b458c01856eea32d3d`
  - Message: `Initialize project governance and state tracking`
  - Remote branch: `origin/main`
- **Checkpoint 1:** Step 1 clean SvelteKit application baseline. Completed, validated, committed, and pushed.
  - Commit: `375a45d`
  - Message: `Establish validated SvelteKit baseline`
  - Remote branch: `origin/main`
- **Checkpoint 2:** Step 2 product behavior specification. Completed, validated, committed, and pushed.
  - Commit: `4dd32e1`
  - Message: `Define validated product behavior specification`
  - Remote branch: `origin/main`
- **Checkpoint 3:** Step 3 typed domain model and synthetic fixture dataset. Completed, validated, committed, and pushed.
  - Commit: `cfecc92`
  - Message: `Establish validated domain model and fixtures`
  - Remote branch: `origin/main`
- **Checkpoint 4:** Step 4 read-only Portfolio Dashboard. Completed, validated, committed, and pushed.
  - Commit: `e762add`
  - Message: `Add validated read-only portfolio dashboard`
  - Remote branch: `origin/main`
- **Checkpoint 5:** Step 5 read-only Workflow Detail / Program Controls screen. Completed, validated, committed, and pushed.
  - Commit: `71f0e7a`
  - Message: `Add validated workflow detail screen`
  - Remote branch: `origin/main`
- **Checkpoint 6:** Step 6 read-only PHI / PII Risk Pre-Check. Completed, validated, committed, and pushed.
  - Commit: `b0090ff`
  - Message: `Add validated PHI PII risk pre-check`
  - Remote branch: `origin/main`
- **Checkpoint 7:** Step 7 read-only Leadership Brief. Completed, validated, committed, and pushed.
  - Commit: `9f0126b`
  - Message: `Add validated leadership brief`
  - Remote branch: `origin/main`
- **Checkpoint 8:** Step 8 read-only AI Workflow Intake. Completed, validated, committed, and pushed.
  - Commit: `836a90b`
  - Message: `Add validated read-only AI workflow intake`
  - Remote branch: `origin/main`

# Last Known-Good Checkpoint

- **Checkpoint 8**
- Commit: `836a90b`
- Message: `Add validated read-only AI workflow intake`
- Branch: `main`
- Remote: `origin/main`
- Local and remote synchronized.

# Current Validated Application State

The complete five-screen read-only product shape is implemented and validated:

- Portfolio Dashboard
- AI Workflow Intake
- PHI / PII Risk Pre-Check
- Workflow Detail / Program Controls
- Leadership Brief

Supporting validated foundations:

- SvelteKit / TypeScript / Node.js baseline
- typed domain model
- five synthetic initiative fixtures
- deterministic stage-aware readiness
- deterministic intake completeness
- program-control gate model
- human/AI authority boundaries
- runtime validation for representative Clear, Blocked, incomplete-intake, leadership-summary, and 404 scenarios
- synthetic data only
- no persistence
- no authentication
- no live AI/API integration
- no workflow mutations

# Stopping-Point Rule

No implementation work is currently authorized.

# Blockers

None.

# Open Questions

None recorded.

# Next Authorized Step

Not yet authorized. Recommended next phase: demo/deployment hardening before workflow mutations.

# Resume From Here

Begin by verifying:

```
git status --short
git status -sb
git log -3 --oneline
```

Expected HEAD: `836a90b Add validated read-only AI workflow intake`

Re-read:

- `PROJECT_STATE.md`
- `CLAUDE.md`
- `PRODUCT_SPEC.md`

Do not begin feature work until a new step is explicitly authorized.

Recommended next work:

- README/demo documentation
- Vercel deployment/configuration
- final visual/demo review
- only then decide whether any mutation behavior is necessary
