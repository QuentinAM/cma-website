<script>
    
    // Components
	import CustomButton from '../../components/button.svelte';
    import CustomInput from '../../components/input.svelte';
    
    // Libs
    import firebase from 'firebase/compat/app';
    import "firebase/compat/auth";
    import { notifier } from '@beyonk/svelte-notifications';

    // Email
    let email = "mail@d.fr";

    // Password
    let password = "";
    let password_error = false;
    let password_message = "Mot de passe invalide.";
    
    // Update UI
    export let ui_login;
    export let ui_logout; 
    export let show_register;


    const auth = firebase.auth();

    // Login
    function login()
    {
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) =>
        {
            console.log("Logged in");
            notifier.success('Connecté', { timeout: 2000  });
            ui_login();
        })
        .catch(function(error) {
            password_error = true;

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorMessage === 'auth/wrong-password')
            {
                password_message = "Mot de passe invalide.";
            }
            else if (errorMessage == 'MISSING_PASSWORD')
            {
                password_message = "Mot de passe manquant.";
            }
        });
    }

    function handle_click(e)
    {
        e.preventDefault();

        if (e.target.id == "password_reset")
        {
            firebase.auth().sendPasswordResetEmail(email)
            .then(() => 
            {
                notifier.success('Email envoyé', { timeout: 2000  });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                
                if (errorCode == 'auth/user-not-found')
                {
                    notifier.danger('Utilisateur introuvable', { timeout: 2000  });
                }
            });
        }
    }
</script>

<script context="module">
    export function logout()
    {
        console.log("Logging out");
        firebase.auth().signOut().then(function()
        {
            console.log("Logged out");
            notifier.success('Déconnecté', { timeout: 2000  });
            ui_logout();
        }).catch(function(error)
        {
            console.log(error.message);
        });	
    }

</script>

<div class="form">
    <div class="form-group">
    <!--- Email input --->
    <label for="exampleInputEmail1">Email address</label>
    <CustomInput placeholder="Email" type="text" id="email"
                isError={(!email.includes('@')) || (!email.includes('.'))} 
                error_message="Adresse email invalide." 
                bind:content={email}
    />
    </div>

    <div class="form-group">
    <!--- Password input --->
    <label for="exampleInputPassword1">Password</label>
    <CustomInput placeholder="Mot de passe" type="password" id="password"
                isError={password_error} 
                error_message={password_message} 
                bind:content={password}
    />
    </div>

    <!--- Login button input --->
    <CustomButton name="Continuer" on:click={login}/>

    <button class="form-control btn btn-secondary" on:click={show_register}>S'inscrire</button>
    <a href="/" id="password_reset" on:click={handle_click}>Mot de passe oublié.</a>
</div>

<style>
.form
{
    padding-left: 1%;
    padding-right: 1%;
}

.form-group
{
    margin-bottom: 0.5%;
    margin-top: 0.5%;
}
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