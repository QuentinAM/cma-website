<script>
	// Import login form
	import LoginForm, { logout } from './form/login.svelte';
	import Account from './pages/account.svelte';
	import RegisterForm from './form/register.svelte';
	import Home from './pages/home.svelte';
    import Navbar from './navbar.svelte';
	import Footer from './footer.svelte';
	import Appointment from './appointment/appointment.svelte';
	import ChatSelector from './chat/chat_selector.svelte';

	// import Product from './payments/product.svelte';

	const pages = [
		"home",
		"login",
		"register",
		"profile",
		"appointment"
	];
	
	let page_displayed = pages[0];

	let loggedIn = false;

	import firebase from 'firebase/compat/app';

	const firebaseConfig = {
		apiKey: "AIzaSyDBTcx2N9UUsaj6_NZrwXW9BgzcqMiE984",
		authDomain: "cma-web-6ea3a.firebaseapp.com",
		databaseURL: "https://cma-web-6ea3a-default-rtdb.europe-west1.firebasedatabase.app",
		projectId: "cma-web-6ea3a",
		storageBucket: "cma-web-6ea3a.appspot.com",
		messagingSenderId: "388388589028",
		appId: "1:388388589028:web:9e946ace3413fb10430bf1"
    };

    const app = firebase.initializeApp(firebaseConfig);
</script>

<main>

<Navbar logged_in={loggedIn} 
		open_accueil={() => page_displayed = pages[0]}
		open_login={() => page_displayed = pages[1]}
		open_account={() => page_displayed = pages[3]}
		open_appointement={() => page_displayed = pages[4]}
		logout={() => {logout(); loggedIn = false; page_displayed = pages[0]}}
/>
<!-- svelte-ignore empty-block -->
{#if page_displayed == "home"}
	<Home/>
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
	<Appointment/>
{/if}

{#if loggedIn}
	<ChatSelector/>
{/if}

<!-- <Product name='Test' amount='1999' price_id='price_1KCt2CJm42LaAy7D9x3Ks2IF'/> -->

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
		font-family: "DM Sans", sans-serif !important;
	}
</style>