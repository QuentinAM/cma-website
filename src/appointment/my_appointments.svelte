<script>
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth'
    import 'firebase/compat/database';

    import { get_appointment_from_database, get_month, delete_appointment_to_database} from './utils.js';

    const user_id = firebase.auth().currentUser.uid;
    let promise = get_appointment_from_database(user_id);

</script>

<ul class="list-group list-group-flush">
    {#await promise then appointments}
        {#each appointments as app, id}
            <div class="appointment">
                <li class="list-group-item">{app.day} {get_month(app.month)} {app.year}  {app.hour} : {app.purpose}
                    <button id={id} on:click={() => delete_appointment_to_database(user_id, app.year, app.month, app.day, app.hour)}>Supprimer</button>
                </li>
            </div>
        {/each}
    {/await}
</ul>


<style>
li{
    list-style: none;
}
</style>