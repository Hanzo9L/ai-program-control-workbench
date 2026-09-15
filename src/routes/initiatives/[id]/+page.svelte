<script lang="ts">
	import type { Initiative } from '$lib/domain/types';

	let { data }: { data: { initiative: Initiative } } = $props();

	const initiative = $derived(data.initiative);
	const openGates = $derived(initiative.gates.filter((gate) => gate.status === 'Open'));

	function named(value: string | null) {
		return value ?? 'Not named';
	}

	function formatTimestamp(value: string) {
		return value.replace('T', ' ').replace('Z', ' UTC');
	}
</script>

<svelte:head>
	<title>{initiative.name} — AI Program Control & Risk Workbench</title>
</svelte:head>

<div class="initiative-view">
	<header class="header">
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

	<section class="readiness-note" aria-label="Readiness explanation">
		{#if initiative.readiness === 'Blocked'}
			<p>
				Blocked because these Open gates currently prevent progression:
			</p>
			<ul data-blocked-open-gates>
				{#each openGates as gate (gate.key)}
					<li>{gate.label}</li>
				{/each}
			</ul>
		{:else}
			<p data-clear-explanation>
				No required Open gate currently prevents progression at this lifecycle stage.
			</p>
		{/if}
	</section>

	<section aria-label="Initiative details">
		<dl class="details">
			<div>
				<dt>Owner</dt>
				<dd>{named(initiative.owner)}</dd>
			</div>
			<div>
				<dt>Sponsor</dt>
				<dd>{named(initiative.sponsor)}</dd>
			</div>
			<div>
				<dt>Problem / outcome</dt>
				<dd>{initiative.problemOutcome}</dd>
			</div>
			<div>
				<dt>Intended users</dt>
				<dd>{initiative.intendedUsers}</dd>
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
				<dt>Success signal</dt>
				<dd>{initiative.successSignal}</dd>
			</div>
			<div>
				<dt>Known constraints</dt>
				<dd>{initiative.knownConstraints}</dd>
			</div>
			<div>
				<dt>Recorded sensitivity / classification</dt>
				<dd>{initiative.classification ?? 'Not recorded'}</dd>
			</div>
			<div>
				<dt>Last updated</dt>
				<dd>{formatTimestamp(initiative.lastUpdated)}</dd>
			</div>
			<div>
				<dt>Initiative notes</dt>
				<dd>{initiative.notes}</dd>
			</div>
		</dl>
	</section>

	<section aria-label="Program controls">
		<h2>Program Controls</h2>
		<p class="section-note">
			These are recorded program-control statuses, not legal, regulatory, HIPAA, privacy, or security
			determinations.
		</p>
		<div class="table-scroll">
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
					<tr data-gate-key={gate.key} class:gate-open={gate.status === 'Open'}>
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
		</div>
	</section>

	<section class="suggestions" aria-label="AI-assisted suggestions">
		<h2>AI-assisted suggestions</h2>
		<p class="section-note">
			These are suggestions only. They are distinct from recorded human decisions and do not change
			lifecycle, readiness, classification, or gate status.
		</p>
		{#if initiative.aiSuggestions.length === 0}
			<p>No suggestions recorded.</p>
		{:else}
			<ul data-ai-suggestions>
				{#each initiative.aiSuggestions as suggestion, index (index)}
					<li>
						<p class="suggestion-kind">{suggestion.kind}</p>
						<p>{suggestion.text}</p>
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	<p class="disclaimer" role="note">
		All data on this page is synthetic. This application does not determine legal, regulatory, HIPAA,
		privacy, or security compliance.
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

	.initiative-view {
		min-width: 0;
	}

	.header h1 {
		margin: 0 0 0.5rem;
		font-size: 1.65rem;
		font-weight: 650;
		color: inherit;
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

	.readiness-note,
	.details,
	table,
	.suggestions,
	.disclaimer {
		background: #fff;
		border: 1px solid #d8d5cc;
	}

	.readiness-note,
	.suggestions,
	.disclaimer {
		padding: 0.85rem 1rem;
		margin: 1.25rem 0 0;
	}

	.details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: 0;
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
		margin: 1.5rem 0 0.5rem;
		font-size: 1.15rem;
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

	.table-scroll {
		min-width: 0;
		overflow-x: auto;
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

	.gate-status {
		font-weight: 600;
	}

	.suggestions ul {
		margin: 0;
		padding-left: 1.1rem;
	}

	.suggestions li + li {
		margin-top: 0.75rem;
	}

	.suggestion-kind {
		margin: 0 0 0.2rem;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		color: #5c6570;
	}

	.suggestions li p:last-child {
		margin: 0;
	}
</style>
