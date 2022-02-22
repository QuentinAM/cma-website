<script>
    // Content displayed on button
    export let name;
</script>

<button on:click>{name}</button>

<style>
button{
    width: 100%;
    padding: 1rem 2rem;
    font-weight: bold;
    font-size: 1.1rem;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    background: #068a83;
    transition: 0.2s;
}

button:hover{
    background: #064d52;
}

button:not(:hover){
    background: #068a83;
}

button:active{
    transform: scale(0.98);
}

</style>