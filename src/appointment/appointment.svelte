<script>
    import firebase from 'firebase/compat/app';

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
        if (month == 13)
        {
            month = 1;
            year++;
        }
        month_name = get_month();
        
        update_ui();
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

        update_ui();
    }

    function update_ui()
    {
        // Get the first day of the next month
        let first_day = new Date(year, month - 1 == 0 ? 12 : month - 1, 1);
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
    }
    update_ui();

    function get_number_of_appointment_in_the_day(year, month, day)
    {
        let number_of_appointment = 0;
        let appointments = firebase.database().ref(`appointment/${year}/${month}/${day}`);
        appointments.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                number_of_appointment++;
            });
        });
        return number_of_appointment;
    }

    function write_appointment_to_database(user_id, purpose, year, month, day, hour) {
        // Write appointment for the user
        firebase.database().ref(`users/${user_id}/appointments/${year}-${month}${day}-${hour}`).set({
            purpose: purpose
        });

        // Write appointment for the receiver
        firebase.database().ref(`appointment/${year}/${month}/${day}/${hour}`).set({
            user_id: user_id,
            purpose: purpose
        });
    }

    function delete_appointment_to_database(user_id, year, month, day, hour) {
        // Delete appointment for the user
        firebase.database().ref(`users/${user_id}/appointments/${year}-${month}${day}-${hour}`).remove();

        // Delete appointment for the receiver
        firebase.database().ref(`appointment/${year}/${month}/${day}/${hour}`).remove();
    }

</script>

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
        
        {#each actual_month as day}
        <li>{day}</li>
        {/each}
        
        {#each next_month as day}
        <li class="next">{day}</li>
        {/each}
      </ul>
    </section>
    <div class="card__footer">
      
    </div>
  </main>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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

.card .card__body .card__body--dates li.active{
    background: orange;
    color: white;
    border-radius: 15px;
}

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
}

.card .card__body .card__body--dates li:hover{
    cursor: pointer;
    background: orange;
    border: 2px solid orange;
    border-radius: 15px;
}

.card .card__body .card__body--dates li:active{
    border-radius: 15px;
    transform: scale(0.98);
}

.card .card__footer{
    color: black;
    font-weight: bold;
    text-decoration: none;
    color: inherit;
    width: 3.5rem;
    height: 3.5rem;
    padding-top: 0.25rem;
    display: grid;
    place-items: center;
}

</style>