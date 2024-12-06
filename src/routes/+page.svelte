<script lang="ts">
	//types
	import type { PageData } from './$types';
	import type { Birthdate } from '$lib/types';

	//library
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';

	//components
	import Day from '$lib/components/Feed/Day.svelte';

	//stores
	let { data }: { data: PageData } = $props();

	//variables
	let birthdays: Birthdate[] = $state([]);

	onMount(async () => {
		const { data: results, error: resultsError } = await data.supabase
			.from('birthdays')
			.select('id, name, birthday, pic');

		if (!resultsError) {
			// birthdays = results;
			const groupedBirthdays = results.reduce<Birthdate[]>((acc, row) => {
				let date = dayjs(row.birthday);
				let record = { id: row.id, name: row.name, pic: row.pic };

				const existing = acc.find(
					(row) => row.date.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
				);
				if (existing) {
					existing.birthdays.push(record);
				} else {
					acc.push({ date, birthdays: [record] });
				}
				return acc;
			}, []);

			birthdays = groupedBirthdays.sort((a, b) => a.date.diff(b.date));
		}
	});
</script>

{#each birthdays as day}
	<Day {day} />
{/each}

<!-- <input type="text" onchange={(e) => (days = e.target.value)} />
<Calendar {days} /> -->
