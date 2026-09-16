<script lang="ts">
	import { tick } from 'svelte';
	import AppNav from '$lib/components/AppNav.svelte';

	type ProcessStageId = 1 | 2 | 3 | 4;
	type ProcessStageState = 'current' | 'explored' | 'future';

	type ProcessStage = {
		id: ProcessStageId;
		name: string;
		exampleName: string;
		exampleHref: string;
		recordedState: string;
		openControls?: string[];
		systemAi: string;
		humanCheckpoint: string;
		whatHappensNext: string;
		exploreHref: string;
		supportHref?: string;
		supportLabel?: string;
		continueLabel?: string;
		nextId?: ProcessStageId;
	};

	const processStages: ProcessStage[] = [
		{
			id: 1,
			name: 'Draft / Intake',
			exampleName: 'Internal policy assistant',
			exampleHref: '/initiatives/syn-internal-policy-assistant/intake',
			recordedState: 'Draft · Clear · 4 of 8 required intake fields complete',
			systemAi:
				'Deterministic completeness identifies four required fields as incomplete. Existing fixture-based AI may summarize the intake and suggest possible missing information or preliminary classification.',
			humanCheckpoint:
				'A human validates/completes the required intake information and decides when the initiative is ready to submit.',
			whatHappensNext:
				'Completing intake may make submission possible. It does not auto-submit or change lifecycle.',
			exploreHref: '/initiatives/syn-internal-policy-assistant/intake',
			continueLabel: 'Continue → Risk Review',
			nextId: 2
		},
		{
			id: 2,
			name: 'Risk Review',
			exampleName: 'Clinical-note summarization pilot',
			exampleHref: '/initiatives/syn-clinical-note-summarization',
			recordedState: 'Risk Review · Blocked · 2 required controls Open',
			openControls: ['Storage / tool approval', 'Data sensitivity review'],
			systemAi:
				'At Risk Review or later, required Open controls produce Blocked readiness. Existing fixture-based AI may surface possible sensitivity/risk indicators for human review.',
			humanCheckpoint:
				'Accountable reviewers resolve and record the required control decisions. AI cannot satisfy or close a control.',
			whatHappensNext:
				'When no required applicable controls remain Open, readiness becomes Clear. Lifecycle still does not advance automatically.',
			exploreHref: '/initiatives/syn-clinical-note-summarization',
			supportHref: '/initiatives/syn-clinical-note-summarization/risk-precheck',
			supportLabel: 'Risk Pre-Check',
			continueLabel: 'Continue → Ready for Approval',
			nextId: 3
		},
		{
			id: 3,
			name: 'Ready for Approval',
			exampleName: 'Scheduling assistant',
			exampleHref: '/initiatives/syn-scheduling-assistant',
			recordedState: 'Ready for Approval · Clear · no required Open controls',
			systemAi:
				'The system can determine that no required Open controls currently prevent progression. Existing fixture-based AI may summarize recorded information or draft leadership language.',
			humanCheckpoint: 'An accountable human makes the launch/progression decision.',
			whatHappensNext:
				'Clear does not mean approved. A human approval could move the initiative to Approved for Launch. No automatic approval occurs.',
			exploreHref: '/initiatives/syn-scheduling-assistant',
			continueLabel: 'Continue → In Pilot',
			nextId: 4
		},
		{
			id: 4,
			name: 'In Pilot',
			exampleName: 'Claims-document triage pilot',
			exampleHref: '/initiatives/syn-claims-document-triage',
			recordedState: 'In Pilot · Clear',
			systemAi:
				'The application records lifecycle, readiness, and existing controls. Existing fixture-based AI may support summaries/drafts only. This is not live operational monitoring.',
			humanCheckpoint:
				'Humans remain accountable for pilot oversight, consequential decisions, and eventual lifecycle closure.',
			whatHappensNext:
				'In a real program, pilot evidence would inform an accountable decision about continuation, change, rollout, or closure. Those capabilities are not implemented in this proof-of-work.',
			exploreHref: '/initiatives/syn-claims-document-triage'
		}
	];

	let selectedStageId = $state<ProcessStageId>(1);
	let revealedThrough = $state<ProcessStageId>(1);
	let emphasizedConnectorAfter = $state<ProcessStageId | null>(null);
	let detailJustAdvanced = $state(false);
	let detailHeadingEl = $state<HTMLHeadingElement | null>(null);
	let connectorTimer: ReturnType<typeof setTimeout> | undefined;
	let advanceTimer: ReturnType<typeof setTimeout> | undefined;

	function processStageState(id: ProcessStageId): ProcessStageState {
		if (id === selectedStageId) return 'current';
		if (id <= revealedThrough) return 'explored';
		return 'future';
	}

	function isStageRevealed(id: ProcessStageId) {
		return id <= revealedThrough;
	}

	function prefersReducedMotion() {
		return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	function selectProcessStage(id: ProcessStageId) {
		if (!isStageRevealed(id)) return;
		selectedStageId = id;
		detailJustAdvanced = false;
	}

	async function continueProcess() {
		const current = processStages[selectedStageId - 1];
		if (!current.nextId) return;

		const fromId = current.id;
		const nextId = current.nextId;
		if (nextId > revealedThrough) {
			revealedThrough = nextId;
		}
		selectedStageId = nextId;

		if (prefersReducedMotion()) {
			emphasizedConnectorAfter = null;
			detailJustAdvanced = false;
		} else {
			emphasizedConnectorAfter = fromId;
			detailJustAdvanced = true;
			clearTimeout(connectorTimer);
			clearTimeout(advanceTimer);
			connectorTimer = setTimeout(() => {
				emphasizedConnectorAfter = null;
			}, 260);
			advanceTimer = setTimeout(() => {
				detailJustAdvanced = false;
			}, 260);
		}

		await tick();
		detailHeadingEl?.focus();
	}
</script>

<svelte:head>
	<title>Guide — AI Program Control & Risk Workbench</title>
</svelte:head>

<main class="page">
	<AppNav active="guide" />

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
			<p data-process-boundary>
				These synthetic initiatives are representative snapshots of different points in the
				process, not one initiative moving through time. The board represents the process, while
				different synthetic initiatives demonstrate representative states within it.
			</p>
			<div class="process-board" data-process-board>
				<ol class="process-rail" data-process-rail>
					{#each processStages as stage (stage.id)}
						{@const state = processStageState(stage.id)}
						<li
							class="process-rail-item"
							data-process-stage={stage.id}
							data-process-state={state}
						>
							{#if isStageRevealed(stage.id)}
								<button
									type="button"
									class="rail-stage"
									class:rail-stage-current={state === 'current'}
									class:rail-stage-explored={state === 'explored'}
									aria-current={state === 'current' ? 'step' : undefined}
									onclick={() => selectProcessStage(stage.id)}
								>
									<span class="rail-number">{stage.id}</span>
									<span class="rail-name">{stage.name}</span>
									{#if state === 'explored'}
										<span class="rail-check" aria-hidden="true">✓</span>
									{/if}
									<span class="visually-hidden">
										{state === 'current' ? 'Current stage' : 'Explored'}
									</span>
								</button>
							{:else}
								<div class="rail-stage rail-stage-future">
									<span class="rail-number">{stage.id}</span>
									<span class="rail-name">{stage.name}</span>
									<span class="visually-hidden">Upcoming</span>
								</div>
							{/if}
							{#if stage.id < 4}
								<span
									class="rail-connector"
									class:rail-connector-emphasis={emphasizedConnectorAfter === stage.id}
									aria-hidden="true"
								>
									<span class="rail-arrow-h">→</span>
									<span class="rail-arrow-v">↓</span>
								</span>
							{/if}
						</li>
					{/each}
				</ol>

				{#each processStages as stage (stage.id)}
					{#if stage.id === selectedStageId}
						<section
							class="process-detail"
							class:is-advancing={detailJustAdvanced}
							data-process-detail={stage.id}
							aria-labelledby="process-detail-heading"
						>
							<h3 id="process-detail-heading" tabindex="-1" bind:this={detailHeadingEl}>
								<span class="detail-number">{stage.id}</span>
								{stage.name}
							</h3>
							<p class="process-example">
								Representative example:
								<a href={stage.exampleHref}>{stage.exampleName}</a>
							</p>
							<dl>
								<div>
									<dt>Recorded state</dt>
									<dd>{stage.recordedState}</dd>
									{#if stage.openControls}
										<ul class="process-open-controls">
											{#each stage.openControls as control (control)}
												<li>{control}</li>
											{/each}
										</ul>
									{/if}
								</div>
								<div>
									<dt>System + AI</dt>
									<dd>{stage.systemAi}</dd>
								</div>
								<div>
									<dt>Human checkpoint</dt>
									<dd>{stage.humanCheckpoint}</dd>
								</div>
								<div>
									<dt>What happens next</dt>
									<dd>{stage.whatHappensNext}</dd>
								</div>
							</dl>
							<div class="process-actions">
								<a class="process-explore" data-process-explore href={stage.exploreHref}
									>Explore this stage →</a
								>
								{#if stage.continueLabel}
									<button
										type="button"
										class="process-continue"
										data-process-continue={stage.nextId}
										onclick={continueProcess}
									>
										{stage.continueLabel}
									</button>
								{/if}
							</div>
							{#if stage.supportHref}
								<p class="process-support">
									Supporting context:
									<a href={stage.supportHref}>{stage.supportLabel}</a>
								</p>
							{/if}
							{#if stage.id === 4}
								<p class="process-complete" data-process-complete>
									You have followed the demonstrated process.
								</p>
							{/if}
						</section>
					{/if}
				{/each}
			</div>
			<p class="principle" data-process-principle>
				System determines what can be determined. AI assists where judgment-support is useful.
				Humans make accountable decisions.
			</p>
		</section>

		<section class="panel" aria-label="Explore the demonstration">
			<h2>Explore the demonstration</h2>
			<ul class="explore-list">
				<li>
					<a href="/#portfolio-dashboard">Portfolio Dashboard</a>
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

	.orientation a {
		color: #1f4e46;
	}

	.header h1 {
		margin: 0 0 0.5rem;
		font-weight: 650;
		font-size: 1.65rem;
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
		margin: 0;
	}

	.panel,
	.transparency,
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

	.process-board {
		margin: 0.85rem 0 0.75rem;
		max-width: 100%;
	}

	.process-rail {
		display: flex;
		align-items: stretch;
		margin: 0 0 0.85rem;
		padding: 0;
		list-style: none;
	}

	.process-rail-item {
		display: flex;
		align-items: center;
		min-width: 0;
		flex: 1 1 0;
	}

	.process-rail-item:last-child {
		flex: 0 1 auto;
	}

	.rail-stage {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.2rem;
		min-width: 0;
		padding: 0.55rem 0.7rem;
		border: 1px solid #d8d5cc;
		background: #f7f6f3;
		color: inherit;
		font: inherit;
		text-align: left;
	}

	button.rail-stage {
		cursor: pointer;
	}

	.rail-stage-current {
		background: #eef3f1;
		border-color: #1f4e46;
		box-shadow: inset 0 0 0 1px #1f4e46;
	}

	.rail-stage-explored {
		background: #fff;
		border-color: #cfcbc1;
		color: #3a4450;
	}

	.rail-stage-future {
		background: transparent;
		border-style: dashed;
		color: #6b7280;
	}

	.rail-number {
		font-size: 1.4rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		line-height: 1;
	}

	.rail-name {
		font-size: 0.82rem;
		font-weight: 650;
		letter-spacing: 0.015em;
		line-height: 1.25;
		overflow-wrap: break-word;
	}

	.rail-stage-current .rail-name {
		font-size: 0.88rem;
	}

	.rail-check {
		position: absolute;
		top: 0.4rem;
		right: 0.45rem;
		font-size: 0.8rem;
		font-weight: 650;
		color: #5c6570;
	}

	.rail-connector {
		flex: 1 1 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 0.7rem;
		padding: 0 0.2rem;
		color: #9aa0a6;
		font-size: 1.05rem;
		transition:
			color 220ms ease,
			font-weight 220ms ease,
			transform 220ms ease;
	}

	.rail-connector-emphasis {
		color: #1f4e46;
		font-weight: 700;
		transform: translateX(2px);
	}

	.rail-arrow-v {
		display: none;
	}

	.process-detail {
		padding: 0.85rem 0.95rem;
		background: #f7f6f3;
		border: 1px solid #e6e3db;
	}

	.process-detail.is-advancing {
		animation: process-detail-in 220ms ease;
	}

	@keyframes process-detail-in {
		from {
			opacity: 0.4;
		}
		to {
			opacity: 1;
		}
	}

	.process-detail h3 {
		display: flex;
		align-items: baseline;
		gap: 0.45rem;
		margin: 0 0 0.45rem;
		font-size: 1.15rem;
		letter-spacing: 0.01em;
	}

	.process-detail h3:focus,
	.process-detail h3:focus-visible {
		outline: none;
	}

	.detail-number {
		font-size: 1.45rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		line-height: 1;
	}

	.process-example,
	.process-support,
	.process-complete {
		margin: 0 0 0.55rem;
		font-size: 0.9rem;
	}

	.process-support,
	.process-complete {
		color: #4b5563;
	}

	.process-detail dl {
		margin: 0 0 0.7rem;
	}

	.process-detail dl div {
		margin: 0 0 0.55rem;
	}

	.process-detail dl div:last-child {
		margin-bottom: 0;
	}

	.process-open-controls {
		margin: 0.3rem 0 0;
		padding-left: 1.1rem;
		color: #4b5563;
		font-size: 0.9rem;
	}

	.process-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.65rem 1rem;
	}

	.process-explore {
		font-weight: 650;
	}

	.process-continue {
		padding: 0.35rem 0.7rem;
		border: 1px solid #1f4e46;
		background: #1f4e46;
		color: #f7f6f3;
		font: inherit;
		font-size: 0.9rem;
		font-weight: 650;
		cursor: pointer;
	}

	.process-support {
		margin: 0.55rem 0 0;
		font-size: 0.85rem;
	}

	.process-complete {
		margin: 0.7rem 0 0;
		font-size: 0.9rem;
	}

	.rail-stage:focus-visible,
	.process-continue:focus-visible {
		outline: 2px solid #1f4e46;
		outline-offset: 2px;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: 48rem) {
		.process-rail {
			flex-direction: column;
			align-items: stretch;
		}

		.process-rail-item {
			flex-direction: column;
			align-items: stretch;
			flex: none;
		}

		.rail-stage {
			width: 100%;
		}

		.rail-connector {
			min-height: 1.05rem;
			padding: 0.1rem 0;
		}

		.rail-connector-emphasis {
			transform: translateY(2px);
		}

		.rail-arrow-h {
			display: none;
		}

		.rail-arrow-v {
			display: inline;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.rail-connector {
			transition: none;
		}

		.rail-connector-emphasis {
			transform: none;
		}

		.process-detail.is-advancing {
			animation: none;
		}
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
</style>
