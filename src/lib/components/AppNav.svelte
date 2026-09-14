<script lang="ts">
	type NavActive =
		| 'overview'
		| 'portfolio'
		| 'leadership'
		| 'intake'
		| 'risk-precheck'
		| 'program-controls';

	let {
		initiativeId = null,
		active = 'overview'
	}: {
		initiativeId?: string | null;
		active?: NavActive;
	} = $props();

	function isActive(item: NavActive) {
		return active === item;
	}

	function current(item: NavActive) {
		return isActive(item) ? 'page' : undefined;
	}
</script>

<nav class="app-nav" aria-label="Application">
	{#if initiativeId}
		<a
			href="/#portfolio-dashboard"
			class:active={isActive('portfolio')}
			aria-current={current('portfolio')}>Portfolio</a
		>
		<a
			href="/initiatives/{initiativeId}/intake"
			class:active={isActive('intake')}
			aria-current={current('intake')}>Intake</a
		>
		<a
			href="/initiatives/{initiativeId}/risk-precheck"
			class:active={isActive('risk-precheck')}
			aria-current={current('risk-precheck')}>Risk Pre-Check</a
		>
		<a
			href="/initiatives/{initiativeId}"
			class:active={isActive('program-controls')}
			aria-current={current('program-controls')}>Program Controls</a
		>
		<a
			href="/leadership-brief"
			class:active={isActive('leadership')}
			aria-current={current('leadership')}>Leadership Brief</a
		>
	{:else}
		<a href="/" class:active={isActive('overview')} aria-current={current('overview')}>Overview</a>
		<a
			href="/#portfolio-dashboard"
			class:active={isActive('portfolio')}
			aria-current={current('portfolio')}>Portfolio</a
		>
		<a
			href="/leadership-brief"
			class:active={isActive('leadership')}
			aria-current={current('leadership')}>Leadership Brief</a
		>
	{/if}
</nav>

<style>
	.app-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 1rem;
		margin: 0 0 1.25rem;
		padding: 0 0 0.65rem;
		border-bottom: 1px solid #d8d5cc;
		font-size: 0.95rem;
	}

	.app-nav a {
		color: #1f4e46;
		text-decoration: none;
	}

	.app-nav a:hover {
		text-decoration: underline;
	}

	.app-nav a.active {
		font-weight: 650;
		border-bottom: 1px solid #1f4e46;
	}
</style>
