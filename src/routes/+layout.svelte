<script lang="ts">
	import Navbar from '$lib/components/Header/Navbar.svelte';
	// import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	// onMount(async () => {
	// 	const { data: results, error: resultsError } = await data.supabase.from('birthdays').select();

	// 	if (!resultsError) {
	// 		console.log('results', results);
	// 	}
	// });
</script>

<Navbar />

<main class="max-w-6xl mx-auto px-6">
	{@render children()}
</main>
