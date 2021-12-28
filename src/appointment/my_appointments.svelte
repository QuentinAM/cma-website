<script>
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth'
    import 'firebase/compat/database';

    import { get_appointment_from_database, get_month} from './utils.js';

    let promise = get_appointment_from_database(firebase.auth().currentUser.uid);

    function compute_date(date)
    {
        // Split string
        let date_array = date.split("-");
        return `${date_array[2]} ${get_month(date_array[1])} ${date_array[0]} - ${date_array[3]}h00`;
    }

</script>
<h1>Mes rendez-vous</h1>
{#await promise then appointments}
    {#each appointments as app}
        <li>{compute_date(app[0])} : {app[1]}</li>
    {/each}
{/await}

<style>
li{
    list-style: none;
}
</style>