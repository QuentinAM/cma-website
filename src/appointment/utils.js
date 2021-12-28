import firebase from 'firebase/compat/app';
import 'firebase/compat/database'

const number_of_appointments_per_day = 8;

export function is_in_the_past(year, month, day)
{
    var today = new Date();
    var date = new Date(year, month - 1, day);
    return date < today;
}

function create_day(year, month, day)
{
    // Check if the day is in the past
    if (is_in_the_past(year, month, day))
    {
        console.log(`The day ${day}/${month}/${year} is in the past.`);
        return;
    }

    firebase.database().ref(`appointments/${year}/${month}/${day}`)
                            .set({
                                "09": "",
                                "10": "",
                                "11": "",
                                "12": "",
                                "14": "",
                                "15": "",
                                "16": "",
                                "17": "",
                            });
}

export async function get_number_of_appointment_in_the_day(year, month, day)
{
    let number_of_appointment = 0;
    let appointments = firebase.database().ref(`appointments/${year}/${month}/${day}`);

    await appointments.once('value', function(snapshot) {
        // Check if the day exists
        if (snapshot.exists())
        {
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val() != "")
                {
                    number_of_appointment++;
                }
            });
        }
        else
        {
            console.log(`The day ${day}/${month}/${year} doesn't exist.`);
            // Create the day
            create_day(year, month, day);
            return number_of_appointments_per_day;
        }
    });
    return number_of_appointment;
}

export function write_appointment_to_database(user_id, purpose, year, month, day, hour) {
    // Write appointment for the user
    firebase.database().ref(`users/${user_id}/appointments/${year}-${month}-${day}-${hour}`).set({
        purpose: purpose
    });

    // Write appointment for the receiver
    firebase.database().ref(`appointments/${year}/${month}/${day}/${hour}`).set({
        user_id: user_id,
        purpose: purpose
    });
}

export async function get_appointment_from_database(user_id)
{
    let res = [];
    let appointments = firebase.database().ref(`users/${user_id}/appointments`);

    await appointments.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            res.push([childSnapshot.key, childSnapshot.val().purpose]);
        });
    });
    return res;
}

export function delete_appointment_to_database(user_id, year, month, day, hour) {
    // Delete appointment for the user
    firebase.database().ref(`users/${user_id}/appointments/${year}-${month}-${day}-${hour}`).remove();

    // Delete appointment for the receiver
    firebase.database().ref(`appointments/${year}/${month}/${day}/${hour}`).remove();
}

export async function get_hour_available_in_the_day(year, month, day)
{
    let hour_available = [];
    let appointments = firebase.database().ref(`appointments/${year}/${month}/${day}`);
   
    await appointments.once('value', function(snapshot) {
        // Check if the day exist in the database
        if (snapshot.exists())
        {
            snapshot.forEach(function(childSnapshot) {
                hour_available.push([childSnapshot.key, childSnapshot.val() == ""]);
            });
        }
        else
        {
            console.log('Dont exist');
            // Create the day
            create_day(year, month, day);

            return [["09", true], ["10", true], ["11", true], ["12", true], ["14", true], ["15", true], ["16", true], ["17", true]];
        }
    });
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