<script>
	// Import login form
	// NAVBAR INCLUDED IN LOGIN FORM TO MANAGE LOGIN/LOGOUT
	import LoginForm from './form/login.svelte';

	const pages = [
		"home",
		"login",
		"register",
		"profile",
		"appointment"
	];
	
	let page_displayed = pages[1];

</script>

<main>

<LoginForm displayed={page_displayed == "login"} />
<!-- svelte-ignore empty-block -->
{#if page_displayed == "home"}

{:else}
	
{/if}
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