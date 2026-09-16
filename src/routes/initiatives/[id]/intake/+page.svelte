<script lang="ts">
	import { PRE_RISK_REVIEW_STATES } from '$lib/domain/constants';
	import type { Initiative } from '$lib/domain/types';

	let { data }: { data: { initiative: Initiative } } = $props();

	const initiative = $derived(data.initiative);
	const openGates = $derived(initiative.gates.filter((gate) => gate.status === 'Open'));
	const isPreRiskReview = $derived(
		(PRE_RISK_REVIEW_STATES as readonly string[]).includes(initiative.lifecycleState)
	);

	const intakeSummary = $derived(
		initiative.aiSuggestions.find((suggestion) => suggestion.kind === 'intake_summary')
	);
	const missingInformation = $derived(
		initiative.aiSuggestions.filter((suggestion) => suggestion.kind === 'missing_information')
	);
	const preliminaryClassification = $derived(
		initiative.aiSuggestions.find((suggestion) => suggestion.kind === 'preliminary_classification')
	);

	type IntakeField = {
		label: string;
		complete: boolean;
	};

	const SYNTHETIC_INCOMPLETE_PLACEHOLDER = 'Not yet specified';

	function hasRecordedText(value: string) {
		return value.trim() !== '';
	}

	function hasRecordedName(value: string | null) {
		return value !== null && value.trim() !== '';
	}

	function isRequiredFieldComplete(value: string | null) {
		if (value === null) return false;
		if (value.trim() === '') return false;
		if (value === SYNTHETIC_INCOMPLETE_PLACEHOLDER) return false;
		return true;
	}

	function displayText(value: string) {
		return hasRecordedText(value) ? value : 'Not recorded';
	}

	function named(value: string | null) {
		return hasRecordedName(value) ? value : 'Not named';
	}

	function formatTimestamp(value: string) {
		return value.replace('T', ' ').replace('Z', ' UTC');
	}

	const intakeFields = $derived<IntakeField[]>([
		{ label: 'Initiative name', complete: isRequiredFieldComplete(initiative.name) },
		{ label: 'Problem / outcome', complete: isRequiredFieldComplete(initiative.problemOutcome) },
		{ label: 'Intended users', complete: isRequiredFieldComplete(initiative.intendedUsers) },
		{
			label: 'Synthetic data description',
			complete: isRequiredFieldComplete(initiative.syntheticDataDescription)
		},
		{ label: 'Tools / vendors', complete: isRequiredFieldComplete(initiative.toolsVendors) },
		{ label: 'Owner', complete: isRequiredFieldComplete(initiative.owner) },
		{ label: 'Sponsor', complete: isRequiredFieldComplete(initiative.sponsor) },
		{ label: 'Success signal', complete: isRequiredFieldComplete(initiative.successSignal) }
	]);

	const completeCount = $derived(intakeFields.filter((field) => field.complete).length);
	const incompleteFields = $derived(intakeFields.filter((field) => !field.complete));
	const incompleteCount = $derived(incompleteFields.length);
</script>

<svelte:head>
	<title>AI Workflow Intake — {initiative.name}</title>
</svelte:head>

<div class="initiative-view">
	<header class="header">
		<p class="eyebrow">AI Workflow Intake</p>
		<h1 data-initiative-name>{initiative.name}</h1>
		<p class="meta">
			<span
				class="readiness"
				class:readiness-blocked={initiative.readiness === 'Blocked'}
				class:readiness-clear={initiative.readiness === 'Clear'}
				data-readiness={initiative.readiness}
			>
				{initiative.readiness}
			</span>
			<span data-lifecycle={initiative.lifecycleState}>{initiative.lifecycleState}</span>
		</p>
	</header>

	<section aria-label="Recorded intake fields">
		<dl class="details">
			<div>
				<dt>Initiative name</dt>
				<dd>{displayText(initiative.name)}</dd>
			</div>
			<div>
				<dt>Lifecycle state</dt>
				<dd>{initiative.lifecycleState}</dd>
			</div>
			<div>
				<dt>Readiness</dt>
				<dd>{initiative.readiness}</dd>
			</div>
			<div>
				<dt>Owner</dt>
				<dd data-owner>{named(initiative.owner)}</dd>
			</div>
			<div>
				<dt>Sponsor</dt>
				<dd data-sponsor>{named(initiative.sponsor)}</dd>
			</div>
			<div>
				<dt>Problem / outcome</dt>
				<dd>{displayText(initiative.problemOutcome)}</dd>
			</div>
			<div>
				<dt>Intended users</dt>
				<dd>{displayText(initiative.intendedUsers)}</dd>
			</div>
			<div>
				<dt>Synthetic data description</dt>
				<dd>{displayText(initiative.syntheticDataDescription)}</dd>
			</div>
			<div>
				<dt>Tools / vendors</dt>
				<dd data-tools-vendors>{displayText(initiative.toolsVendors)}</dd>
			</div>
			<div>
				<dt>Success signal</dt>
				<dd data-success-signal>{displayText(initiative.successSignal)}</dd>
			</div>
			<div>
				<dt>Known constraints</dt>
				<dd>{displayText(initiative.knownConstraints)}</dd>
			</div>
			<div>
				<dt>Recorded sensitivity / classification</dt>
				<dd data-recorded-classification>{initiative.classification ?? 'Not recorded'}</dd>
			</div>
			<div>
				<dt>Last updated</dt>
				<dd>{formatTimestamp(initiative.lastUpdated)}</dd>
			</div>
		</dl>
	</section>

	<section class="panel" aria-label="Intake completeness">
		<h2>Intake completeness</h2>
		<p class="section-note">
			This is intake completeness, not readiness. Incomplete intake may prevent submission, but it
			does not by itself make readiness Blocked during Draft or Intake Review.
		</p>
		<p data-complete-count={completeCount}>Complete fields: {completeCount} of {intakeFields.length}</p>
		<p data-incomplete-count={incompleteCount}>Incomplete fields: {incompleteCount}</p>
		{#if incompleteCount === 0}
			<p data-incomplete-fields="none">No incomplete required intake fields recorded.</p>
		{:else}
			<ul data-incomplete-fields="present">
				{#each incompleteFields as field (field.label)}
					<li>{field.label}</li>
				{/each}
			</ul>
		{/if}
	</section>

	<section class="panel" aria-label="AI-assisted intake summary">
		<h2>AI-assisted intake summary</h2>
		<p class="section-note">
			This is a draft suggestion based on recorded intake data. It is not the recorded human
			decision.
		</p>
		<p data-intake-summary>
			{#if intakeSummary}
				{intakeSummary.text}
			{:else}
				No AI-assisted intake summary recorded.
			{/if}
		</p>
	</section>

	<section class="panel" aria-label="AI-assisted missing-information suggestions">
		<h2>AI-assisted missing-information suggestions</h2>
		<p class="section-note">
			Suggestions may help identify incomplete intake information. Human review determines what must
			be completed.
		</p>
		{#if missingInformation.length === 0}
			<p data-missing-information="none">No AI-assisted missing-information suggestions recorded.</p>
		{:else}
			<ul data-missing-information="present">
				{#each missingInformation as suggestion, index (index)}
					<li>{suggestion.text}</li>
				{/each}
			</ul>
		{/if}
	</section>

	<section class="panel" aria-label="Classification boundary">
		<h2>Classification boundary</h2>
		<p class="section-note">
			AI classification is a suggestion only; a human confirms/corrects the working classification;
			neither is a legal/regulatory/HIPAA/privacy/security compliance determination.
		</p>
		<dl class="boundary">
			<div>
				<dt>Recorded human classification</dt>
				<dd data-recorded-classification-copy>{initiative.classification ?? 'Not recorded'}</dd>
			</div>
			<div>
				<dt>AI-assisted preliminary classification suggestion</dt>
				<dd data-preliminary-classification>
					{#if preliminaryClassification}
						{preliminaryClassification.text}
					{:else}
						No preliminary classification suggestion recorded.
					{/if}
				</dd>
			</div>
		</dl>
	</section>

	<section class="readiness-note" aria-label="Readiness explanation">
		{#if isPreRiskReview}
			<p data-pre-risk-explanation>
				Open program-control gates do not by themselves make readiness Blocked at this lifecycle
				stage. Intake completeness is evaluated separately.
			</p>
		{:else if initiative.readiness === 'Blocked'}
			<p>Blocked because these required Open gates currently prevent progression:</p>
			<ul data-blocked-open-gates>
				{#each openGates as gate (gate.key)}
					<li>{gate.label}</li>
				{/each}
			</ul>
		{:else}
			<p data-clear-explanation>
				No required Open gate currently prevents progression.
			</p>
		{/if}
	</section>

	<section class="panel" aria-label="Human submission boundary">
		<h2>Human submission boundary</h2>
		<ul>
			<li>Saving and editing are not implemented in this proof step.</li>
			<li>Submission is an explicit human action.</li>
			<li>Completing required intake fields does not auto-submit.</li>
			<li>AI cannot submit the initiative or advance lifecycle state.</li>
		</ul>
	</section>

	<p class="disclaimer" role="note">
		All data on this page is synthetic. This screen structures intake for program review. It does
		not determine legal, regulatory, HIPAA, privacy, or security compliance.
	</p>
</div>

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

	.eyebrow {
		margin: 0 0 0.35rem;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #5c6570;
	}

	.header h1 {
		margin: 0 0 0.5rem;
		font-size: 1.65rem;
		font-weight: 650;
	}

	.meta {
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		align-items: center;
		color: #4b5563;
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

	.details,
	.panel,
	.readiness-note,
	.disclaimer {
		background: #fff;
		border: 1px solid #d8d5cc;
	}

	.panel,
	.readiness-note,
	.disclaimer {
		padding: 0.85rem 1rem;
		margin: 1.25rem 0 0;
	}

	.details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		margin: 1.25rem 0 0;
	}

	.details div {
		padding: 0.85rem 1rem;
		border-top: 1px solid #e6e3db;
	}

	.details div:first-child,
	.details div:nth-child(2) {
		border-top: 0;
	}

	.boundary {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: 1rem;
		margin: 0;
	}

	dt {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		color: #5c6570;
		margin: 0 0 0.25rem;
	}

	dd {
		margin: 0;
	}

	h2 {
		margin: 0 0 0.5rem;
		font-size: 1.15rem;
	}

	.section-note {
		margin: 0 0 0.75rem;
		color: #4b5563;
		font-size: 0.9rem;
	}

	.panel ul,
	.readiness-note ul {
		margin: 0;
		padding-left: 1.1rem;
	}

	.panel li + li {
		margin-top: 0.35rem;
	}
</style>
