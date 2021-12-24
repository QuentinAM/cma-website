<script>
    export let logged_in;

    export let open_accueil;
    export let open_appointement;
    export let open_account;
    export let open_login;
    export let logout;
</script>

<nav class="navbar">
    <button on:click={open_accueil()} class="nav-item">Accueil</button>
    <button on:click={open_appointement()} class="nav-item">Prendre rendez-vous</button>
    {#if logged_in}
        <button on:click={open_account()} class="nav-item">Mon Compte</button>
        <button on:click={logout()} class="nav-item">Se déconnecter</button>
    {:else}
        <button on:click={open_login()} class="nav-item">Se connecter</button>
    {/if}
</nav>

<style>
    .navbar{
    background-color: rgb(38, 38, 47);
    color: #fff;
    display:flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    width:100%
}

.navbar button{
    background-color: transparent;
    border: none;
    color: #fff;
    padding: 10px;
    cursor: pointer;
}

.navbar button:hover{
    color: rgb(14, 135, 165);
    transition: all 0.4s;
}

.navbar .nav-item {
    list-style: none;
    display: inline-block;
    padding: 10px 10px;
    color: #fff;
    text-decoration: none;
}

.navbar .nav-item button:hover{
    color: rgb(16, 16, 42);
    transition: 0.25s;
}

@media screen and (max-width: 490px) {
    .navbar .nav-item{
        display: none;
    }    
  }
</style>