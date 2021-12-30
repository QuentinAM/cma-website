// Firebase import
import firebase from 'firebase/compat/app';
import 'firebase/firestore';

// Conversations document
// - participants: Array
// - messages: map (createdAt: timestamp, text: string, sender: string)

// Returns a promise that resolves to a conversation document
export async function create_conversation(participants)
{
    // Create a new conversation
    const conversations_ref = firebase.firestore().collection('conversations');

    // Create the document
    const conversation = await conversations_ref.add({
        participants: participants
    });

    return conversation.id;
}

export async function send_message(content, photo_url, conversations_ref)
{
    // Get the current user
    const user_id = firebase.auth().currentUser.uid;

    // Create a string date with day/month/year/hour/minute/second format
    const date = new Date();
    const date_string = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    // Add the message to the conversation
    await conversations_ref.set({
        messages: {
            [`${date_string}`]: {
                text: content,
                sender: user_id,
                photo_url: photo_url
            }
        }
    }, { merge: true });
}

export async function get_all_conversations(user_id)
{
    let my_conversations = [];

    // Get the conversations
    await firebase.firestore().collection('conversations').where('participants', 'array-contains', user_id).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, ' => ', doc.data());
            my_conversations.push({
                id : doc.id, 
                data : doc.data()}
            );
        });
    });

    console.log(my_conversations);
    return my_conversations;
}