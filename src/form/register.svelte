<script>
    // Import button
	import CustomButton from '../button.svelte';

    // Import input
    import CustomInput from './input.svelte';

    import firebase from 'firebase/compat/app';
    import "firebase/compat/firestore";
    import "firebase/compat/auth";

    // Get a reference to the database service
    const db = firebase.firestore();

    // Informations
    let email = "";

    let firstname = "";
    let lastname = "";
    let phone = "";

    let password_error = false;
    let password = "";
    let password_confirm = "";

    async function register()
    {
        if (firstname == "" || 
            lastname == "" ||
            email == "" ||
            phone == "" ||
            password == "" ||
            password_confirm == "")
        {
            alert("Please fill all fields");
            return;
        }
        else if (password != password_confirm)
        {
            alert("Passwords don't match");
            return;
        }
        else
        {
            // Create user
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) =>{
                // Add user to database
                db.collection("users").doc(userCredential.user.uid).set({
                   created_at: firebase.firestore.FieldValue.serverTimestamp(),
                   email: email,
                   first_name: firstname,
                   last_name: lastname,
                   icon_url: "",
                   phone: phone,
                   appointments: {},
                })
                .then(() => {
                    alert("User created");
                })
                .catch((error) => {
                    alert("Error: " + error.message);
                });
            })
            .catch((error) =>
            {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                
                if (errorCode == 'auth/weak-password')
                {
                    password_error = true;
                }
                console.log(errorMessage);
            });
        }
    }

</script>

<!--- Email input --->
<CustomInput placeholder="Email" type="text" id="email"
            isError={(!email.includes('@')) || (!email.includes('.'))} 
            error_message="Invalid email" 
            bind:content={email}
/>

<!--- Firstname input --->
<CustomInput placeholder="Prénom" type="text" id="firstname"
            isError={false} 
            error_message="" 
            bind:content={firstname}
/>

<!--- Lastname input --->
<CustomInput placeholder="Nom" type="text" id="lastname"
            isError={false} 
            error_message="" 
            bind:content={lastname}
/>

<!--- Phone input --->
<CustomInput placeholder="Téléphone" type="text" id="phone"
            isError={false} 
            error_message="" 
            bind:content={phone}
/>

<!--- Password input --->
<CustomInput placeholder="Mot de passe" type="password" id="password"
            isError={password_error} 
            error_message="Le mot de passe doit contenir au moins une majuscule, un caractère spécial, un chiffre et être de taille 8" 
            bind:content={password}
/>

<!--- Password confirm input --->
<CustomInput placeholder="Confirmation mot de passe"
            type="password" id="password_confirm"
            isError={password_confirm != password} 
            error_message="Les mots de passe ne correspondent pas" 
            bind:content={password_confirm}
/>

<!--- Login button input --->
<CustomButton name="Continuer" on:click={register}/>