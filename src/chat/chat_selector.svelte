<script>
    import { get_all_conversations } from "./chat_utils.js";

    import ChatRoom from "./chat_room.svelte";

    // Firebase import
    import firebase from 'firebase/compat/app';
    import 'firebase/auth';

    // Boolean saying if cnoversation are rendered
    let is_rendered = false;

    let promise = get_all_conversations(firebase.auth().currentUser.uid);;
    let opened_id = null;

    function open_conversation_list()
    {
        is_rendered = !is_rendered;
    }

    function open_conversation(conversation_id)
    {
      opened_id = conversation_id;
    }

</script>

{#await promise then conversation_list}
    {#each conversation_list as conversation}
        <button on:click={() => open_conversation(conversation.id)}></button>
    {/each}
{/await}

{#if opened_id != null}
    <ChatRoom conversation_id={opened_id}/>
{/if}

<button class="main_button" on:click={() => open_conversation_list()}></button>

<style>

button{
  background-color: #3612ad;
  border: none;
  color: white;
  padding: 20px;
}

.main_button {
  background-color: #04AA6D;
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  position: fixed;
}

</style>