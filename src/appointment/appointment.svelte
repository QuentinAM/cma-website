<script>
    // Functions
    import { get_hour_available_in_the_day, get_number_of_appointment_in_the_month, book_appointment, get_month, is_weekend, hours, number_of_appointments_per_day } from './utils.js';
    
    // Components
    import CustomInput from '../form/input.svelte';
    import CustomButton from '../button.svelte';

    // Lib imports
    import { notifier } from '@beyonk/svelte-notifications';

    // Shown day
    let shown_day = [];
    
    // Current month
    let whole_month = [];

    // Get current date information
    let date = new Date();
    let day_number = date.getDate();
    let day = get_day();
    let month = date.getMonth() + 1;
    let month_name = get_month(month);
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();

    // Selection variable
    let year_selected = 0;
    let month_selected = 0;
    let day_selected = 0;
    let hour_selected = 0;
    
    // Get day name
    function get_day()
    {
        switch (day_number)
        {
            case 0:
                return "Lundi";
            case 1:
                return "Mardi";
            case 2:
                return "Mercredi";
            case 3:
                return "Jeudi";
            case 4:
                return "Vendredi";
            case 5:
                return "Samedi";
            default:
                return "Dimanche";
        }
    }

    // Get number of day in a month
    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    let actual_month = [];
    let previous_month = [];
    let next_month = [];

    function to_next_month()
    {
        month++;
        if (month > 12)
        {
            month = 1;
            year++;
        }
        month_name = get_month(month);
        
        promise = update_ui();
    }

    function to_previous_month()
    {
        month--;
        if (month == 0)
        {
            month = 12;
            year--;
        }
        month_name = get_month(month);

        promise = update_ui();
    }

    async function update_ui()
    {
        // Get the first day of the next month
        let first_day = new Date(year, month - 1, 1);
        let first_day_number = first_day.getDay();

        // Get the number of days in both month
        let number_of_day_previous_month = daysInMonth(month - 1 <= 0 ? 12 : month - 1, year);
        let number_of_day_actual_month = daysInMonth(month, year);

        console.log("number_of_day_previous_month (" + (month - 1 <= 0 ? 12 : month - 1) + ") " + number_of_day_previous_month);
        console.log("number_of_day_actual_month (" + month + ") " +number_of_day_actual_month);

        // Reset both months
        actual_month = [];
        previous_month = [];
        next_month = [];

        // Fill the previous month
        for (let i = 0; i < first_day_number - 1; i++)
        {
            previous_month.push(number_of_day_previous_month - first_day_number + i + 2);
        }
    
        // Fill the actual month
        for (let i = 0; i < number_of_day_actual_month; i++)
        {
            actual_month.push(i + 1);
        }

        // Fill the next month
        for (let i = 0; i < 35 - number_of_day_actual_month - previous_month.length; i++)
        {
            next_month.push(i + 1);
        }

        // Update the shown month
        whole_month = await get_number_of_appointment_in_the_month(year, month);
        console.log("Whole month: " + whole_month);
        return whole_month;
    }

    async function show_day(year, month, day)
    {
        var res = await get_hour_available_in_the_day(year, month, day);
        console.log("Got these hour " + res + " for " + year + "-" + month + "-" + day);
        shown_day = res;

        // Update selection variable
        year_selected = year;
        month_selected = month;
        day_selected = day;
        hour_selected = 0;
    }

    function select_hour(hour)
    {
        hour_selected = hour;
    }

    function confirm_appointment()
    {
        book_appointment(year_selected, month_selected, day_selected, hour_selected, purpose);
        notifier.success("Rendez-vous confirmé pour le " + day_selected + "/" + month_selected + "/" + year_selected + " à " + hour_selected + "h");
        whole_month[day_selected - 1]--;
        whole_month = whole_month;
    }

    // Create promise to be awaited
    var promise = update_ui();
    let purpose = "";

    // Listen for changes in the database
    // firebase.firestore().collection(`appointments/${year}/${month}`)
    //     .onSnapshot((querySnapshot) => {
    //         var new_date = [];
    //         querySnapshot.forEach((doc) => {
    //             var hour_in_the_day = 0;
                
    //             if (is_in_the_past(year, month, doc.id))
    //             {
    //                 new_date.push(-1);
    //             }
    //             else{
    //                 for (let hour in hours)
    //                 {
    //                     if (doc.data().hour.purpose == "" && doc.data().hour.purpose == "user_id")
    //                     hour_in_the_day++;
    //                 }   
    //             }
    //         });
    //         whole_month = new_date;
    // });

</script>

<page>
    <main class="card">
        <section class="card__header">
        <button on:click={to_previous_month}></button>
        <h3>{day} {day_number}</h3>
        <h3>{hour}:{minute}</h3>
        <h3>{month_name} {year}</h3>
        <button on:click={to_next_month}></button>
        </section>
        <section class="card__body">
        <ul class="card__body--days">
            <li>LUN</li>
            <li>MAR</li>
            <li>MER</li>
            <li>JEU</li>
            <li>VEN</li>
            <li>SAM</li>
            <li>DIM</li>
        </ul>
        <ul class="card__body--dates">
            {#each previous_month as day}
                <li class="prev">{day}</li>
            {/each}
            
            
            {#await promise then whole_month}
                {#each actual_month as day}
                    {#if is_weekend(year, month, day - 1)}
                        <li class="prev">{day}</li>
                    {:else}
                        <li on:click={() => show_day(year, month, day)} class="circle active">{day}
                            {#if whole_month[day - 1] != -1}
                                <span>{number_of_appointments_per_day - whole_month[day - 1]}</span>
                            {/if}
                        </li>
                    {/if}
                {/each}
            {/await}
            
            {#each next_month as day}
                <li class="next">{day}</li>
            {/each}
        </ul>
        </section>
    </main>

    <selection>
        {#if shown_day.length != 0}
            {#each shown_day as day}
                {#if day[1]}
                    <li class="available" on:click={() => select_hour(day[0])}>{day[0]}</li>
                {:else}
                    <li class="not_available">{day[0]}</li>
                {/if}
            {/each}
        {:else}
            <li>Cliquer sur un jour pour voir les détails</li>
        {/if}
        {#if hour_selected != 0}
        <appointment_details>
            <CustomInput placeholder="Sujet du rendez-vous"
                        type="text"
                        id=""
                        isError={purpose == ""}
                        error_message="Précisez le sujet du rendez-vous"
                        bind:content={purpose}
            />
            <CustomButton name = "Envoyer"
                        on:click={confirm_appointment}
            />

        </appointment_details>
    {/if}
    </selection>
</page>

<style>
li{
    list-style: none;
}
ul {
    list-style: none;
}

button{
    size: 50px;
    color: black;
    border: 2px solid black;
}

.card {
    background: white;
    width: 90%;
    max-width: 40rem;
    min-height: 40rem;
    margin: 5rem auto;
    display: grid;
    grid-template-rows: 8rem auto 10rem;
    box-shadow: 0 1rem 2.5rem rgb(27, 64, 94);
}
.card .card__header {
        padding: 0 1.25rem;
        color: gray;
        display: flex;
        justify-content: space-between;
        align-items: center;
}

.card .card__body{
    padding: 1.5rem 2rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

.card .card__body .card__body--days{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;          
}
.card .card__body .card__body--days li{
    flex: 1;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    color: gray;
    margin: 0 1px;
}

.card .card__body .card__body--dates{
    display: grid;
    gap: 3px;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    text-align: center;
}

.card .card__body .card__body--dates li{
    width: 3.5rem;
    height: 3.5rem;
    display: grid;
    place-items: center;
    font-weight: bold;
    position: relative;
    transition: all 0.3s ease-in-out;
}

.card .card__body .card__body--dates li.prev{
    color: #ccc;
}

.card .card__body .card__body--dates li.next{
    color: #ccc;
}

/* .card .card__body .card__body--dates li.active{
    background: orange;
    color: white;
    border-radius: 15px;
} */

.card .card__body .card__body--dates li.circle{
    border: 2px solid;
    border-radius: 15px;
}

.card .card__body .card__body--dates li.circle span{
    position: absolute;
    top: -0.75rem;
    right: -0.5rem;
    width: 1.75rem;
    height: 1.75rem;
    font-size: 1.2rem;
    color: black;
    border-radius: 15px;
    background-color: orange;
}

.card .card__body .card__body--dates li:hover.active{
    cursor: pointer;
    background: orange;
    border: 2px solid orange;
    border-radius: 15px;
}

.card .card__body .card__body--dates li:active{
    border-radius: 15px;
    transform: scale(0.98);
}

/* .card .card__footer{
    color: black;
    font-weight: bold;
    text-decoration: none;
    color: inherit;
    width: 3.5rem;
    height: 3.5rem;
    padding-top: 0.25rem;
    display: grid;
    place-items: center;
} */


selection{
    width: 100%;
    border: 2px solid black;
}

selection li{
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    margin: 15px;
}

selection li.available:hover{
    cursor: pointer;
    background: orange;
    border: 2px solid orange;
    border-radius: 15px;
}

selection li.not_available{
    color: rgba(75, 75, 75, 0.411);
}

appointment_details
{
    width: 100%;
}

@media screen and (max-width: 600px) {
    main{
        width: 100%;
    }
    selection{
        margin: 0px 0px 0px 0px;
        top: 0px;
        width: 100%;
    }
    .card .card__body .card__body--dates li{
        width: 2rem;
        height: 2rem;
    }

    .card .card__body .card__body--dates li.circle span
    {
        width: 0.75rem;
        height: 0.75rem;
        font-size: 0.75rem;
    }

}

</style>