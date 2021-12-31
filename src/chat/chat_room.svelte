<script lang="ts">
    import ChatMessage from './chat_message.svelte';

    import { send_message } from './chat_utils.js';


    // Firebase import
    import firebase from 'firebase/compat/app';
    import 'firebase/auth';
    import 'firebase/firestore';

    export let conversation_id;

    // Messages variables
    let messages_rendered = [];
    let content_typed = "";

    const uid = firebase.auth().currentUser.uid;
    const conversation_ref = firebase.firestore().collection('conversations').doc(conversation_id);
    const observer = conversation_ref.onSnapshot(snapshot => {
        // Get messages
        const messages = snapshot.data().messages;

        for (let message in messages)
        {
            // If message is not rendered
            if (!messages_rendered.includes(messages[message]))
            {
                //TODO:Render message
                console.log('New message :', 'at ' + message, messages[message].text);

                // Add message to rendered messages
                messages_rendered = [...messages_rendered, messages[message]];
                console.log(messages_rendered);
            }
        }
    });

</script>

<main>
    {#each messages_rendered as message}
        <ChatMessage message_class={message.sender == uid ? 'sent' : 'received'} 
                     message_text={message.text}
                     message_date={message}
                     author={message.sender}
                     photo_url={message.photo_url}
        />
    {/each}
</main>

<form>
    <input type="text" name="message" placeholder="Type a message..." bind:value={content_typed}/>
    <button type="button" on:click={() => send_message(content_typed, "", conversation_ref)}>Send</button>
</form>

<style>
main {
  padding: 10px;
  height: 80vh;
  margin: 10vh 0 10vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

main::-webkit-scrollbar {
  width: 0.25rem;
}

main::-webkit-scrollbar-track {
  background: #1e1e24;
}

main::-webkit-scrollbar-thumb {
  background: #6649b8;
}

form {
  height: 10vh;
  position: fixed;
  bottom: 0;
  background-color: rgb(24, 23, 23);
  width: 100%;
  max-width: 728px;
  display: flex;
  font-size: 1.5rem;
}

form button {
  width: 20%;
  background-color: rgb(56, 56, 143);
}

input {
  line-height: 1.5;
  width: 100%;
  font-size: 1.5rem;
  background: rgb(58, 58, 58);
  color: white;
  outline: none;
  border: none;
  padding: 0 10px;
}

button {
  background-color: #282c34; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 1.25rem;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


</style>