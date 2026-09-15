<script lang="ts">
	import AppNav from '$lib/components/AppNav.svelte';
	import { SYNTHETIC_INITIATIVES } from '$lib/domain/fixtures';
	import type { Initiative } from '$lib/domain/types';

	const initiatives = SYNTHETIC_INITIATIVES;

	function openGates(initiative: Initiative) {
		return initiative.gates.filter((gate) => gate.status === 'Open');
	}

	function ownerLabel(owner: string | null) {
		return owner ?? 'Not named';
	}

	function formatLastUpdated(value: string) {
		return value.replace('T', ' ').replace('Z', ' UTC');
	}

	const totalCount = initiatives.length;
	const blockedCount = initiatives.filter((initiative) => initiative.readiness === 'Blocked').length;
	const readyForApprovalCount = initiatives.filter(
		(initiative) => initiative.lifecycleState === 'Ready for Approval'
	).length;
	const inPilotCount = initiatives.filter((initiative) => initiative.lifecycleState === 'In Pilot')
		.length;
</script>

<svelte:head>
	<title>AI Program Control & Risk Workbench</title>
</svelte:head>

<main class="page">
	<AppNav active="overview" />

	<section class="orientation" aria-label="Demo orientation and data guide">
		<header class="header">
			<p class="eyebrow">Demo orientation &amp; data guide</p>
			<h1>AI Program Control &amp; Risk Workbench</h1>
			<p class="subtitle">
				A lightweight proof-of-work. It shows how emerging AI initiatives can be structured,
				reviewed, and communicated while consequential decisions remain with accountable humans.
			</p>
		</header>

		<section class="panel" aria-label="Introduction">
			<h2>What this is</h2>
			<p>
				This application is a lightweight proof-of-work. It demonstrates how emerging AI
				initiatives can be structured, reviewed, and communicated. Consequential decisions remain
				with accountable humans.
			</p>
			<p>
				This proof-of-work does not claim to know an organization’s answers. It demonstrates a
				practical way to make sure the right questions are surfaced, the right people are
				accountable for answering them, and unresolved dependencies remain visible before work
				moves forward.
			</p>
			<p>
				All application data is synthetic. It does not represent any healthcare organization’s
				systems, policies, architecture, workflows, or compliance requirements. It does not
				determine legal, regulatory, HIPAA, privacy, or security compliance.
			</p>
		</section>

		<section class="panel" aria-label="How to read the data">
			<h2>How to read the data</h2>
			<p>
				<strong>Lifecycle</strong> is where an initiative currently sits in the program process.
			</p>
			<p class="lifecycle-path" data-lifecycle-path>
				Draft → Intake Review → Risk Review → Ready for Approval → Approved for Launch → In Pilot →
				Complete
			</p>
			<p>
				<strong>Readiness</strong> is separate from lifecycle.
			</p>
			<dl class="readiness-defs">
				<div>
					<dt>Clear</dt>
					<dd>
						Nothing at the initiative’s current lifecycle stage is presently preventing progression
						under the demonstrated program-control model.
					</dd>
				</div>
				<div>
					<dt>Blocked</dt>
					<dd>
						At Risk Review or later, one or more required program controls remain Open. Blocked
						does not mean unsafe, noncompliant, failed, or rejected.
					</dd>
				</div>
			</dl>
			<p>
				During Draft and Intake Review, Open controls do not by themselves make readiness Blocked.
				Intake completeness is evaluated separately.
			</p>
		</section>

		<section class="panel" aria-label="Program controls">
			<h2>Program Controls</h2>
			<p>
				These are program-control statuses, not compliance certifications. There is no Waived
				status.
			</p>
			<dl class="control-list">
				<div>
					<dt>Security readiness</dt>
					<dd>Whether the security review/dependency has been addressed.</dd>
				</div>
				<div>
					<dt>Storage / tool approval</dt>
					<dd>Whether the proposed storage/tooling path has been resolved.</dd>
				</div>
				<div>
					<dt>Data sensitivity review</dt>
					<dd>Whether the working data-sensitivity classification has been reviewed.</dd>
				</div>
				<div>
					<dt>BAA / vendor review</dt>
					<dd>
						Where applicable, whether the vendor/business-associate dependency has been addressed.
					</dd>
				</div>
				<div>
					<dt>Human accountability</dt>
					<dd>Whether an accountable human owner is established.</dd>
				</div>
				<div>
					<dt>Audit / logging readiness</dt>
					<dd>Whether expected logging/traceability needs have been addressed.</dd>
				</div>
				<div>
					<dt>Retention / residency review</dt>
					<dd>Whether applicable storage-duration/location questions have been addressed.</dd>
				</div>
			</dl>
			<h3>Control statuses</h3>
			<dl class="status-list">
				<div>
					<dt>Open</dt>
					<dd>Unresolved.</dd>
				</div>
				<div>
					<dt>Satisfied</dt>
					<dd>Recorded as addressed by a human.</dd>
				</div>
				<div>
					<dt>Not Applicable</dt>
					<dd>A human recorded that the control does not apply to the synthetic initiative.</dd>
				</div>
			</dl>
		</section>

		<section class="panel" aria-label="AI assistance and human authority">
			<h2>AI assistance vs human authority</h2>
			<p>
				Existing AI content on these screens is fixture-based and read-only. AI is not executing
				live in this deployed proof-of-work.
			</p>
			<div class="authority-grid">
				<div class="authority-card">
					<h3>AI assists with</h3>
					<ul data-ai-assists>
						<li>intake summaries</li>
						<li>preliminary classification suggestions</li>
						<li>missing-information prompts</li>
						<li>possible risk indicators</li>
						<li>draft leadership language</li>
					</ul>
				</div>
				<div class="authority-card authority-human">
					<h3>Humans retain authority over</h3>
					<ul data-human-authority>
						<li>recorded working classification</li>
						<li>program-control status</li>
						<li>initiative progression</li>
						<li>launch approval</li>
						<li>consequential decisions</li>
					</ul>
				</div>
			</div>
			<p class="principle">
				AI can suggest. Deterministic rules can enforce defined checks. Humans remain accountable
				for decisions.
			</p>
		</section>

		<section class="panel" aria-label="Follow the process">
			<h2>Follow the process</h2>
			<p>
				These synthetic initiatives are representative snapshots of different points in the
				process, not one initiative moving through time. Follow them to see what the system can
				determine, where AI can assist, where a human decision is required, and what would happen
				next.
			</p>
			<ol class="process-stages">
				<li class="process-card">
					<p class="process-stage">Stage 1 — Draft / Intake</p>
					<p class="process-example">
						Representative example:
						<a href="/initiatives/syn-internal-policy-assistant/intake">Internal policy assistant</a>
					</p>
					<p class="process-state">
						Lifecycle: Draft · Readiness: Clear · Intake completeness: 4 of 8
					</p>
					<dl>
						<div>
							<dt>What this represents</dt>
							<dd>An emerging AI idea is being structured into a reviewable initiative.</dd>
						</div>
						<div>
							<dt>System / deterministic</dt>
							<dd>
								The intake completeness rule identifies four required fields as incomplete.
							</dd>
						</div>
						<div>
							<dt>AI assistance</dt>
							<dd>
								Existing fixture-based AI suggestions can summarize the intake, suggest
								preliminary classification, and surface possible missing information.
							</dd>
						</div>
						<div>
							<dt>Human checkpoint</dt>
							<dd>
								A human completes/validates the required intake information and explicitly
								decides when to submit the initiative for Intake Review.
							</dd>
						</div>
						<div>
							<dt>What happens next</dt>
							<dd>
								Completing all required fields may make the initiative eligible for submission,
								but it does not auto-submit or change lifecycle.
							</dd>
						</div>
					</dl>
					<p class="process-follow">
						<a href="/initiatives/syn-internal-policy-assistant/intake">Follow this step →</a>
					</p>
				</li>
				<li class="process-card">
					<p class="process-stage">Stage 2 — Risk Review / unresolved controls</p>
					<p class="process-example">
						Representative example:
						<a href="/initiatives/syn-clinical-note-summarization"
							>Clinical-note summarization pilot</a
						>
					</p>
					<p class="process-state">
						Lifecycle: Risk Review · Readiness: Blocked · Open controls: Storage / tool approval;
						Data sensitivity review
					</p>
					<dl>
						<div>
							<dt>What this represents</dt>
							<dd>
								The initiative has reached a stage where unresolved required program controls
								prevent progression.
							</dd>
						</div>
						<div>
							<dt>System / deterministic</dt>
							<dd>
								At Risk Review or later, required Open controls result in Blocked readiness.
							</dd>
						</div>
						<div>
							<dt>AI assistance</dt>
							<dd>
								Existing fixture-based AI content may surface possible sensitivity/risk
								indicators and preliminary classification suggestions for human review.
							</dd>
						</div>
						<div>
							<dt>Human checkpoint</dt>
							<dd>
								Appropriate human owners/reviewers resolve the organizational dependencies and
								record the resulting control statuses. AI cannot satisfy a control.
							</dd>
						</div>
						<div>
							<dt>What happens next</dt>
							<dd>
								When no required applicable controls remain Open, readiness becomes Clear.
								Lifecycle still does not advance automatically.
							</dd>
						</div>
					</dl>
					<p class="process-follow">
						<a href="/initiatives/syn-clinical-note-summarization">Follow this step →</a>
					</p>
					<p class="process-support">
						Supporting context:
						<a href="/initiatives/syn-clinical-note-summarization/risk-precheck"
							>PHI / PII Risk Pre-Check</a
						>
					</p>
				</li>
				<li class="process-card">
					<p class="process-stage">Stage 3 — Ready for Approval</p>
					<p class="process-example">
						Representative example:
						<a href="/initiatives/syn-scheduling-assistant">Scheduling assistant</a>
					</p>
					<p class="process-state">
						Lifecycle: Ready for Approval · Readiness: Clear · no required Open controls
					</p>
					<dl>
						<div>
							<dt>What this represents</dt>
							<dd>
								Required program controls are resolved for the demonstrated model and the
								initiative is waiting for an accountable approval decision.
							</dd>
						</div>
						<div>
							<dt>System / deterministic</dt>
							<dd>
								The system can determine that no required Open controls currently prevent
								progression. It cannot determine that launch is approved.
							</dd>
						</div>
						<div>
							<dt>AI assistance</dt>
							<dd>
								Existing fixture-based AI content may summarize recorded information or draft
								leadership language.
							</dd>
						</div>
						<div>
							<dt>Human checkpoint</dt>
							<dd>An accountable human makes the launch/progression decision.</dd>
						</div>
						<div>
							<dt>What happens next</dt>
							<dd>
								A human approval could move the initiative to Approved for Launch. No automatic
								approval occurs.
							</dd>
						</div>
					</dl>
					<p class="process-follow">
						<a href="/initiatives/syn-scheduling-assistant">Follow this step →</a>
					</p>
				</li>
				<li class="process-card">
					<p class="process-stage">Stage 4 — In Pilot</p>
					<p class="process-example">
						Representative example:
						<a href="/initiatives/syn-claims-document-triage">Claims-document triage pilot</a>
					</p>
					<p class="process-state">Lifecycle: In Pilot · Readiness: Clear</p>
					<dl>
						<div>
							<dt>What this represents</dt>
							<dd>
								A synthetic initiative has passed earlier decision points and is represented in a
								controlled pilot stage.
							</dd>
						</div>
						<div>
							<dt>System / deterministic</dt>
							<dd>
								The application records lifecycle/readiness and the existing control record. This
								proof-of-work does not invent operational pilot metrics.
							</dd>
						</div>
						<div>
							<dt>AI assistance</dt>
							<dd>
								Existing fixture-based AI content may support summaries/drafts only as already
								recorded. This is not live operational AI monitoring.
							</dd>
						</div>
						<div>
							<dt>Human checkpoint</dt>
							<dd>
								Humans remain accountable for pilot oversight, consequential decisions, and
								eventual lifecycle closure.
							</dd>
						</div>
						<div>
							<dt>What happens next</dt>
							<dd>
								In a real program, pilot evidence would inform the accountable decision about
								continuation, change, rollout, or closure. Those capabilities are not implemented
								in this proof-of-work.
							</dd>
						</div>
					</dl>
					<p class="process-follow">
						<a href="/initiatives/syn-claims-document-triage">Follow this step →</a>
					</p>
				</li>
			</ol>
			<p class="principle">
				System determines what can be determined. AI assists where judgment-support is useful.
				Humans make accountable decisions.
			</p>
		</section>

		<section class="panel" aria-label="Explore the demonstration">
			<h2>Explore the demonstration</h2>
			<ul class="explore-list">
				<li>
					<a href="#portfolio-dashboard">Portfolio Dashboard</a>
					<p>
						See the full synthetic initiative portfolio, lifecycle states, readiness, and
						unresolved controls.
					</p>
				</li>
				<li>
					<a href="/initiatives/syn-internal-policy-assistant/intake">AI Workflow Intake</a>
					<p>
						See how an incomplete Draft is structured and how deterministic completeness remains
						separate from AI suggestions and readiness.
					</p>
				</li>
				<li>
					<a href="/initiatives/syn-clinical-note-summarization/risk-precheck"
						>PHI / PII Risk Pre-Check</a
					>
					<p>
						See possible data-sensitivity indicators surfaced for human review without a
						compliance determination.
					</p>
				</li>
				<li>
					<a href="/initiatives/syn-clinical-note-summarization"
						>Workflow Detail / Program Controls</a
					>
					<p>
						See owners, dependencies, recorded control decisions, readiness, and existing
						AI-assisted suggestions for one initiative.
					</p>
				</li>
				<li>
					<a href="/leadership-brief">Leadership Brief</a>
					<p>
						See recorded portfolio data rolled up for leadership visibility without AI-generated
						recommendations or approvals.
					</p>
				</li>
			</ul>
			<div class="start-callout">
				<p class="start-label">Not sure where to start?</p>
				<p>
					The
					<a href="/initiatives/syn-clinical-note-summarization"
						>Clinical-note summarization pilot</a
					>
					is a clear walkthrough of Risk Review, Blocked readiness, Open program controls,
					recorded human decisions, and AI-assisted possible indicators. It is a synthetic example,
					not a real clinical implementation.
				</p>
			</div>
		</section>

		<p class="transparency" data-development-transparency>
			Built with SvelteKit, TypeScript, Node.js, and synthetic data. Development was assisted by AI
			coding tools under a stepwise validation, human-review, and version-control process.
		</p>
	</section>

	<section id="portfolio-dashboard" class="dashboard" aria-label="Portfolio Dashboard">
		<header class="header">
			<h2>Portfolio Dashboard</h2>
			<p class="subtitle">
				Lightweight proof-of-work for structuring AI initiatives, showing dependencies, and
				recording readiness. Humans retain authority over consequential decisions.
			</p>
		</header>

		<section class="summary" aria-label="Portfolio summary">
			<div class="stat">
				<p class="stat-label">Total initiatives</p>
				<p class="stat-value" data-count="total">{totalCount}</p>
			</div>
			<div class="stat">
				<p class="stat-label">Currently blocked</p>
				<p class="stat-value" data-count="blocked">{blockedCount}</p>
			</div>
			<div class="stat">
				<p class="stat-label">Ready for approval</p>
				<p class="stat-value" data-count="ready-for-approval">{readyForApprovalCount}</p>
			</div>
			<div class="stat">
				<p class="stat-label">In pilot</p>
				<p class="stat-value" data-count="in-pilot">{inPilotCount}</p>
			</div>
		</section>

		<section aria-label="Initiative list">
			<table>
				<caption>Synthetic initiative portfolio</caption>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Owner</th>
						<th scope="col">Lifecycle</th>
						<th scope="col">Readiness</th>
						<th scope="col">Open gates</th>
						<th scope="col">Last updated</th>
					</tr>
				</thead>
				<tbody>
					{#each initiatives as initiative (initiative.id)}
						{@const open = openGates(initiative)}
						<tr
							data-initiative-id={initiative.id}
							class:blocked={initiative.readiness === 'Blocked'}
						>
							<th scope="row">
								<a href="/initiatives/{initiative.id}">{initiative.name}</a>
							</th>
							<td>{ownerLabel(initiative.owner)}</td>
							<td>{initiative.lifecycleState}</td>
							<td>
								<span
									class="readiness"
									class:readiness-blocked={initiative.readiness === 'Blocked'}
									class:readiness-clear={initiative.readiness === 'Clear'}
								>
									{initiative.readiness}
								</span>
							</td>
							<td>
								<span data-open-count={open.length}>{open.length}</span>
								{#if open.length > 0}
									<ul class="gate-list">
										{#each open as gate (gate.key)}
											<li>{gate.label}</li>
										{/each}
									</ul>
								{/if}
							</td>
							<td class="timestamp">{formatLastUpdated(initiative.lastUpdated)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</section>

		<p class="disclaimer" role="note">
			All data on this page is synthetic. This application does not determine legal, regulatory,
			HIPAA, privacy, or security compliance.
		</p>
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		background: #f3f2ee;
		color: #243040;
		font-family:
			'Segoe UI',
			system-ui,
			sans-serif;
		line-height: 1.45;
	}

	.page {
		max-width: 68rem;
		margin: 0 auto;
		padding: 2rem 1.25rem 3rem;
	}

	.orientation a,
	th a {
		color: #1f4e46;
	}

	.header h1,
	.header h2 {
		margin: 0 0 0.5rem;
		font-weight: 650;
	}

	.header h1 {
		font-size: 1.65rem;
	}

	.header h2 {
		font-size: 1.35rem;
	}

	.eyebrow {
		margin: 0 0 0.35rem;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #5c6570;
	}

	.subtitle {
		margin: 0;
		max-width: 42rem;
		color: #4b5563;
	}

	.orientation {
		margin: 0 0 2.25rem;
	}

	.panel,
	.transparency,
	.disclaimer,
	.start-callout {
		background: #fff;
		border: 1px solid #d8d5cc;
	}

	.panel,
	.transparency {
		padding: 0.85rem 1rem;
		margin: 1rem 0 0;
	}

	.panel h2,
	.panel h3 {
		margin: 0 0 0.5rem;
	}

	.panel h2 {
		font-size: 1.15rem;
	}

	.panel h3 {
		margin-top: 0.85rem;
		font-size: 0.95rem;
	}

	.panel p {
		margin: 0 0 0.75rem;
	}

	.panel p:last-child {
		margin-bottom: 0;
	}

	.lifecycle-path {
		padding: 0.55rem 0.7rem;
		background: #f7f6f3;
		border: 1px solid #e6e3db;
		font-size: 0.95rem;
	}

	.readiness-defs,
	.control-list,
	.status-list {
		margin: 0 0 0.75rem;
	}

	.readiness-defs div,
	.control-list div,
	.status-list div {
		margin: 0 0 0.65rem;
	}

	.readiness-defs div:last-child,
	.control-list div:last-child,
	.status-list div:last-child {
		margin-bottom: 0;
	}

	dt {
		font-weight: 650;
		margin: 0 0 0.15rem;
	}

	dd {
		margin: 0;
		color: #4b5563;
	}

	.authority-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: 0.75rem;
		margin: 0 0 0.75rem;
	}

	.authority-card {
		padding: 0.75rem 0.85rem;
		background: #f7f6f3;
		border: 1px solid #e6e3db;
	}

	.authority-human {
		background: #eef3f1;
		border-color: #d5e0dc;
	}

	.authority-card h3 {
		margin: 0 0 0.45rem;
	}

	.authority-card ul,
	.explore-list {
		margin: 0;
		padding-left: 1.1rem;
	}

	.principle {
		margin: 0;
		color: #4b5563;
	}

	.process-stages {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15.5rem, 1fr));
		gap: 0.75rem;
		margin: 0.85rem 0 0.75rem;
		padding: 0;
		list-style: none;
		counter-reset: none;
	}

	.process-card {
		padding: 0.75rem 0.85rem;
		background: #f7f6f3;
		border: 1px solid #e6e3db;
	}

	.process-stage {
		margin: 0 0 0.35rem;
		font-weight: 650;
		font-size: 0.95rem;
	}

	.process-example,
	.process-state,
	.process-follow,
	.process-support {
		margin: 0 0 0.55rem;
		font-size: 0.9rem;
	}

	.process-state,
	.process-support {
		color: #4b5563;
	}

	.process-card dl {
		margin: 0 0 0.55rem;
	}

	.process-card dl div {
		margin: 0 0 0.5rem;
	}

	.process-card dl div:last-child {
		margin-bottom: 0;
	}

	.process-follow {
		margin: 0;
	}

	.process-support {
		margin: 0.4rem 0 0;
		font-size: 0.85rem;
	}

	.explore-list li + li {
		margin-top: 0.75rem;
	}

	.explore-list p {
		margin: 0.2rem 0 0;
		color: #4b5563;
	}

	.start-callout {
		margin: 1rem 0 0;
		padding: 0.75rem 0.85rem;
	}

	.start-label {
		margin: 0 0 0.35rem;
		font-weight: 650;
	}

	.transparency {
		color: #4b5563;
		font-size: 0.9rem;
	}

	.dashboard {
		scroll-margin-top: 1rem;
	}

	.summary {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 0.75rem;
		margin: 1.75rem 0 1.5rem;
	}

	.stat {
		background: #fff;
		border: 1px solid #d8d5cc;
		border-radius: 0.4rem;
		padding: 0.85rem 1rem;
	}

	.stat-label {
		margin: 0;
		font-size: 0.8rem;
		color: #5c6570;
	}

	.stat-value {
		margin: 0.2rem 0 0;
		font-size: 1.5rem;
		font-weight: 650;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background: #fff;
		border: 1px solid #d8d5cc;
	}

	caption {
		text-align: left;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	th,
	td {
		text-align: left;
		vertical-align: top;
		padding: 0.75rem 0.8rem;
		border-top: 1px solid #e6e3db;
		font-size: 0.95rem;
	}

	thead th {
		background: #eceae4;
		border-top: 0;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		color: #4b5563;
	}

	tr.blocked {
		background: #f7f1e8;
	}

	.readiness {
		display: inline-block;
		padding: 0.1rem 0.45rem;
		border-radius: 0.25rem;
		font-size: 0.85rem;
		font-weight: 600;
	}

	.readiness-blocked {
		background: #efe0c8;
		color: #5a3f16;
	}

	.readiness-clear {
		background: #e4ebe8;
		color: #2f4a43;
	}

	.gate-list {
		margin: 0.35rem 0 0;
		padding-left: 1.1rem;
		color: #4b5563;
		font-size: 0.85rem;
	}

	.timestamp {
		white-space: nowrap;
		color: #4b5563;
		font-size: 0.85rem;
	}

	.disclaimer {
		margin: 1.5rem 0 0;
		padding: 0.85rem 1rem;
		color: #4b5563;
		font-size: 0.9rem;
	}
</style>
