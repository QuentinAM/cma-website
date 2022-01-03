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
    let messages_dates = [];

    let content_typed = "";

    function sort_messages()
    {
        messages_rendered.sort(function(a, b) {
            return messages_dates[b] - messages_dates[a];
        });
    }


    const uid = firebase.auth().currentUser.uid;
    const conversation_ref = firebase.firestore().collection('conversations').doc(conversation_id);
    const observer = conversation_ref.onSnapshot(snapshot => {
        // Get messages
        const messages = snapshot.data().messages;

        for (let message in messages)
        {
            // If message is not rendered
            if (!messages_dates.includes(message))
            {
                //TODO:Render message
                console.log('New message :', 'at ' + message, messages[message].text);

                // Add message to rendered messages
                messages_rendered.push(messages[message]);
                messages_dates.push(message);

                sort_messages();
                messages_rendered =  messages_rendered;
                console.log(messages_dates);
                console.log(messages_rendered);
            }
        }
    });

</script>

<main>
    {#each messages_rendered as message, i}
        <ChatMessage message_class={message.sender == uid ? 'sent' : 'received'} 
                     message_text={message.text}
                     message_date={messages_dates[i]}
                     author={message.sender}
                     photo_url={message.photo_url}
        />
    {/each}
</main>

<form>
  <input type="text" name="message" placeholder="Type a message..." bind:value={content_typed}/>
  <button type="button" on:click={() => {send_message(content_typed, "", conversation_ref); content_typed = "";}}>Send</button>
</form>

<style>
main {
  padding: 10px;
  height: 70vh;
  margin: 1vh 0 9.5vh;
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
  height: 9vh;
  position: fixed;
  bottom: 30px;
  max-width: 720px;
  display: flex;
  font-size: 1.5rem;
}


input {
  border-radius: 10% 0% 0% 10%;
  line-height: 1.5;
  font-size: 1.5rem;
  background: rgb(58, 58, 58);
  color: white;
  outline: none;
  border: none;
  padding: 0 10px;
}

form button {
  border-radius: 0% 10% 10% 0%;
  background-color: #282c34;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.25rem;
}

form button:hover {
  background-color: #6649b8;
  color: black;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:active{
  scale: transform(0.99);
}

</style>