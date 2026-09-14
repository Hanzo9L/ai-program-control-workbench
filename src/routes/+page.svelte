<script lang="ts">
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
	<header class="header">
		<h1>AI Program Control & Risk Workbench</h1>
		<p class="subtitle">
			Lightweight proof-of-work for structuring AI initiatives, showing dependencies, and recording
			readiness. Humans retain authority over consequential decisions.
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
					<tr data-initiative-id={initiative.id} class:blocked={initiative.readiness === 'Blocked'}>
						<th scope="row">{initiative.name}</th>
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
		All data on this page is synthetic. This application does not determine legal, regulatory, HIPAA,
		privacy, or security compliance.
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

	.header h1 {
		margin: 0 0 0.5rem;
		font-size: 1.65rem;
		font-weight: 650;
	}

	.subtitle {
		margin: 0;
		max-width: 42rem;
		color: #4b5563;
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
		background: #fff;
		border: 1px solid #d8d5cc;
		color: #4b5563;
		font-size: 0.9rem;
	}
</style>
