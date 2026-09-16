<script lang="ts">
	import { page } from '$app/state';
	import AppNav from '$lib/components/AppNav.svelte';
	import { SYNTHETIC_INITIATIVES } from '$lib/domain/fixtures';

	let { children } = $props();

	type ChildView = 'intake' | 'risk-precheck' | 'program-controls';

	const currentId = $derived(page.params.id ?? null);
	const pathname = $derived(page.url.pathname);

	const currentChild = $derived.by((): ChildView | null => {
		if (!currentId) return null;
		if (pathname.endsWith('/intake')) return 'intake';
		if (pathname.endsWith('/risk-precheck')) return 'risk-precheck';
		return 'program-controls';
	});

	let expandedIds = $state(new Set<string>(page.params.id ? [page.params.id] : []));

	function isExpanded(initiativeId: string) {
		return expandedIds.has(initiativeId);
	}

	function toggleExpanded(initiativeId: string) {
		const next = new Set(expandedIds);
		if (next.has(initiativeId)) {
			next.delete(initiativeId);
		} else {
			next.add(initiativeId);
		}
		expandedIds = next;
	}

	function childHref(initiativeId: string, child: ChildView) {
		if (child === 'intake') return `/initiatives/${initiativeId}/intake`;
		if (child === 'risk-precheck') return `/initiatives/${initiativeId}/risk-precheck`;
		return `/initiatives/${initiativeId}`;
	}
</script>

<main class="page">
	<AppNav active="portfolio" />

	<div class="shell" data-workbench-shell data-current-initiative={currentId ?? ''} data-current-child={currentChild ?? ''}>
		<nav class="tree" aria-label="Initiative portfolio" data-initiative-tree>
			<p class="tree-heading">
				<a href="/" class="tree-root" class:tree-root-current={!currentId}>Portfolio</a>
			</p>
			<ul class="tree-list">
				{#each SYNTHETIC_INITIATIVES as initiative (initiative.id)}
					{@const expanded = isExpanded(initiative.id)}
					{@const selected = initiative.id === currentId}
					<li
						class="tree-initiative"
						class:tree-initiative-current={selected}
						data-tree-initiative={initiative.id}
						data-tree-state={expanded ? 'expanded' : 'collapsed'}
					>
						<div class="tree-initiative-row">
							<button
								type="button"
								class="tree-disclosure"
								aria-expanded={expanded}
								aria-label={expanded ? `Collapse ${initiative.name}` : `Expand ${initiative.name}`}
								onclick={() => toggleExpanded(initiative.id)}
							>
								<span class="tree-chevron" aria-hidden="true">{expanded ? '▼' : '▶'}</span>
							</button>
							<a class="tree-initiative-link" href="/initiatives/{initiative.id}">
								<span class="tree-initiative-name">{initiative.name}</span>
							</a>
						</div>
						{#if expanded}
							<ul class="tree-children">
								<li>
									<a
										href={childHref(initiative.id, 'intake')}
										class="tree-child"
										class:tree-child-current={selected && currentChild === 'intake'}
										data-tree-child="intake"
										aria-current={selected && currentChild === 'intake' ? 'page' : undefined}
									>
										Intake
									</a>
								</li>
								<li>
									<a
										href={childHref(initiative.id, 'risk-precheck')}
										class="tree-child"
										class:tree-child-current={selected && currentChild === 'risk-precheck'}
										data-tree-child="risk-precheck"
										aria-current={selected && currentChild === 'risk-precheck' ? 'page' : undefined}
									>
										Risk Pre-Check
									</a>
								</li>
								<li>
									<a
										href={childHref(initiative.id, 'program-controls')}
										class="tree-child"
										class:tree-child-current={selected && currentChild === 'program-controls'}
										data-tree-child="program-controls"
										aria-current={selected && currentChild === 'program-controls' ? 'page' : undefined}
									>
										Program Controls
									</a>
								</li>
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>

		<div class="workspace">
			{@render children()}
		</div>
	</div>
</main>

<style>
	.page {
		max-width: 80rem;
		margin: 0 auto;
		padding: 2rem 1.25rem 3rem;
	}

	.shell {
		display: grid;
		grid-template-columns: 16.5rem minmax(0, 1fr);
		gap: 1.5rem;
		align-items: start;
	}

	.tree {
		position: sticky;
		top: 1rem;
		min-width: 0;
		padding: 0.15rem 0 0;
	}

	.tree-heading {
		margin: 0 0 0.65rem;
		font-size: 0.75rem;
		font-weight: 650;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #5c6570;
	}

	.tree-root {
		color: inherit;
		text-decoration: none;
	}

	.tree-root:hover {
		text-decoration: underline;
	}

	.tree-root-current {
		color: #1f4e46;
	}

	.tree-list,
	.tree-children {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tree-initiative {
		margin: 0 0 0.2rem;
	}

	.tree-initiative-row {
		display: flex;
		align-items: flex-start;
		gap: 0.1rem;
		min-width: 0;
	}

	.tree-disclosure {
		flex: 0 0 auto;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		margin: 0;
		padding: 0.28rem 0.2rem;
		border: 0;
		border-radius: 0.25rem;
		background: transparent;
		color: #5c6570;
		cursor: pointer;
		font: inherit;
		line-height: 1.3;
	}

	.tree-disclosure:hover {
		background: #eceae4;
	}

	.tree-initiative-link,
	.tree-child {
		display: flex;
		align-items: flex-start;
		min-width: 0;
		padding: 0.28rem 0.4rem;
		border-radius: 0.25rem;
		color: #243040;
		text-decoration: none;
		font-size: 0.92rem;
		line-height: 1.3;
	}

	.tree-initiative-link {
		flex: 1 1 auto;
	}

	.tree-initiative-link:hover,
	.tree-child:hover {
		background: #eceae4;
	}

	.tree-initiative-current .tree-initiative-link {
		font-weight: 650;
		background: #eef3f1;
		color: #1f4e46;
	}

	.tree-chevron {
		display: block;
		width: 0.9rem;
		font-size: 0.7rem;
		line-height: 1.45;
	}

	.tree-initiative-name {
		min-width: 0;
		overflow-wrap: anywhere;
	}

	.tree-children {
		margin: 0.1rem 0 0.35rem 0.55rem;
		padding-left: 0.55rem;
		border-left: 1px solid #d8d5cc;
	}

	.tree-child {
		font-size: 0.88rem;
		color: #4b5563;
	}

	.tree-child-current {
		font-weight: 650;
		color: #1f4e46;
		background: #eef3f1;
	}

	.tree-initiative-link:focus-visible,
	.tree-child:focus-visible,
	.tree-root:focus-visible,
	.tree-disclosure:focus-visible {
		outline: 2px solid #1f4e46;
		outline-offset: 2px;
	}

	.workspace {
		min-width: 0;
	}

	@media (max-width: 52rem) {
		.shell {
			grid-template-columns: minmax(0, 1fr);
			gap: 1rem;
		}

		.tree {
			position: static;
			padding: 0.65rem 0.75rem;
			background: #fff;
			border: 1px solid #d8d5cc;
		}
	}
</style>
