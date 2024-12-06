import { redirect } from '@sveltejs/kit';
import type { Actions, PageData } from './$types';

export const actions = {
	add: async (event) => {
		const { supabase } = event.locals;
		const { request } = event;

		const formData = await request.formData();
		const name = formData.get('name');
		const date = formData.get('date');
		const image =
			'https://singlecolorimage.com/get/' +
			Math.floor(Math.random() * 16777215)
				.toString(16)
				.padStart(6, '0') +
			'/192x192';

		const { error } = await supabase.from('birthdays').insert({
			name: name,
			birthday: date,
			pic: image
		});

		if (error) {
			console.log(error);
		} else {
			redirect(303, '/');
		}
	}
} satisfies Actions;
