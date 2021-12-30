// Firebase import
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';

// Conversations document
// - participants: Array
// - messages: map (createdAt: timestamp, text: string, sender: string)

// Returns a promise that resolves to a conversation document
export async function create_conversation(participants: Array<any>)
{
    // Create a new conversation
    const conversations_ref: DocumentData = firebase.firestore().collection('conversations');

    // Create the document
    const conversation = await conversations_ref.add({
        participants: participants
    });

    return conversation.id;
}

export async function send_message(content: string, conversations_ref: DocumentData)
{
    // Get the current user
    const user_id = firebase.auth().currentUser.uid;

    // Add the message to the conversation
    await conversations_ref.set({
        messages: {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            text: content,
            sender: user_id,
        }
    }, { merge: true });
}