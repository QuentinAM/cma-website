<script>
    import Account_settings from './Account_settings.svelte';

    import firebase from 'firebase/compat/app';

    const auth = firebase.auth();

</script>

<Account_settings name="Nom Prénom" content={auth.currentUser.displayName || 'Non spéficié'}/>
<Account_settings name="Email" content={auth.currentUser.email}/>
<Account_settings name="Téléphone" content={auth.currentUser.phoneNumber || 'Non spécifié'}/>

<style>

</style>