<script>
    import Account_settings from './account_settings.svelte';
    import My_Appointments from '../appointment/my_appointments.svelte';

    import firebase from 'firebase/compat/app';
    import "firebase/compat/firestore";

    const db = firebase.firestore();
    const auth = firebase.auth();

    // Information about the user
    var first_name = "";
    var last_name = "";
    var email = "";
    var phone_number = "";
    var icon_url = "";

    // Information about the users
    console.log(auth.currentUser.uid);
    db.collection("users").doc(auth.currentUser.uid).get()
        .then((doc) => {
            if (doc.exists)
            {
                const data =  doc.data();
                first_name = data.first_name;
                last_name = data.last_name;
                email = data.email;
                phone_number = data.phone;
                icon_url = data.icon_url;
            } 
            else
            {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
        .catch(function(error) {
            console.log("Error getting document:", error);
        }
    );

</script>

<Account_settings name="Nom Prénom" content={(first_name + last_name) || 'Non spéficié'}/>
<Account_settings name="Email" content={email}/>
<Account_settings name="Téléphone" content={phone_number || 'Non spécifié'}/>
<My_Appointments/>
<style>

</style>