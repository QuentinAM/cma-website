<script>
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth'
    import 'firebase/compat/database';

    import { get_appointment_from_database, get_month, delete_appointment_to_database} from './utils.js';

    const user_id = firebase.auth().currentUser.uid;
    let promise = get_appointment_from_database(user_id);

</script>

<h1>Mes rendez-vous</h1>
    {#await promise then appointments}
        {#each appointments as app}
            <div class="appointment">
                <li>{app.day} {get_month(app.month)} {app.year}  {app.hour} : {app[1]}</li>
                <button on:click={() => delete_appointment_to_database(user_id, app.year, app.month, app.day, app.hour)}></button>
            </div>
        {/each}
    {/await}
<style>
li{
    list-style: none;
}
</style>