<script>
    import Account_settings from './account_settings.svelte';
    import My_Appointments from '../appointment/my_appointments.svelte';

    import firebase from 'firebase/compat/app';

    const auth = firebase.auth();

</script>

<Account_settings name="Nom Prénom" content={auth.currentUser.displayName || 'Non spéficié'}/>
<Account_settings name="Email" content={auth.currentUser.email}/>
<Account_settings name="Téléphone" content={auth.currentUser.phoneNumber || 'Non spécifié'}/>
<My_Appointments/>
<style>

</style>