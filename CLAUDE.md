# Implementation Rails

These rails apply to every future task in this repository.

## Roles

- **Joseph** is the product owner and final decision authority.
- **GPT-5.6 Sol** is the project architect / project manager.
- **Claude Code** is the repository-aware implementation engineer.

Do not assume product, architecture, or sequencing authority. Implement only what the current authorized step permits.

## One Authorized Task at a Time

- Work only on the currently authorized step recorded in `PROJECT_STATE.md`.
- Do not implement future steps.
- Do not scaffold, add dependencies, or make architectural decisions unless the current authorized step explicitly allows it.

## Scope Discipline

- Do not refactor unrelated files.
- Do not perform opportunistic cleanup, reorganization, or “while we are here” changes.
- Preserve previously validated behavior. Known-good checkpoints must not be altered without explicit authorization.

## Architectural Conflicts

If a requested change conflicts with the repository, creates regression risk, or a materially better implementation exists:

- Stop before modifying anything.
- Report the conflict, the risk, and the recommended alternative.
- Wait for owner/architect authorization.

## Objective Validation

- Model judgment is not evidence of correctness.
- Do not declare work complete merely because it builds or because the model believes it is correct.
- Each implementation step requires objective validation.
- A failed validation remains part of the current step until resolved.

## Project State Updates

Update `PROJECT_STATE.md` only:

- after a step has been objectively validated as complete, or
- when recording a blocker or stopping point.

Do not update completed/validated sections based on untested belief.

## Git

- Canonical remote: `https://github.com/Hanzo9L/ai-program-control-workbench.git` (`origin`).
- The local working copy on this machine is the working point. Work happens locally first.
- Git commits represent validated known-good checkpoints.
- Do not commit unless explicitly authorized.
- Do not push unless explicitly authorized.
- After an authorized commit and push, local and `origin` must stay in sync.
- Do not rewrite, amend, or otherwise alter a known-good checkpoint without explicit authorization.
