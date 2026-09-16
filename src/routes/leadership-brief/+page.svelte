<script lang="ts">
	import AppNav from '$lib/components/AppNav.svelte';
	import { LIFECYCLE_STATES } from '$lib/domain/constants';
	import { SYNTHETIC_INITIATIVES } from '$lib/domain/fixtures';
	import { applicableRequiredOpenGates, isPreRiskReview } from '$lib/domain/validation';

	const initiatives = SYNTHETIC_INITIATIVES;

	function ownerLabel(owner: string | null) {
		return owner ?? 'Not named';
	}

	const totalCount = initiatives.length;
	const blockedCount = initiatives.filter((initiative) => initiative.readiness === 'Blocked').length;
	const readyForApprovalCount = initiatives.filter(
		(initiative) => initiative.lifecycleState === 'Ready for Approval'
	).length;
	const approvedForLaunchCount = initiatives.filter(
		(initiative) => initiative.lifecycleState === 'Approved for Launch'
	).length;
	const inPilotCount = initiatives.filter((initiative) => initiative.lifecycleState === 'In Pilot')
		.length;

	const lifecycleCounts = LIFECYCLE_STATES.map((state) => ({
		state,
		count: initiatives.filter((initiative) => initiative.lifecycleState === state).length
	}));

	const needsAttention = initiatives.flatMap((initiative) => {
		if (isPreRiskReview(initiative.lifecycleState)) return [];
		return applicableRequiredOpenGates(initiative.gates).map((gate) => ({
			initiativeId: initiative.id,
			initiativeName: initiative.name,
			initiativeOwner: ownerLabel(initiative.owner),
			stage: initiative.lifecycleState,
			gateKey: gate.key,
			gateLabel: gate.label,
			gateOwner: ownerLabel(gate.owner)
		}));
	});

	const launchSummary = `Of ${totalCount} recorded initiatives, ${readyForApprovalCount} ${readyForApprovalCount === 1 ? 'is' : 'are'} Ready for Approval, ${approvedForLaunchCount} ${approvedForLaunchCount === 1 ? 'is' : 'are'} Approved for Launch, ${inPilotCount} ${inPilotCount === 1 ? 'is' : 'are'} In Pilot, and ${blockedCount} ${blockedCount === 1 ? 'is' : 'are'} currently Blocked.`;

	const leadershipDrafts = initiatives.flatMap((initiative) =>
		initiative.aiSuggestions
			.filter((suggestion) => suggestion.kind === 'leadership_draft')
			.map((suggestion) => ({
				initiativeName: initiative.name,
				text: suggestion.text
			}))
	);
</script>

<svelte:head>
	<title>Leadership Brief — AI Program Control & Risk Workbench</title>
</svelte:head>

<main class="page">
	<AppNav active="leadership" />

	<header class="header">
		<h1>Leadership Brief</h1>
		<p class="subtitle">
			Read-only portfolio summary derived from recorded initiative data. It does not add facts,
			recommendations, or compliance determinations.
		</p>
	</header>

	<p class="disclaimer" role="note">
		All data on this page is synthetic. This application does not determine legal, regulatory, HIPAA,
		privacy, or security compliance.
	</p>

	<section class="panel" aria-label="Portfolio summary">
		<h2>Portfolio summary</h2>
		<div class="summary">
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
				<p class="stat-label">Approved for launch</p>
				<p class="stat-value" data-count="approved-for-launch">{approvedForLaunchCount}</p>
			</div>
			<div class="stat">
				<p class="stat-label">In pilot</p>
				<p class="stat-value" data-count="in-pilot">{inPilotCount}</p>
			</div>
		</div>
		<ul class="lifecycle-counts" data-lifecycle-counts>
			{#each lifecycleCounts as item (item.state)}
				<li>{item.state}: {item.count}</li>
			{/each}
		</ul>
	</section>

	<section class="panel" aria-label="Needs attention">
		<h2>Needs attention</h2>
		<p class="section-note">
			Required Open gates at Risk Review or later. Open gates during Draft or Intake Review are not
			listed here.
		</p>
		{#if needsAttention.length === 0}
			<p>No required Open gates currently prevent progression.</p>
		{:else}
			<div class="table-scroll">
				<table data-needs-attention>
					<thead>
						<tr>
							<th scope="col">Initiative</th>
							<th scope="col">Initiative owner</th>
							<th scope="col">Stage</th>
							<th scope="col">Open gate</th>
							<th scope="col">Gate owner</th>
						</tr>
					</thead>
					<tbody>
						{#each needsAttention as row (`${row.initiativeId}-${row.gateKey}`)}
							<tr data-attention-initiative={row.initiativeId} data-attention-gate={row.gateKey}>
								<th scope="row">
									<a href="/initiatives/{row.initiativeId}">{row.initiativeName}</a>
								</th>
								<td>{row.initiativeOwner}</td>
								<td>{row.stage}</td>
								<td>{row.gateLabel}</td>
								<td>{row.gateOwner}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
		<p data-launch-summary>{launchSummary}</p>
	</section>

	<section class="panel" aria-label="Existing AI-assisted draft snippets">
		<h2>Existing AI-assisted draft snippets</h2>
		<p class="section-note">
			These are draft suggestions only and are not the recorded leadership brief.
		</p>
		{#if leadershipDrafts.length === 0}
			<p>No leadership_draft suggestions are recorded.</p>
		{:else}
			<ul data-leadership-drafts>
				{#each leadershipDrafts as draft, index (`draft-${index}`)}
					<li>
						<p class="draft-source">{draft.initiativeName}</p>
						<p>{draft.text}</p>
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	<section class="panel" aria-label="Human authority">
		<h2>Human authority</h2>
		<ul>
			<li>This brief reflects recorded program data only.</li>
			<li>AI does not approve launches or change initiative state.</li>
			<li>Leadership decisions remain human decisions.</li>
		</ul>
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

	a {
		color: #1f4e46;
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

	.disclaimer,
	.panel {
		background: #fff;
		border: 1px solid #d8d5cc;
		padding: 0.85rem 1rem;
		margin: 1.25rem 0 0;
	}

	h2 {
		margin: 0 0 0.75rem;
		font-size: 1.15rem;
	}

	.section-note {
		margin: 0 0 0.75rem;
		color: #4b5563;
		font-size: 0.9rem;
	}

	.table-scroll {
		min-width: 0;
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		text-align: left;
		vertical-align: top;
		padding: 0.65rem 0.7rem;
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

	[data-launch-summary] {
		margin: 0.85rem 0 0;
		color: #4b5563;
		font-size: 0.95rem;
	}

	.summary {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 0.75rem;
	}

	.stat {
		background: #f7f6f2;
		border: 1px solid #e6e3db;
		border-radius: 0.4rem;
		padding: 0.75rem 0.85rem;
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

	.lifecycle-counts,
	.panel ul {
		margin: 0.75rem 0 0;
		padding-left: 1.1rem;
	}

	.panel li + li {
		margin-top: 0.45rem;
	}

	.draft-source {
		margin: 0 0 0.2rem;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		color: #5c6570;
	}
</style>
