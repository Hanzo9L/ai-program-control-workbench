# 1. Product Purpose

AI Program Control & Risk Workbench is a lightweight proof-of-work. It shows how an organization can take an ambiguous AI idea, structure it as an initiative, see dependencies and risk, keep humans accountable for consequential decisions, and tell leadership whether something is actually ready.

The demonstration value is process and judgment: intake quality, visible gates, explicit human approval, and honest readiness communication. It is not a production control system, not a compliance engine, and not a claim of healthcare, legal, or security expertise.

All data in the product is synthetic.

# 2. Non-Goals

This product is not:

- Curana Health software, policy, architecture, or workflow
- a HIPAA, legal, regulatory, privacy, or security compliance determination
- a “HIPAA Compliance Checker”
- a substitute for security, legal, privacy, or clinical review
- a live clinical, claims, or patient-operations system
- an expert-theater portfolio for the product owner as a healthcare compliance expert, security engineer, or deep AI engineer

The application must not state or imply that an initiative is legally, regulatorily, or HIPAA-compliant.

# 3. Primary User

The primary user is an AI program / workforce-enablement program manager (or similar coordinator).

They intake initiatives, keep owners and dependencies visible, route work through review, and prepare leadership-ready status. They coordinate; they do not impersonate legal, security, privacy, or clinical authority.

Secondary viewers: named initiative owners and a leadership audience who need a short readiness picture, not a working queue.

# 4. Core Workflow

1. Program manager (or owner) captures an initiative on **AI Workflow Intake**.
2. Human submits the draft for **Intake Review**.
3. Human confirms or corrects AI-suggested classification and completeness.
4. Initiative moves to **PHI / PII Risk Pre-Check** and program-control review.
5. Humans record gate status. Unmet required gates set **Readiness: Blocked** and prevent progression. They do not change lifecycle state.
6. When required reviews are recorded, a human may advance the initiative to **Ready for Approval**. Clearing blockers does not advance the lifecycle by itself.
7. An accountable human approves launch, or returns the work.
8. Approved work may enter **In Pilot**, then **Complete**.
9. **Portfolio Dashboard** and **Leadership Brief** stay current from the same initiative records.

No step after Draft advances without a recorded human action in the initial product.

# 5. Five-Screen Model

## 5.1 Portfolio Dashboard

- **Purpose:** Working view of the initiative portfolio.
- **Key information:** Each initiative’s name, owner, lifecycle state, readiness (`Blocked` or `Clear`), highest-severity open gate, last update. Counts by lifecycle state. Filter by state and by blocked readiness.
- **User action:** Open an initiative; start a new intake.
- **AI-assisted behavior:** Optional one-line status hint from existing fields (descriptive only).
- **Human decision/approval:** None on this screen.
- **Must not happen automatically:** Lifecycle state changes, gate satisfaction, approval, or hiding of blocked items.

## 5.2 AI Workflow Intake

- **Purpose:** Structure an idea into a reviewable initiative.
- **Key information captured:** Name; problem/outcome; intended users; data involved (synthetic description only); tools/vendors; owner; sponsor; success signal; known constraints.
- **User action:** Save Draft; submit for Intake Review.
- **AI-assisted behavior:** Summarize the intake; flag missing required fields; suggest a preliminary data-sensitivity label and likely applicable gates. Suggestions are labeled as suggestions.
- **Human decision/approval:** Submit for review; accept, edit, or reject suggested classification before it becomes the recorded working classification.
- **Must not happen automatically:** Submit, classification finalization, or skip of missing required fields.

## 5.3 PHI / PII Risk Pre-Check

- **Purpose:** Make data-sensitivity and control implications visible before launch talk.
- **Key information:** Recorded sensitivity label; whether PHI, PII, or neither is *described* in the synthetic intake; applicable gates; missing info; possible risk indicators (e.g., external vendor, persistent storage, outbound messaging).
- **User action:** Confirm/correct labels; mark each applicable gate Open, Satisfied, or Not Applicable; return to intake if information is insufficient. An exception stays `Open`, with a note describing the exception and an accountable owner.
- **AI-assisted behavior:** Flag possible indicators from intake text; list gates that often apply to the suggested classification.
- **Human decision/approval:** Every gate status change; decision that the pre-check is complete enough to leave Risk Review (explicit human advance; readiness must not be `Blocked`).
- **Must not happen automatically:** Declare compliance; mark gates Satisfied or Not Applicable; determine HIPAA/legal status; change lifecycle state when blockers are resolved.

## 5.4 Workflow Detail / Program Controls

- **Purpose:** Single initiative record: lifecycle state, readiness, owners, gates, notes, history of human actions.
- **Key information:** Lifecycle state; readiness (`Blocked` or `Clear`); owner; sponsor; classification; all gates; notes; AI suggestions vs recorded human decisions.
- **User action:** Advance or return lifecycle state when rules allow; add notes; assign owner; open or resolve gates. Resolving blockers does not advance state; the human must explicitly advance afterward.
- **AI-assisted behavior:** Draft a change-summary of what is still open. Do not write the official decision.
- **Human decision/approval:** All lifecycle transitions after Draft save; all gate status changes; approval for launch.
- **Must not happen automatically:** Advance to Ready for Approval, Approved for Launch, In Pilot, or Complete; change lifecycle state when readiness becomes `Clear`; overwrite human notes with AI text.

## 5.5 Leadership Brief

- **Purpose:** Short, honest readiness picture for a non-operator audience.
- **Key information:** Counts by lifecycle state; blocked initiatives (readiness `Blocked`, shown with their current lifecycle state); key unresolved dependencies; owner/action required; launch/readiness summary.
- **User action:** View; copy/export the brief text. No approvals here in the initial product.
- **AI-assisted behavior:** Draft the narrative summary from recorded states, gates, and owners. Human can regenerate or edit before treating it as the brief.
- **Human decision/approval:** Optional “mark brief reviewed” is a viewing acknowledgment, not launch approval.
- **Must not happen automatically:** Treat the draft brief as approved; change initiative state from this screen; claim compliance or launch-readiness beyond recorded gates.

# 6. Core Initiative States

Seven lifecycle states. Blocking is not a lifecycle state.

| Lifecycle state | Meaning |
| --- | --- |
| Draft | Intake exists; not submitted. |
| Intake Review | Submitted; completeness and working classification are being confirmed. |
| Risk Review | Classification recorded; data-sensitivity and program controls are being reviewed. |
| Ready for Approval | Required reviews are recorded; waiting for launch authority. |
| Approved for Launch | Accountable human approved a limited launch/pilot. |
| In Pilot | Approved work is treated as running in a limited pilot. |
| Complete | Pilot or initiative work is closed. |

Happy path: `Draft` → `Intake Review` → `Risk Review` → `Ready for Approval` → `Approved for Launch` → `In Pilot` → `Complete`.

**Readiness** is independent of lifecycle state:

| Readiness | Meaning |
| --- | --- |
| `Blocked` | One or more required program controls/dependencies prevent progression. |
| `Clear` | Required controls/dependencies do not currently prevent progression. |

Example: Lifecycle State: `Risk Review`. Readiness: `Blocked`.

Resolving a blocking condition sets readiness to `Clear` and must **not** change lifecycle state. A human must explicitly advance the initiative afterward.

Allowed returns: any in-progress lifecycle state back to an earlier review state by human action. `Complete` does not auto-reopen.

# 7. Gate / Blocker Model

Gates are **program controls / dependencies**, not compliance verdicts. UI copy must say the gate is a recorded control status, not a legal determination.

Each gate instance on an initiative:

- `key` (stable id)
- `label`
- `status`: `Open` | `Satisfied` | `Not Applicable`
- `owner` (required if `Open`)
- `notes` (required if an exception is being recorded; the gate remains `Open`)

There is no `Waived` status and no organizational waiver authority in the initial product. An exception requiring a decision remains `Open`, may contain a note describing the exception, and must have an accountable owner.

Required gate keys for the initial product:

| Key | Represents |
| --- | --- |
| `security_readiness` | Security review/readiness has been considered and recorded. |
| `storage_tool_approval` | Proposed storage/tools have an recorded approval path. |
| `data_sensitivity_review` | Data-sensitivity review has been recorded. |
| `baa_vendor_review` | Vendor/BAA review recorded where a vendor is in play; otherwise a human may record `Not Applicable`. |
| `human_accountability` | Named accountable owner exists for consequential decisions. |
| `audit_logging_readiness` | Audit/logging expectation has been recorded. |
| `retention_residency_review` | Retention/residency expectation recorded where data is stored or transferred; otherwise a human may record `Not Applicable`. |

Rules:

- `human_accountability` must be `Satisfied` before a human may advance to `Ready for Approval`.
- An initiative has readiness `Blocked` when one or more required program controls/dependencies are `Open` and prevent progression.
- Required `Open` gates prevent a human from advancing from `Risk Review` to `Ready for Approval`. Lifecycle state does not change on a refused advance.
- When those gates become `Satisfied` or `Not Applicable`, readiness becomes `Clear`. Lifecycle state stays where it is until a human explicitly advances it.
- Satisfying a gate or marking it `Not Applicable` records a human actor and timestamp. AI cannot set `Satisfied` or `Not Applicable`.

# 8. AI Assistance Boundaries

**AI may:**

- summarize intake
- suggest a preliminary sensitivity classification
- flag missing required fields
- surface possible risk indicators (vendor, storage, outbound contact, described PHI/PII)
- draft leadership-brief narrative from recorded data

**AI may not:**

- submit intake
- finalize classification
- set gate status
- change initiative state
- approve launch
- declare HIPAA, legal, regulatory, privacy, or security compliance
- hide disagreement between suggestion and recorded human decision

Every AI output is stored as a suggestion distinct from the recorded human decision.

# 9. Human-in-the-Loop Model

Human review is retained where the consequence is organizational, not clerical:

- **Submit intake** — starts a real review path.
- **Accept classification** — drives which gates apply.
- **Gate status** — asserts that a control was considered. Exceptions remain `Open` with owner and note.
- **Advance from Risk Review** — asserts the pre-check is complete enough to discuss launch.
- **Approve for Launch** — consequential authorization.
- **Complete** — closes the record.

These stay human because they create accountability, not because the UI cannot automate a click. AI can prepare; a named person must own the decision.

# 10. Future Automation Candidates

Do not implement now. Candidates only if policy allows, criteria are explicit, tests cover representative and exception cases, reliability thresholds are met, and owners approve.

Automation may reduce clerical friction. It must not take accountable organizational decisions away from humans.

1. **Deterministic submit-blocking** when required intake fields are empty (no model judgment). A human still explicitly submits once required fields are complete. Do not auto-move `Draft` → `Intake Review`.
2. **Suggest `Not Applicable`** on `baa_vendor_review` for human confirmation when deterministic criteria indicate no external vendor is involved. Do not auto-set `Not Applicable`.
3. **Stale-Blocked reminder** when readiness has been `Blocked` beyond a defined age (notification, not lifecycle or readiness change).
4. **Leadership-brief regeneration** when underlying counts/gates change, still requiring human “mark reviewed” before it is the official brief.

Consequential approvals and compliance language remain out of scope for automation.

# 11. Synthetic Example Initiatives

Fictional only. They do not represent a real health system, real patients, or a real implementation.

1. **Internal policy assistant** — Lifecycle: `Draft`. Readiness: `Clear`. Q&A over published internal policy PDFs. No PHI/PII described. Owner not yet named. Exercises incomplete intake (submit blocked by missing required fields, which is not the same as readiness `Blocked`).
2. **Scheduling assistant** — Lifecycle: `Ready for Approval`. Readiness: `Clear`. Helps staff propose meeting times from calendar metadata. Sensitivity recorded as non-PHI. Gates `Satisfied` or `Not Applicable`. Exercises a clean approval queue.
3. **Clinical-note summarization pilot** — Lifecycle: `Risk Review`. Readiness: `Blocked`. Summarizes synthetic clinical notes for a named clinician owner. `data_sensitivity_review` Open; `storage_tool_approval` Open. Exercises high-sensitivity review without a compliance claim.
4. **Claims-document triage pilot** — Lifecycle: `In Pilot`. Readiness: `Clear`. Routes synthetic claims documents to work queues. Vendor recorded; `baa_vendor_review` Satisfied by a named human. Exercises post-approval pilot state.
5. **Patient outreach drafting assistant** — Lifecycle: `Risk Review`. Readiness: `Blocked`. Drafts outreach messages from synthetic contact lists. `retention_residency_review` Open; `human_accountability` Open. Exercises blocker visibility without changing lifecycle state.

# 12. Leadership Brief Content

The brief is a read-model of recorded data:

- Initiative counts by lifecycle state
- Blocked items (readiness `Blocked`), with current lifecycle state and open gates
- Key unresolved dependencies (open gates, grouped)
- Owner / action required (who must do what next)
- Launch/readiness summary: how many are `Ready for Approval` or `Approved for Launch` / `In Pilot`, and what still blocks the rest

The brief must not add facts that are not on the initiative records. It must not say “compliant,” “HIPAA cleared,” or “safe to use with real PHI.”

# 13. Out-of-Scope for Initial Build

- Real PHI/PII
- Real authentication
- Production database
- Vendor APIs
- Live EHR integration
- Production compliance logic
- Automated consequential decisions
- Enterprise IAM/security integrations
- Vercel-specific adapter work beyond the existing `adapter-auto` baseline
- Real model-vendor SDK integration unless a later step explicitly authorizes a mock or stub

Initial data may be in-memory or local static/synthetic fixtures. Persistence design is not part of this specification step.

# 14. Acceptance Criteria for the Initial Product

The MVP is complete when all of the following are demonstrable with synthetic data:

1. User can create an initiative, save `Draft`, and explicitly submit to `Intake Review`. Missing required fields prevent submission; they do not auto-submit when complete.
2. Five screens exist and show the same initiative record consistently, including lifecycle state and independent readiness.
3. All seven lifecycle states can be represented; readiness `Blocked` and `Clear` can be represented independently; at least the five synthetic examples are visible.
4. Gate statuses `Open`, `Satisfied`, and `Not Applicable` can be recorded by a human; AI cannot mark gates `Satisfied` or `Not Applicable`. There is no `Waived` status.
5. An initiative with required `Open` gates has readiness `Blocked` and cannot be advanced to `Ready for Approval`. Refused advance does not change lifecycle state.
6. Resolving blocking conditions sets readiness to `Clear` and does not change lifecycle state. A human must explicitly advance afterward.
7. `Approved for Launch` occurs only via an explicit human action.
8. Leadership Brief shows counts by lifecycle state, blocked items (with current lifecycle state), unresolved dependencies, owner/action, and a summary drawn only from recorded data.
9. UI copy does not claim HIPAA/legal/regulatory/privacy/security compliance.
10. No real PHI/PII, auth, production database, vendor API, or EHR integration is present.
