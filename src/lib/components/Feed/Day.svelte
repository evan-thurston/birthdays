<script lang="ts">
	import CakeIcon from '../icons/CakeIcon.svelte';

	let { day }: { day: any } = $props();
</script>

<main class="mb-6">
	<div class="my-6 py-6 flex flex-row space-x-6 justify-between border-y-2 border-purple-300">
		<div class="flex flex-col space-y-3">
			<h1 class="text-6xl font-bold text-purple-300">
				{day.date.format('MMMM D')}
			</h1>
			<h3 class="ml-3 text-xl font-bold text-purple-300 uppercase">
				{day.date.format('dddd YYYY')}
			</h3>
		</div>
		<!-- <Calendar days={31} /> -->
		<div class="flex flex-row space-x-3 items-center">
			<!-- {#if birthdays > 3} -->
			<h5 class="text-purple-300 text-3xl font-bold">{day.birthdays.length}</h5>
			<!-- {/if} -->
			<!-- {#each Array(birthdays > 3 ? 3 : birthdays) as _, i} -->
			<CakeIcon light />
			<!-- {/each} -->

			<!-- <h5 class="text-purple-300 text-xl font-bold uppercase">+ 3 more</h5> -->
		</div>
	</div>
	<div class="flex flex-row space-x-3 overflow-x-auto pb-1">
		{#each day.birthdays as birthday}
			<div
				class="flex flex-col space-y-3 items-center px-6 py-3 bg-purple-300 rounded-3xl shrink-0 w-48"
			>
				<img src={`${birthday.pic}`} alt={birthday.name} class="size-36 rounded-full" />
				<!-- <img src={`pics/${birthday.pic}`} alt={birthday.name} class="size-36 rounded-full" /> -->
				<h5 class="text-purple-700 text-xl font-black uppercase truncate w-full text-center">
					{birthday.name}
				</h5>
			</div>
		{/each}
	</div>
</main>
