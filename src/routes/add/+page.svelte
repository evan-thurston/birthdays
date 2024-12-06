<main class="flex flex-col space-y-6 px-3 py-6">
	<h3 class="text-5xl font-black text-purple-300 text-center">add someone's birthday</h3>
	<form action="?/add" method="post" class="flex flex-col space-y-3 max-w-3xl mx-auto">
		<input
			type="text"
			name="name"
			placeholder="John Doe"
			class="border-4 border-purple-300 rounded-3xl px-6 py-3 bg-purple-300 bg-opacity-30 hover:bg-opacity-60 focus:bg-opacity-80 transition-all text-xl placeholder-white text-white"
			required
		/>
		<input
			type="date"
			name="date"
			min="1800-01-01"
			max="2099-12-31"
			class="border-4 border-purple-300 rounded-3xl px-6 py-3 bg-purple-300 bg-opacity-30 hover:bg-opacity-60 focus:bg-opacity-80 transition-all text-xl placeholder-white text-white"
			required
		/>
		<!-- <input
			type="file"
			name="image"
			class="border-4 border-purple-300 rounded-3xl px-6 py-3 bg-purple-300 bg-opacity-30 hover:bg-opacity-60 focus:bg-opacity-80 transition-all text-xl placeholder-white text-white"
			required
		/> -->
		<input
			type="submit"
			value="Add"
			maxlength="8"
			class="w-fit mx-auto border-4 border-purple-300 rounded-3xl px-6 py-3 bg-purple-300 bg-opacity-0 hover:cursor-pointer hover:bg-opacity-20 focus:bg-opacity-40 transition-all text-xl placeholder-white text-white"
		/>
	</form>
</main>
