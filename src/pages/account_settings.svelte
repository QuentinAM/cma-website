<script>
    export let name;
    export let content;
    
    let is_editing = false;

    function edit()
    {
        if (is_editing)
        {
            is_editing = false;
            return;
        }
        else
        {
            is_editing = true;
        }
    }

</script>

<div class="settings">
    <h2>{name}</h2>
    <div class="content">
        <input placeholder={name} value={content} disable={!is_editing}>
        {#if is_editing}
            <button class="edit_button" on:click={edit}>Sauvegarder</button>
        {:else}
            <button class="edit_button" on:click={edit}>Modifier</button>
        {/if}
    </div>
</div>
<style>
    .settings{
        margin: 1 auto;
    }

    .content button{
        position: relative;;
        width: 10%;
        height: 100%;
        border: 3px solid green;
    }
</style>