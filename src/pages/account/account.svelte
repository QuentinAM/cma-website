<script>
    import Account_settings from './account_settings.svelte';
    import My_Appointments from '../../appointment/my_appointments.svelte';

    import firebase from 'firebase/compat/app';
    import "firebase/compat/firestore";

    const db = firebase.firestore();
    const auth = firebase.auth();

    // Edit settings
    var is_editing = false;

    // Information about the user
    var first_name = "";
    var last_name = "";
    var email = "";
    var phone_number = "";
    var icon_url = "";

    // Information about the users
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

<div class="account">
    <button on:click={() => {is_editing = !is_editing}}>Modifier</button>
    <Account_settings name="Nom" content={last_name || 'Non spéficié'} disabled={!is_editing}/>
    <Account_settings name="Prénom" content={first_name || 'Non spéficié'} disabled={!is_editing}/>
    <Account_settings name="Email" content={email} disabled={!is_editing}/>
    <Account_settings name="Téléphone" content={phone_number || 'Non spécifié'} disabled={!is_editing}/>
    <div class="appointments">
        <My_Appointments/>
    </div>
</div>

<style>
button{
    position: relative;
    width: 10%;
    height: 100%;
    border: 3px solid green;
}
.account{
    padding-left: 1%;
    padding-right: 1%;
}
.appointments{
    padding-top: 2%;
}
</style>