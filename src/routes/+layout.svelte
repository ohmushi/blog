<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<style>
    :global(body) {
        height: 100vh
    }
</style>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
