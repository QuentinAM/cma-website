<script>
	// Import button
	import CustomButton from './button.svelte';

	// Import input
	import CustomInput from './form/input.svelte';

	// Email
	let email = "...";
</script>

<main>
	<CustomButton name="Continue"/>
	<CustomInput placeholder="Email" type="text" id="test" 
				isError={(!email.includes('@')) || (!email.includes('.'))} 
				error_message="Invalid email" 
				bind:content={email}
	/>
	
	<p>Email is {email}</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: "DM Sans", sans-serif;
	}
</style>