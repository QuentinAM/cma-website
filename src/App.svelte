<script>
	// Import login form
	import LoginForm, { logout } from './form/login.svelte';

	// Import account page
	import Account from './pages/account.svelte';

	// Import register form
	import RegisterForm from './form/register.svelte';

	// Import navbar
    import Navbar from './navbar.svelte';

	const pages = [
		"home",
		"login",
		"register",
		"profile",
		"appointment"
	];
	
	let page_displayed = pages[1];

	let loggedIn = false;

	import firebase from 'firebase/compat/app';

	const firebaseConfig = {
        
    };

    const app = firebase.initializeApp(firebaseConfig);
</script>

<main>

<Navbar logged_in={loggedIn} 
		open_accueil={() => page_displayed = pages[0]}
		open_login={() => {console.log("Opening login"); page_displayed = pages[1]}}
		open_account={() => page_displayed = pages[3]}
		open_appointement={() => page_displayed = pages[4]}
		logout={() => {logout(); loggedIn = false; page_displayed = pages[0]}}
/>
<!-- svelte-ignore empty-block -->
{#if page_displayed == "home"}

{:else if page_displayed == "login"}
	<LoginForm ui_login={() => {loggedIn = true; page_displayed = pages[3]}} 
			   ui_logout={() => {loggedIn = false; page_displayed = pages[0]}}
			   show_register={() => page_displayed = pages[2]}
	/>
{:else if page_displayed == "register"}
	<RegisterForm/>
{:else if page_displayed == "profile"}
	<Account/>
{:else if page_displayed == "appointment"}

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