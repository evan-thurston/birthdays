<script lang="ts">
	import CalendarWeek from './CalendarWeek.svelte';

	let { days }: { days: number } = $props();
</script>

<!-- <div class="border-black border border-4"> -->
<div class="flex flex-col space-y-3 m-8">
	{#each Array(Math.ceil(days / 7)) as _, i}
		<!-- <div class={_ !== Math.ceil(days / 7) ? `border-black border-b-4` : ``}> -->
		<CalendarWeek startDate={i * 7 + 1} endDate={days} />
		<!-- </div> -->
	{/each}
</div>
<!-- </div> -->
