<script lang="ts">
	import LoginForm, { logout } from './pages/form/login.svelte';
	import Account from './pages/account/account.svelte';
	import RegisterForm from './pages/form/register.svelte';
	import Home from './pages/home/home.svelte';
    import Navbar from './pages/home/navbar.svelte';
	import About from './pages/about/about.svelte';
	import Admin from './pages/admin/admin.svelte';
	import Appointment from './appointment/appointment.svelte';
	import MyAppointments from './appointment/my_appointments.svelte';
	import ChatSelector from './chat/chat_selector.svelte';

	// import Product from './payments/product.svelte';
	import { NotificationDisplay } from '@beyonk/svelte-notifications'

	const pages = [
		"home",		// 0
		"login",	// 1
		"register", // 2
		"profile", // 3
		"appointment", // 4
		"my_appointments", // 5
		"admin", // 6
		"about" // 7
	];
	
	let page_displayed = pages[7];

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
		open_my_appointments={() => page_displayed = pages[5]}
		open_admin={() => page_displayed = pages[6]}
		open_about={() => page_displayed = pages[7]}
		logout={() => {logout(); loggedIn = false; page_displayed = pages[0]}}
/>

<div class="expect-nav">
<NotificationDisplay/>

<!-- svelte-ignore empty-block -->
{#if page_displayed == "home"}
	<Home/>
{:else if page_displayed == "login"}
	<LoginForm ui_login={() => {loggedIn = true; page_displayed = pages[0]}} 
			   ui_logout={() => {loggedIn = false; page_displayed = pages[0]}}
			   show_register={() => page_displayed = pages[2]}
	/>
{:else if page_displayed == "register"}
	<RegisterForm/>
{:else if page_displayed == "profile"}
	<Account/>
{:else if page_displayed == "appointment"}
	<Appointment/>
{:else if page_displayed == "my_appointments"}
	<MyAppointments/>
{:else if page_displayed == "admin"}
	<Admin/>
{:else if page_displayed == "about"}
	<About/>
{/if}

{#if loggedIn}
	<ChatSelector/>
{/if}
</div>

<!-- <Product name='Test' amount='1999' price_id='price_1KCt2CJm42LaAy7D9x3Ks2IF'/> -->

</main>

<style lang="postcss" global>
/* @tailwind base;
@tailwind components;
@tailwind utilities; */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "DM Sans", sans-serif !important;
}
.expect-nav
{
	padding-top: 20px;
}

main {
	margin: 0 auto;
	padding: 0;
}
@media (min-width: 300px) {
	main {
		max-width: none;
	}
}

</style>