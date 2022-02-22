import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

export const hours = ['09h00', '10h00', '11h00', '12h00', '14h00', '15h00', '16h00', '17h00'];
export const number_of_appointments_per_day = 8;

function compute_month_and_day(month, day)
{
    if (day.toString().length == 1)
    {
        day = "0" + day;
    }

    if (month.toString().length == 1)
    {
        month = "0" + month;
    }

    return [month, day]
}

export function is_weekend(year, month, day)
{
    const date = new Date(year, month - 1, day);
    return date.getDay() == 5 || date.getDay() == 6;
}

export function is_in_the_past(year, month, day)
{
    var today = new Date();
    var date = new Date(year, month - 1, day);
    return date < today;
}

async function create_day(year, month, day, hour)
{
    // Compute the date
    const res = compute_month_and_day(month, day);
    month = res[0];
    day = res[1];

    // Check if the day is in the past
    if (is_in_the_past(year, month, day))
    {
        console.log(`The day ${day}/${month}/${year} is in the past.`);
        return;
    }

    // Create the day in the database
    await firebase.firestore().collection(`appointments`).add({
            year: year,
            month: month,
            day: day,
            hour: hour,
            taken: false,
            user_id: "",
            purpose: "",
            payment_id: ""
        }
        ,{merge : true}
    )
    .then(() => console.log(`Created day ${day}/${month}/${year}/${hour} in the database.`))
    .catch((error) => console.log(`Error creating day ${day}/${month}/${year} in the database: ${error}`));
}

export async function get_number_of_appointment_in_the_day(year, month, day)
{
    // Compute the date
    const res = compute_month_and_day(month, day);
    month = res[0];
    day = res[1];

    // Get the day from the database
    const year_ref = await firebase.firestore().collection(`appointments`).where("year", "==", year).where("month", "==", month).where("day", "==", day).get();
    
    if (year_ref.empty)
    {
        // Create day
        console.log(`The day ${day}/${month}/${year} does not exist in the database. \nCreating it...`);
        hours.forEach(async function(hour) {
            await create_day(year, month, day, hour)
        });
        return hours.length;
    }
    else
    {
        return year_ref.docs.length;
    }
}

export async function get_number_of_appointment_in_the_month(year, month)
{
    let appointments = [];
    const number_of_days = new Date(year, month, 0).getDate();

    // Compute the date
    const res = compute_month_and_day(month, 0);
    const month_formated = res[0];

    for (let day = 0; day < number_of_days; day++){
        appointments.push(-1);
    }
   
    const month_ref = await firebase.firestore().collection(`appointments`)
                            .where("year", "==", year)
                            .where("month", "==", month_formated).get();

    console.log(month_ref.docs);

    if (month_ref.docs.length == 0)
    {
        console.log('Creating month');
        await write_month_to_database(year, month_formated);
    }
    else
    {
        for (const doc of month_ref.docs)
        {
            const data = doc.data();
            console.log(data.day);
            if (!is_in_the_past(year, month, data.day))
            {
                if (appointments[data.day - 1] == -1)
                {
                    appointments[data.day - 1] = 0;
                }

                if (data.taken)
                {
                    appointments[data.day - 1]++;   
                }
            }
        }
    }
    return appointments;
}

export async function write_month_to_database(year, month)
{
    const number_of_days = new Date(year, month, 0).getDate();

    // Compute the date
    const res = compute_month_and_day(month, 0);
    const month_formated = res[0];

    for (let day = 0; day < number_of_days; day++){
        hours.forEach(async (hour) => { 
            await create_day(year, month_formated, day + 1, hour);
        });
    }
}

export async function write_appointment_to_database(user_id, purpose, year, month, day, hour)
{
    // COST : 1 read, 1 write, 2 update

    // Compute the date
    const res = compute_month_and_day(month, day);
    month = res[0];
    day = res[1];

    // Get the day from the database
    const appointment_ref = await firebase.firestore().collection(`appointments`)
                                .where("year", "==", year)
                                .where("month", "==", month)
                                .where("day", "==", day)
                                .where("hour", "==", hour).get();

    // Check for errors
    if (appointment_ref.docs.length > 1)
    {  
        console.log(`Error: More than one appointment in the database for ${day}/${month}/${year}/${hour}.`); 
    }

    // Create associated payment
    const payment_ref = await firebase.firestore().collection(`payments`).add({
        amount: -1,
        user_id: user_id,
        appointment_id: appointment_ref.docs[0].id
    });

    // Update the appointment
    await appointment_ref.docs[0].ref.set({
        taken: true,
        user_id: user_id,
        purpose: purpose,
        payment_id: payment_ref.id,
        payed: false
    }, {merge : true});
}

export async function get_appointment_from_database(user_id)
{
    let res = [];
   
    // Get the user's appointments from the database
    const appointments_ref = await firebase.firestore().collection(`appointments`)
                                    .where("user_id", "==", user_id).get();

    for (const doc of appointments_ref.docs)
    {
        const data = doc.data();
        res.push({
            year: data.year,
            month: data.month,
            day: data.day,
            hour: data.hour,
            purpose: data.purpose,
            associated_payment: data.associated_payment
        });
    }

    // Sort the appointments by date
    res.sort(function(a, b) {
        return new Date(a.year, a.month, a.day, a.hour) - new Date(b.year, b.month, b.day, b.hour);
    });

    return res;
}

export async function delete_appointment_to_database(user_id, year, month, day, hour)
{
    // COST : 1 update, 1 read, 1 delete
    console.log(`Deleting appointment for ${user_id} on ${day}/${month}/${year} ${hour}...`);

    // Compute the date
    const res = compute_month_and_day(month, day);
    month = res[0];
    day = res[1];

    // Delete appointment for the receiver
    const appointement_ref = await firebase.firestore().collection(`appointments`)
                                .where("year", "==", year)
                                .where("month", "==", month)
                                .where("day", "==", day)
                                .where("hour", "==", hour).get();

    // Get payment id
    const payment_id = appointement_ref.docs[0].data().payment_id;

    // Delete infos
    await appointement_ref.docs[0].ref.set({
        taken: false,
        user_id: "",
        purpose: "",
        payment_id: ""
    }, {merge : true});

    // Delete payment
    await firebase.firestore().collection(`payments`).doc(`${payment_id}`).delete();

    console.log(`Deleted appointment for ${user_id} on ${day}/${month}/${year} ${hour}.`)
}

export async function get_hour_available_in_the_day(year, month, day)
{
    // Compute the date
    const res = compute_month_and_day(month, day);
    month = res[0];
    day = res[1];

    let hour_available = [];
   
    // Fetch all the hour available in the day
    const day_ref = await firebase.firestore().collection(`appointments`)
                            .where("year", "==", year)
                            .where("month", "==", month)
                            .where("day", "==", day).get();

    for (const doc of day_ref.docs)
    {
        const data = doc.data();
        hour_available.push([data.hour, !data.taken]);
    }

    // Order list
    hour_available.sort((a, b) =>{
        return a[0].localeCompare(b[0]);
    });

    return hour_available;
}

export function book_appointment(year, month, day, hour, purpose)
{
    let user_id = firebase.auth().currentUser.uid;
    write_appointment_to_database(user_id, purpose, year, month, day, hour);
}

// Get month name
export function get_month(month)
{
    switch (month)
    {
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