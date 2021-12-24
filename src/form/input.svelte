<script>
    // Id
    export let id;

    // Password or normal text
    export let type;
    const setType = (node) => {
        node.type = type;
    };

    // Username/email or password
    export let placeholder;

    // Error message
    export let error_message;

    // Is error
    export let isError;

    // Content
    export let content;
</script>

{#if isError}
    <input class="form__input form__input--error" {id} placeholder={placeholder} use:setType bind:value={content}>
    <div class="form__input-error-message">{error_message}</div>
{:else}
    <input class="form__input" {id} placeholder={placeholder} use:setType bind:value={content}>
    <div class="form__input-error-message"></div>
{/if}

<style>
    .form__input{
        display: block;
        width: 100%;
        padding: 0.75rem;
        box-sizing: border-box;
        border: 1px solid #dddddd;
        border-radius: 4px;
        outline: none;
        background: #eeeeee;
        transition: background 0.2s, border-color 0.2s;
    }

    .form__input:focus{
        border-color: #068a83;
        background: #ffffff;
    }

    .form__input--error{
        border-color: #ff0000;
    }

    .form__input-error-message{
        margin-top: 0.5rem;
        font-size: 0.85rem;
        color: #ff0000;
    }
</style>

