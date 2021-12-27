<script>
    import { get_hour_available_in_the_day, get_number_of_appointment_in_the_day, is_in_the_past } from './utils.js';

    // Global variables
    const number_of_appointments_per_day = 8;

    // Shown day
    let shown_day = [];
    
    // Current month
    let whole_month = [];

    // Get current date information
    let date = new Date();
    let day_number = date.getDate();
    let day = get_day();
    let month = date.getMonth() + 1;
    let month_name = get_month();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    
    // Get day name
    function get_day(){
        switch (day_number) {
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

    // Get month name
    function get_month(){
        console.log(month);
        switch (month) {
            case 1:
                return "Janvier";
            case 2:
                return "Février";
            case 3:
                return "Mars";
            case 4:
                return "Avril";
            case 5:
                return "Mai";
            case 6:
                return "Juin";
            case 7:
                return "Juillet";
            case 8:
                return "Août";
            case 9:
                return "Septembre";
            case 10:
                return "Octobre";
            case 11:
                return "Novembre";
            default:
                return "Décembre";
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
        month_name = get_month();
        
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
        month_name = get_month();

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
        console.log(previous_month);
    
        // Fill the actual month
        for (let i = 0; i < number_of_day_actual_month; i++)
        {
            actual_month.push(i + 1);
        }
        console.log(actual_month);

        // Fill the next month
        for (let i = 0; i < 35 - number_of_day_actual_month - previous_month.length; i++)
        {
            next_month.push(i + 1);
        }
        console.log(next_month);

        // Update the shown month
        whole_month = [-1];
        for (let i = 0; i < actual_month.length; i++)
        {
            console.log("New day : " + (i + 1));
            if (is_in_the_past(year, month, i + 1))
            {
                whole_month.push(-1);
            }
            else
            {
                var result = await get_number_of_appointment_in_the_day(year, month, i + 1);
                console.log("n : " + result);
                whole_month.push(number_of_appointments_per_day - result);
            }
        }
        console.log(whole_month);
        return whole_month;
    }

    async function show_day(year, month, day)
    {
        var res = await get_hour_available_in_the_day(year, month, day);
        console.log("res " + res);
        shown_day = res;
    }

    // Create promise to be awaited
    var promise = update_ui();
 
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
                    <li on:click={show_day(year, month, day)} class="circle active">{day}
                        {#if whole_month[day] != -1}
                            <span>{whole_month[day]}</span>
                        {/if}
                    </li>
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
                    <li class="available">{day[0]}h00</li>
                {:else}
                    <li class="not_available">{day[0]}h00</li>
                {/if}
            {/each}
        {:else}
            <li>Cliquer sur un jour pour voir les détails</li>
        {/if}
    </selection>
</page>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

main{
    float: left;
    width: 50%;
}

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
    border: 2px solid black;
    margin: 0;
    position: absolute;
    top: 50%;
    width: 25%;
}

selection li{
    flex: 1;
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

</style>