<script lang="ts">
	let { startDate, endDate }: { startDate: number; endDate: number } = $props();
</script>

<div class="flex flex-row justify-around space-x-1">
	{#each Array(7) as _, i}
		{#if i + startDate <= endDate}
			<div class="flex flex-col w-full h-full min-h-60 p-1">
				<h3 class="text-3xl font-bold">{i + startDate}</h3>
			</div>
		{:else}
			<div class="flex flex-col w-full h-full min-h-60 p-1"></div>
		{/if}
	{/each}
</div>
