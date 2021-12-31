import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

export const hours = ['09h00', '10h00', '11h00', '12h00', '14h00', '15h00', '16h00', '17h00'];
const number_of_appointments_per_day = 8;

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

async function create_day(year, month, day)
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

    var data = {
        "09h00": {
            purpose: "",
            user_id: "",
        },
        "10h00": {
            purpose: "",
            user_id: "",
        },
        "11h00": {
            purpose: "",
            user_id: "",
        },
        "12h00": {
            purpose: "",
            user_id: "",
        },
        "14h00": {
            purpose: "",
            user_id: "",
        },
        "15h00": {
            purpose: "",
            user_id: "",
        },
        "16h00": {
            purpose: "",
            user_id: "",
        },
        "17h00": {
            purpose: "",
            user_id: "",
        }
    };

    // Create the day in the database
    await firebase.firestore().collection(`appointments`).doc(`${year}`).set({
           [`${month}`] : {
                [`${day}`] : data
           }
        }
        ,{merge : true}
    )
    .then(() => console.log(`Created day ${day}/${month}/${year} in the database.`))
    .catch((error) => console.log(`Error creating day ${day}/${month}/${year} in the database: ${error}`));
}

export async function get_number_of_appointment_in_the_day(year, month, day)
{
    // Compute the date
    const res = compute_month_and_day(month, day);
    month = res[0];
    day = res[1];

    let number_of_appointment = 0;
    // Get the day from the database
    let year_ref = firebase.firestore().collection(`appointments`).doc(`${year}`);
    await year_ref.get()
        .then((doc) =>
        {   
            if (doc.exists)
            {
                // Check if month exists
                let day_map = doc.data()[`${month}`];
                if (day_map == undefined)
                {
                    console.log(`Day ${day}/${month}/${year} does not exist in the database.`);
                    create_day(year, month, day);
                    return 0;
                }

                // Check if day exists
                day_map = doc.data()[`${month}`][`${day}`];
                if (day_map == undefined)
                {
                    console.log(`Day ${day}/${month}/${year} does not exist in the database.`);
                    create_day(year, month, day);
                    return 0;
                }

                // Check all sub map
                for (let key in day_map)
                {
                    if (day_map[key].purpose != "" && day_map[key].user_id != "")
                    {
                        number_of_appointment++;
                    }
                }
            }
            else
            {
                console.log(`Day ${day}/${month}/${year} does not exist in the database.`);
                create_day(year, month, day);
                return 0;
            }
        })
        .catch((error) => console.log(`Error getting day ${day}/${month}/${year} from the database: ${error}`));
    return number_of_appointment;
}

export function write_appointment_to_database(user_id, purpose, year, month, day, hour)
{
    // Compute the date
    const res = compute_month_and_day(month, day);
    month = res[0];
    day = res[1];

    // Add the appointment to the user's appointments list
    firebase.firestore().collection(`users`).doc(`${user_id}`).set({
      appointments : {
          [`${year}`]: {
                [`${month}`]: {
                    [`${day}`]: {
                        [`${hour}`]: {
                            purpose: purpose,
                            associated_payment: "",
                        }
                    }
                }
           }
      }  
    }, {merge : true})
    .then(() => console.log(`Added appointment for ${user_id} on ${day}/${month}/${year} ${hour}.`))
    .catch((error) => console.log(`Error adding appointment for ${user_id} on ${day}/${month}/${year} ${hour}: ${error}`));

    // Write appointment for the receiver
    firebase.firestore().collection(`appointments`).doc(`${year}`).set({
        [`${month}`]: {
            [`${day}`]: {
                [`${hour}`]: {
                    purpose: purpose,
                    user_id: user_id,
                    associated_payment: "",
                }
            }
        }
    }, {merge : true})
    .then(() => console.log(`Wrote appointment for ${user_id} to the database.`))
    .catch((error) => console.log(`Error writing appointment for ${user_id} to the database: ${error}`));
}

export async function get_appointment_from_database(user_id)
{
    let res = [];
    await firebase.firestore().collection(`users`).doc(`${user_id}`).get()
    .then((doc) =>{
        if (doc.exists)
        {
            let appointments = doc.data().appointments;

            // Check all sub map year
            for (let year in appointments)
            {
                // Check all sub map month
                for (let month in appointments[year])
                {
                    // Check all sub map day
                    for (let day in appointments[year][month])
                    {
                        // Check all sub map hour
                        for (let hour in appointments[year][month][day])
                        {
                            res.push({
                                year: year,
                                month: month,
                                day: day,
                                hour: hour,
                                purpose: appointments[year][month][day][hour].purpose,
                                associated_payment: appointments[year][month][day][hour].associated_payment,
                            });
                        }
                    }
                }
            }
        }
        else
        {
            console.log(`User ${user_id} does not exist in the database.`);
        }
    })
    .catch((error) => console.log(`Error getting user ${user_id} from the database: ${error}`));

    return res;
}

export function delete_appointment_to_database(user_id, year, month, day, hour)
{
    // Compute the date
    const res = compute_month_and_day(month, day);
    month = res[0];
    day = res[1];

    // Delete appointment for the user
    firebase.firestore().collection(`users`).doc(`${user_id}`).set({
        appointments : {
            [`${year}`]: {
                [`${month}`]: {
                    [`${day}`]: {
                        [`${hour}`]: firebase.firestore.FieldValue.delete()
                    }
                }
            }
        }
    }, {merge : true})
    .then(() => console.log(`Deleted appointment for ${user_id} on ${day}/${month}/${year} ${hour}.`))
    .catch((error) => console.log(`Error deleting appointment for ${user_id} on ${day}/${month}/${year} ${hour}: ${error}`));

    // Delete appointment for the receiver
    firebase.firestore().collection(`appointments`).doc(`${year}`).set({
        [`${month}`]: {
            [`${day}`]: {	
                [`${hour}`]: {
                    purpose: "",
                    user_id: "",
                }
            }
        }
    }, {merge : true})
    .then(() => console.log(`Deleted appointment for ${user_id} to the database.`))
    .catch((error) => console.log(`Error deleting appointment for ${user_id} to the database: ${error}`));
}

export async function get_hour_available_in_the_day(year, month, day)
{
    // Compute the date
    const res = compute_month_and_day(month, day);
    month = res[0];
    day = res[1];

    let hour_available = [];

    // Get the day from the database
    let year_ref = firebase.firestore().collection(`appointments`).doc(`${year}`);
   
    // Fetch all the hour available in the day
    await year_ref.get().then((doc) =>
    {
        if (doc.exists)
        {
            // Get the day in the map
            let day_map = doc.data()[`${month}`][`${day}`];

            if (day_map == undefined)
            {
                console.log(`Day ${day}/${month}/${year} does not exist in the database.`);
                create_day(year, month, day);
                return [["09", true], ["10", true], ["11", true], ["12", true], ["14", true], ["15", true], ["16", true], ["17", true]];
            }

            // Check all sub map
            for (let key in day_map)
            {
                hour_available.push([key, day_map[key].purpose == "" && day_map[key].user_id == ""]);
            }
            hour_available.sort();
        }
        else
        {
            console.log(`Day ${day}/${month}/${year} does not exist in the database.`);
            create_day(year, month, day);
            return [["09", true], ["10", true], ["11", true], ["12", true], ["14", true], ["15", true], ["16", true], ["17", true]];
        }
    }).catch((error) => console.log(`Error getting day ${day}/${month}/${year} from the database: ${error}`));

    return hour_available;
}

export function book_appointment(year, month, day, hour, purpose)
{
    let user_id = firebase.auth().currentUser.uid;
    write_appointment_to_database(user_id, purpose, year, month, day, hour);
}

// Get month name
export function get_month(month){
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