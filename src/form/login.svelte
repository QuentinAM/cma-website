<script>
    
    // Import button
	import CustomButton from '../button.svelte';

    // Import input
    import CustomInput from './input.svelte';

    // Email
    let email = "mail@d.fr";

    // Password
    let password = "";
    let password_error = false;
    
    // Update UI
    export let ui_login;
    export let ui_logout; 
    export let show_register;

    import firebase from 'firebase/compat/app';
    import "firebase/compat/auth";

    const auth = firebase.auth();

    // Login
    function login()
    {
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) =>
        {
            console.log("Logged in");
            ui_login();
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password')
            {
                password_error = true;
            }
        });
    }
</script>

<script context="module">
    export function logout()
    {
        console.log("Logging out");
        firebase.auth().signOut().then(function()
        {
            console.log("Logged out");
            ui_logout();
        }).catch(function(error)
        {
            console.log(error.message);
        });	
    }

</script>

<div class="form-group">
<!--- Email input --->
<CustomInput placeholder="Email" type="text" id="email"
            isError={(!email.includes('@')) || (!email.includes('.'))} 
            error_message="Invalid email" 
            bind:content={email}
/>

<!--- Password input --->
<CustomInput placeholder="Mot de passe" type="password" id="password"
            isError={password_error} 
            error_message="Invalid password" 
            bind:content={password}
/>

<!--- Login button input --->
<CustomButton name="Continuer" on:click={login}/>

<button class="form-control" on:click={show_register}>S'inscrire</button>
</div>
<style>
    button{
        border: none;
        background-color: transparent;
        font-weight: bold;
        font-size: 1.1rem;
        border-radius: 4px;
        padding: 10px;
        margin: 10px;
    }
    button:hover{
        cursor: pointer;
        color: rgb(14, 135, 165);
    }
    button:active{
        transform: scale(0.98);
        background-color: transparent;
    }
</style>