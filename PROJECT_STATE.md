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
- The root route historically included a Demo Orientation & Data Guide above the Portfolio Dashboard, including Follow the process as a progressive four-stage process board (representative snapshots, not one initiative moving through time). On `workbench-shell`, that educational material lives at `/guide`; `/` is Portfolio-only.
- Shared application navigation lives in `src/lib/components/AppNav.svelte`.
- On `workbench-shell`, global destinations are Portfolio / Leadership Brief / Guide. Portfolio is the front door (`/`). Full educational/orientation material, including the progressive process board, lives at `/guide`.
- On `workbench-shell`, a persistent Workbench Shell applies to Portfolio and initiative routes only (`/`, `/initiatives/{id}`, `/initiatives/{id}/intake`, `/initiatives/{id}/risk-precheck`). `/guide` and `/leadership-brief` do not render the initiative tree.
- Desktop: initiative hierarchy + workspace. Narrow widths: hierarchy stacked above workspace. Public initiative URLs are unchanged. The SvelteKit URL remains authoritative for selected initiative and selected child workspace.
- Initiative child views are Intake / Risk Pre-Check / Program Controls. `/initiatives/{id}` remains Program Controls; no Overview screen was introduced.
- Production / `main` / `origin/main` have not been replaced by `workbench-shell`.
- No further architecture decisions have been authorized.

# Current Authorized Step

PAUSED — `workbench-shell` preview validated structurally. One initiative-tree disclosure UX correction remains before merge consideration.

Do not implement that correction in this recording step. Do not begin Phase C. Do not add new features. Do not merge to `main` yet. Do not modify the production branch.

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
- **Step 9 — Demo Orientation & Data Guide.** Completed, validated, committed, and pushed.
- **Step 10 — Shared Application Navigation.** Completed, validated, committed, and pushed.
- **Step 11 — Follow the Process / Human Checkpoint Guide.** Completed and validated. Pending commit.
- **Step 12 — Progressive Follow-the-Process Board.** Completed and validated. Pending commit.

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

Step 9 independently validated. Confirmed:

- Root page now includes a Demo Orientation & Data Guide above the existing Portfolio Dashboard.
- Orientation explains: what the proof-of-work is; synthetic-data and non-representation boundaries; Lifecycle; Readiness; stage-aware Blocked behavior; the seven Program Controls; Open, Satisfied, and Not Applicable; AI assistance vs human authority; where to explore the five validated application surfaces.
- Explicitly states that Blocked does not mean unsafe, noncompliant, failed, or rejected.
- Existing AI content is described as fixture-based and read-only.
- Includes the principle: AI can suggest. Deterministic rules can enforce defined checks. Humans remain accountable for decisions.
- Suggested starting point is the synthetic Clinical-note summarization pilot.
- Development transparency states that the application uses SvelteKit, TypeScript, Node.js, synthetic data, and AI-assisted coding under stepwise validation, human review, and version control.
- Existing Portfolio Dashboard remains fixture-driven from `SYNTHETIC_INITIATIVES`.
- Dashboard counts remain: Total 5; Blocked 2; Ready for Approval 1; In Pilot 1.
- Runtime validation confirmed orientation, controls, explore links, and dashboard counts render.
- `npm run check` passed with 0 errors and 0 warnings.
- `npm run build` passed successfully.
- No dependencies, domain behavior, persistence, auth, workflow mutations, APIs, or state-management libraries were introduced.

Step 10 independently validated. Confirmed:

- Added shared navigation component: `src/lib/components/AppNav.svelte`.
- Replaced page-specific navigation rows in: root page; Leadership Brief; Workflow Detail / Program Controls; AI Workflow Intake; PHI / PII Risk Pre-Check.
- Root / Leadership navigation: Overview; Portfolio; Leadership Brief.
- Initiative navigation: Portfolio; Intake; Risk Pre-Check; Program Controls; Leadership Brief.
- Initiative-specific links preserve the current initiative ID.
- Active state uses subtle styling plus `aria-current="page"`.
- Runtime validation confirmed: root navigation renders expected links; Portfolio points to `/#portfolio-dashboard`; Clinical-note initiative navigation renders all five links; Intake and Risk Pre-Check preserve `syn-clinical-note-summarization`.
- Existing page bodies and business behavior remain unchanged.
- `npm run check` passed with 0 errors and 0 warnings.
- `npm run build` passed successfully.
- No dependencies, domain behavior, persistence, auth, workflow mutations, APIs, or state-management libraries were introduced.

Step 11 independently validated. Confirmed:

- Root Demo Orientation now includes Follow the process.
- The guide explicitly states the synthetic initiatives are representative snapshots of different points in the process, not one initiative moving through time.
- Four representative stages are shown: Internal policy assistant — Draft / Clear, intake completeness 4 of 8; Clinical-note summarization pilot — Risk Review / Blocked, with Storage / tool approval and Data sensitivity review Open; Scheduling assistant — Ready for Approval / Clear; Claims-document triage pilot — In Pilot / Clear.
- Each stage explains: What this represents; System / deterministic behavior; AI assistance; Human checkpoint; What happens next; Follow this step.
- Guide preserves the distinction between system determination, AI assistance, and accountable human decisions.
- No functional approvals, submissions, lifecycle transitions, or mutations were introduced.
- Runtime validation confirmed four Human checkpoints, four What happens next sections, all four representative examples and process links.
- Portfolio Dashboard remains 5 / 2 / 1 / 1.
- `npm run check` passed with 0 errors and 0 warnings.
- `npm run build` passed successfully.
- No dependencies, domain behavior, persistence, auth, APIs, or state-management libraries were introduced.

Step 12 independently validated. Confirmed:

- Root Demo Orientation Follow the process is now a progressive, selectable four-stage process board rather than four simultaneously visible cards.
- The board represents: 1 Draft / Intake → 2 Risk Review → 3 Ready for Approval → 4 In Pilot.
- The guide explicitly states the synthetic initiatives are representative snapshots of different points in the process, not one initiative moving through time. The board represents the process; different synthetic initiatives demonstrate representative states within it.
- Only one selected-stage detail is visible at a time. Each stage uses: Recorded state; System + AI; Human checkpoint; What happens next; Explore this stage; Continue for Stages 1–3.
- Representative stages remain: Internal policy assistant — Draft / Clear, intake completeness 4 of 8; Clinical-note summarization pilot — Risk Review / Blocked, with Storage / tool approval and Data sensitivity review Open; Scheduling assistant — Ready for Approval / Clear; Claims-document triage pilot — In Pilot / Clear.
- Progressive Continue unlocks later stages in the current page session; already-revealed stages are selectable without repeating the unlock sequence; reload resets to Stage 1; walkthrough state is not persisted.
- Stage 4 has no fake next stage. A restrained completion message is shown. Navigation and Explore links remain usable during the walkthrough.
- Process principle preserved: System determines what can be determined. AI assists where judgment-support is useful. Humans make accountable decisions.
- No functional approvals, submissions, lifecycle transitions, or mutations were introduced.
- Runtime validation confirmed: root HTTP 200; Follow the process and representative-snapshot boundary render; Stage 1 is the initial selected stage and the only initially visible detail; the process rail shows all four stage names; Continue exists for Stages 1–3; all four Explore routes and the Stage 2 Risk Pre-Check supporting route are correct.
- Progressive interaction was exercised in the browser: Continue 1→2→3→4; backward/forward among revealed stages; reload reset; application navigation remained usable.
- Portfolio Dashboard remains 5 / 2 / 1 / 1. All five synthetic initiatives remain rendered.
- `npm run check` passed with 0 errors and 0 warnings.
- `npm run build` passed successfully.
- The complete Step 12 diff was audited before checkpointing. Verdict: SCOPE CLEAN. No unrelated changes were found.
- Implementation changed only `src/routes/+page.svelte`.
- No dependencies, domain behavior, persistence, auth, APIs, or state-management libraries were introduced.

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
- **Checkpoint 9:** Step 9 Demo Orientation & Data Guide. Completed, validated, committed, and pushed.
  - Commit: `a8f1cb3`
  - Message: `Add validated demo orientation and data guide`
  - Remote branch: `origin/main`
- **Checkpoint 10:** Step 10 Shared Application Navigation. Completed, validated, committed, and pushed.
  - Commit: `6519222`
  - Message: `Add validated shared application navigation`
  - Remote branch: `origin/main`
- **Checkpoint 11 (pending commit):** Validated Follow the Process / Human Checkpoint Guide. Pending authorized commit.
- **Checkpoint 12 (pending commit):** Validated Progressive Follow-the-Process Board. Pending authorized commit. The complete Step 12 diff was audited before this recording; SCOPE CLEAN; no unrelated changes found.

# Last Known-Good Checkpoint

Production / `main` / `origin/main`:

- Commit: `c1ad370`
- Message: `Add validated progressive process board`
- Branch: `main`
- Remote: `origin/main`

`workbench-shell` is a development branch ahead of `main`. It is structurally preview-validated on the branch. It has not been merged. Production has not been replaced by `workbench-shell`.

# Current Validated Application State

The complete five-screen read-only product shape remains implemented.

**Production (`main` / `origin/main` at `c1ad370`):** progressive process board on the then-current root/guide arrangement as of that commit. Production has not been replaced by `workbench-shell`.

**`workbench-shell` branch (preview-validated structurally):**

- Commits on this branch: `9b3c78a` Make portfolio the workbench front door; `d7a4e12` Add persistent portfolio workbench shell; `9a5fa33` Improve portfolio and leadership triage clarity.
- Portfolio is the front door (`/`).
- Full educational/orientation material moved to `/guide`.
- Global destinations: Portfolio / Leadership Brief / Guide.
- Persistent Workbench Shell for Portfolio and initiative routes.
- Desktop uses initiative hierarchy + workspace.
- Narrow widths stack hierarchy above workspace.
- Existing public initiative URLs remain unchanged.
- URL remains authoritative for selected initiative and selected child workspace.
- Initiative child views: Intake / Risk Pre-Check / Program Controls.
- `/initiatives/{id}` remains Program Controls; no new Overview screen was introduced.
- Portfolio triage presentation is stage-aware without changing readiness or gate semantics.
- Leadership Brief unresolved work is consolidated into one Needs attention table.
- Mobile/body horizontal overflow was corrected by local table scrolling.
- Domain model, fixtures, intake completeness, readiness semantics, gate statuses, AI/human authority boundaries, and synthetic-data boundaries remain unchanged.
- No Phase C cleanup was performed.

Supporting validated foundations (unchanged):

- SvelteKit / TypeScript / Node.js baseline
- typed domain model
- five synthetic initiative fixtures
- deterministic stage-aware readiness (`Blocked` | `Clear`)
- deterministic intake completeness
- program-control gate statuses (`Open` | `Satisfied` | `Not Applicable`)
- human/AI authority boundaries
- synthetic data only
- no persistence
- no authentication
- no live AI/API integration
- no workflow mutations

# Preview finding / unresolved UX issue

Exactly one known UX issue:

Initiative-tree expansion is currently coupled to URL selection.

Current behavior:

- only the URL-selected initiative branch is expanded;
- selecting another initiative automatically collapses the previous branch;
- the user cannot independently collapse the selected parent or keep multiple parent branches expanded.

Agreed next correction (not implemented in this recording):

Selection remains URL-derived; expansion becomes ephemeral user-controlled UI state.

Intended behavior:

- initiative name selects/navigates;
- disclosure/chevron expands or collapses without navigation;
- multiple initiative branches may remain expanded;
- selected initiative is expanded by default on initial deep-link load;
- selected branch may subsequently be collapsed manually;
- workspace remains determined by the URL;
- expansion is not persisted;
- refresh reconstructs with the URL-selected initiative expanded.

This is the only currently authorized candidate correction for the next session. Do not implement it until that session is explicitly authorized.

# Stopping-Point Rule

PAUSED — `workbench-shell` preview validated structurally. One initiative-tree disclosure UX correction remains before merge consideration.

- Do not begin Phase C.
- Do not add new features.
- Do not merge to `main` yet.
- Do not modify the production branch.

# Blockers

None.

# Open Questions

None recorded.

# Next Authorized Step

Not yet authorized to implement.

Next action when authorized: correct tree expansion behavior on `workbench-shell`, validate preview, then decide merge to `main`. No additional feature work is authorized.

# Resume From Here

Begin on branch `workbench-shell`. Verify:

```
git status --short
git status -sb
git branch --show-current
git log -5 --oneline
```

Expected branch: `workbench-shell`

Expected branch commits include:

- `9b3c78a` Make portfolio the workbench front door
- `d7a4e12` Add persistent portfolio workbench shell
- `9a5fa33` Improve portfolio and leadership triage clarity

Expected `main` / `origin/main`: `c1ad370` Add validated progressive process board

Re-read:

- `PROJECT_STATE.md`
- `CLAUDE.md`
- `PRODUCT_SPEC.md`

Do not begin Phase C. Do not add new features. Do not merge to `main` yet. Do not modify the production branch.

The only currently authorized candidate correction for the next session is initiative-tree disclosure: URL-derived selection; ephemeral, non-persisted expansion; chevron toggles without navigation. Do not implement it until that session is explicitly authorized.
