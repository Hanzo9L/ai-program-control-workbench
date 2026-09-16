<script lang="ts">
	import WorkbenchShell from '$lib/components/WorkbenchShell.svelte';

	let { children } = $props();
</script>

<WorkbenchShell>
	{@render children()}
</WorkbenchShell>
