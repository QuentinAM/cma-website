<script>
    
    // Import button
	import CustomButton from '../button.svelte';

    // Import input
    import CustomInput from './input.svelte';

    // Email
    let email = "mail@d.fr";

    // Password
    let password = "";
    
    // Update UI
    export let ui_login;
    export let ui_logout; 

    import firebase from 'firebase/compat/app';
    import "firebase/compat/auth";

    const firebaseConfig = {
        
    };

    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    auth.onAuthStateChanged(user_ => { 
        if (user_) {
            ui_login();
            // Get user data
            user = user_.providerData[0];

            // Print all user data
            console.log(user);

        } else {

        }
    });

    let user = null;

    // Login
    function login()
    {
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) =>
        {
            console.log("Logged in");
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

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
        }).catch(function(error)
        {
            ui_logout();
        });	
    }

</script>

<!--- Email input --->
<CustomInput placeholder="Email" type="text" id="email"
            isError={(!email.includes('@')) || (!email.includes('.'))} 
            error_message="Invalid email" 
            bind:content={email}
/>

<!--- Password input --->
<CustomInput placeholder="Password" type="password" id="password"
            isError={false} 
            error_message="Invalid password" 
            bind:content={password}
/>

<!--- Login button input --->
<CustomButton name="Continue" on:click={login}/>