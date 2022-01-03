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

<div class="chat_container">
  {#if is_rendered}
    <ul class="list-group">
    {#await promise then conversation_list}
        {#each conversation_list as conversation}
          <button type="button" on:click={() => open_conversation(conversation.id)} class="list-group-item list-group-item-action flex-column align-items-start">
              {#each {length: conversation.data.participants.length - 1} as _, i}
                {`${conversation.data.participants_name[conversation.data.participants[i]]}, `}
              {/each}
              {`${conversation.data.participants_name[conversation.data.participants[conversation.data.participants.length - 1]]}`}
              <span class="badge badge-primary badge-pill">14</span>
          </button>
        
        {/each}
    {/await}
    </ul>

    {#if opened_id != null}
      <ChatRoom conversation_id={opened_id}/>
    {:else}

    {/if}

  {/if}

  <button type="button" class="main_button" on:click={() => open_conversation_list()}></button>
</div>

<style>
.chat_container{
  background: black;
  border: 1px solid black;
  position: fixed;
  display: flex;
  bottom: 30px;
  right: 30px;
}
button{
  background-color: #3612ad;
  border: 2px solid black;
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
  bottom: 10px;
  right: 10px; 
}

</style>