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
<label for="exampleInputEmail1">Email address</label>
<CustomInput placeholder="Email" type="text" id="email"
            isError={(!email.includes('@')) || (!email.includes('.'))} 
            error_message="Invalid email" 
            bind:content={email}
/>
<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
</div>

<div class="form-group">
<!--- Password input --->
<label for="exampleInputPassword1">Password</label>
<CustomInput placeholder="Mot de passe" type="password" id="password"
            isError={password_error} 
            error_message="Invalid password" 
            bind:content={password}
/>
</div>

<!--- Login button input --->
<CustomButton name="Continuer" on:click={login}/>

<button class="form-control btn btn-secondary" on:click={show_register}>S'inscrire</button>
<style>
button{
    font-weight: bold;
    font-size: 1.1rem;
    padding: 10px;
    margin-top: 10px;
}
button:hover{
    cursor: pointer;
}
button:active{
    transform: scale(0.98);
}
</style>