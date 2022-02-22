import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

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

export async function get_appointments_of_day(year, month, day)
{
    // Compute the date
    const res = compute_month_and_day(month, day);
    month = res[0];
    day = res[1];

    const day_ref = await firebase.firestore().collection('appointments')
                            .where('year', '==', year)
                            .where('month', '==', month)
                            .where('day', '==', day)
                            .get();
    
}