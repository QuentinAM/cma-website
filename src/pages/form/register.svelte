<script>
    // Import button
	import CustomButton from '../../components/button.svelte';

    // Import phone
    import Phone from './phone.svelte';

    // Import input
    import CustomInput from '../../components/input.svelte';

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

<div class="form">
    <div class="form-group">
    <!--- Email input --->
    <label for="exampleInputEmail1">Email address</label>
    <CustomInput placeholder="Email" type="text" id="email"
                isError={(!email.includes('@')) || (!email.includes('.'))} 
                error_message="Invalid email" 
                bind:content={email}
    />
    <small id="emailHelp" class="form-text text-muted">Votre email ne sera jamais partagé.</small>
    </div>

    <div class="form-group">
    <!--- Firstname input --->
    <label for="exampleInputEmail1">Prénom</label>
    <CustomInput placeholder="Prénom" type="text" id="firstname"
                isError={false} 
                error_message="" 
                bind:content={firstname}
    />
    </div>

    <div class="form-group">
    <!--- Lastname input --->
    <label for="exampleInputEmail1">Nom</label>
    <CustomInput placeholder="Nom" type="text" id="lastname"
                isError={false} 
                error_message="" 
                bind:content={lastname}
    />
    </div>

    <div class="form-group">
    <!--- Phone input --->
    <label for="exampleInputEmail1">Téléphone</label>
    <!-- <Phone/> -->
    <CustomInput placeholder="+33" type="text" id="phone"
                isError={false} 
                error_message="" 
                bind:content={phone}
    />
    </div>

    <div class="form-group">
    <!--- Password input --->
    <label for="exampleInputEmail1">Mot de passe</label>
    <CustomInput placeholder="Mot de passe" type="password" id="password"
                isError={password_error} 
                error_message="Le mot de passe doit contenir au moins une majuscule, un caractère spécial, un chiffre et être de taille 8" 
                bind:content={password}
    />
    </div>

    <div class="form-group">
    <!--- Password confirm input --->
    <label for="exampleInputEmail1">Confirmation mot de passe</label>
    <CustomInput placeholder="Confirmation mot de passe"
                type="password" id="password_confirm"
                isError={password_confirm != password} 
                error_message="Les mots de passe ne correspondent pas" 
                bind:content={password_confirm}
    />
    <small id="passwordHelp" class="form-text text-muted">Votre mot de passe respecter les critères suivants : 
        <ul>
            <li>
                Doit contenir au moins 8 caractères
            </li>
            <li>
                Doit contenir au moins une majuscule
            </li>
            <li>
                Doit contenir au moins un chiffre
            </li>
            <li>
                Doit contenir au moins un caractère spécial
            </li>
        </ul>
    </small>
    </div>

    <!--- Login button input --->
    <CustomButton name="Continuer" on:click={register}/>
</div>

<style>
.form-group
{
    margin-bottom: 10px;
    margin-top: 10px;
}
.form
{
    padding-left: 1%;
    padding-right: 1%;
}

</style>