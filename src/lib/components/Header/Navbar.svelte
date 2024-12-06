<script>
	import { goto } from '$app/navigation';

	import CakeIcon from '../icons/CakeIcon.svelte';
</script>

<nav class="flex flex-row items-center justify-between min-h-32 py-6 px-12 bg-purple-300">
	<button onclick={() => goto('/')} class="flex flex-row space-x-3">
		<CakeIcon />
		<h3 class="text-5xl font-black text-purple-700">birthday surfer</h3>
	</button>
	<button
		onclick={() => goto('/add')}
		class="border-4 border-purple-700 rounded-3xl px-6 py-3 hover:bg-purple-400 focus:bg-purple-500 transition-all"
	>
		<h1 class="text-3xl font-black text-purple-700">add a birthday</h1>
	</button>
</nav>
