<script>
    // Import navbar
    import Navbar from '../navbar.svelte';

    // Import button
	import CustomButton from '../button.svelte';

    // Import input
    import CustomInput from './input.svelte';

    export let displayed;

    // Email
    let email = "mail@d.fr";

    // Password
    let password = "";

    // Password error
    let passwordError = false;

    // Logged in ?
    export let loggedIn = false;
</script>

<Navbar logged_in={loggedIn}/>

{#if displayed}
<p>Email is {email}</p>
<p>Password is {password}</p>
<!--- Email input --->
<CustomInput placeholder="Email" type="text" id="email" 
            isError={(!email.includes('@')) || (!email.includes('.'))} 
            error_message="Invalid email" 
            bind:content={email}
/>

<!--- Password input --->
<CustomInput placeholder="Password" type="password" id="password" 
            isError={passwordError} 
            error_message="Invalid password" 
            bind:content={password}
/>

<!--- Login button input --->
<CustomButton name="Continue" on:click={() => loggedIn = !loggedIn}/>
{/if}
<style>
    
</style>