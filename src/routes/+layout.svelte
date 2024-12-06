<script lang="ts">
	//types

	//library
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	//components
	import Navbar from '$lib/components/Header/Navbar.svelte';

	//stores
	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	//variables

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Navbar />

<main class="max-w-6xl mx-auto px-6">
	{@render children()}
</main>
