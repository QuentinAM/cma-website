<script lang="ts">
    import ChatMessage from './chat_message.svelte';

    // Firebase import
    import firebase from 'firebase/compat/app';
    import 'firebase/auth';
    import 'firebase/firestore';

    export let conversation_id;

    let messages_rendered = [];

    const conversation_ref = firebase.firestore().collection('conversations').doc(conversation_id);
    const observer = conversation_ref.onSnapshot(snapshot => {
        // Get messages
        const messages = snapshot.data().messages;

        for (let message in messages)
        {
            // If message is not rendered
            if (!messages_rendered.includes(message))
            {
                //TODO:Render message

                // Add message to rendered messages
                messages_rendered.push(message);
            }
        }
        
    })

</script>

<style>

</style>