<script lang="ts">
	import AppNav from '$lib/components/AppNav.svelte';
	import { PRE_RISK_REVIEW_STATES } from '$lib/domain/constants';
	import type { Initiative } from '$lib/domain/types';

	let { data }: { data: { initiative: Initiative } } = $props();

	const initiative = $derived(data.initiative);
	const openGates = $derived(initiative.gates.filter((gate) => gate.status === 'Open'));
	const isPreRiskReview = $derived(
		(PRE_RISK_REVIEW_STATES as readonly string[]).includes(initiative.lifecycleState)
	);
	const preliminaryClassification = $derived(
		initiative.aiSuggestions.find((suggestion) => suggestion.kind === 'preliminary_classification')
	);
	const riskIndicators = $derived(
		initiative.aiSuggestions.filter((suggestion) => suggestion.kind === 'risk_indicator')
	);

	function named(value: string | null) {
		return value ?? 'Not named';
	}

	function formatTimestamp(value: string) {
		return value.replace('T', ' ').replace('Z', ' UTC');
	}
</script>

<svelte:head>
	<title>PHI / PII Risk Pre-Check — {initiative.name}</title>
</svelte:head>

<main class="page">
	<AppNav initiativeId={initiative.id} active="risk-precheck" />

	<header class="header">
		<p class="eyebrow">PHI / PII Risk Pre-Check</p>
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

	<section aria-label="Initiative context">
		<dl class="details">
			<div>
				<dt>Recorded sensitivity / classification</dt>
				<dd data-recorded-classification>{initiative.classification ?? 'Not recorded'}</dd>
			</div>
			<div>
				<dt>Synthetic data description</dt>
				<dd>{initiative.syntheticDataDescription}</dd>
			</div>
			<div>
				<dt>Tools / vendors</dt>
				<dd>{initiative.toolsVendors}</dd>
			</div>
			<div>
				<dt>Known constraints</dt>
				<dd>{initiative.knownConstraints}</dd>
			</div>
		</dl>
	</section>

	<section class="panel" aria-label="Classification boundary">
		<h2>Classification boundary</h2>
		<p class="section-note">
			The recorded classification is a working program record. Any AI classification output is a
			suggestion only. Neither is a legal, regulatory, or HIPAA compliance determination.
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

	<section class="panel" aria-label="AI-assisted possible risk indicators">
		<h2>AI-assisted possible risk indicators</h2>
		<p class="section-note">Indicators are prompts for human review, not compliance findings.</p>
		{#if riskIndicators.length === 0}
			<p data-risk-indicators="none">No AI-assisted risk indicators recorded.</p>
		{:else}
			<ul data-risk-indicators="present">
				{#each riskIndicators as indicator, index (index)}
					<li>{indicator.text}</li>
				{/each}
			</ul>
		{/if}
	</section>

	<section class="readiness-note" aria-label="Readiness explanation">
		{#if isPreRiskReview}
			<p data-pre-risk-explanation>
				At {initiative.lifecycleState}, Open gates do not by themselves make readiness Blocked.
				Incomplete intake may prevent submission or progression, but that is separate from readiness.
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

	<section aria-label="Program controls">
		<h2>Program Controls</h2>
		<p class="section-note">
			These are recorded program-control statuses, not certifications or legal determinations.
		</p>
		<table>
			<thead>
				<tr>
					<th scope="col">Control</th>
					<th scope="col">Status</th>
					<th scope="col">Owner</th>
					<th scope="col">Notes</th>
					<th scope="col">Recorded decision</th>
				</tr>
			</thead>
			<tbody>
				{#each initiative.gates as gate (gate.key)}
					<tr
						data-gate-key={gate.key}
						class:gate-open={gate.status === 'Open'}
						class:gate-satisfied={gate.status === 'Satisfied'}
						class:gate-na={gate.status === 'Not Applicable'}
					>
						<th scope="row">{gate.label}</th>
						<td>
							<span class="gate-status" data-gate-status={gate.status}>{gate.status}</span>
						</td>
						<td>{named(gate.owner)}</td>
						<td>{gate.notes || '—'}</td>
						<td>
							{#if gate.recordedDecision}
								{gate.recordedDecision.actor}, {formatTimestamp(gate.recordedDecision.recordedAt)}
							{:else}
								—
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	<section class="panel" aria-label="Human authority">
		<h2>Human authority</h2>
		<ul>
			<li>Humans confirm or correct the working classification.</li>
			<li>Humans record gate statuses.</li>
			<li>Humans decide whether review is complete enough to progress.</li>
			<li>AI does not approve, satisfy controls, change lifecycle, or declare compliance.</li>
		</ul>
	</section>

	<p class="disclaimer" role="note">
		All data on this page is synthetic. This screen is a PHI / PII Risk Pre-Check, not a compliance
		checker. It does not determine legal, regulatory, HIPAA, privacy, or security compliance.
	</p>
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
	table,
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

	section[aria-label='Program controls'] h2 {
		margin: 1.5rem 0 0.5rem;
	}

	.section-note {
		margin: 0 0 0.75rem;
		color: #4b5563;
		font-size: 0.9rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
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

	.gate-open {
		background: #f7f1e8;
	}

	.gate-satisfied {
		background: #f3f4f3;
	}

	.gate-na {
		background: #f7f6f3;
	}

	.gate-status {
		font-weight: 600;
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
