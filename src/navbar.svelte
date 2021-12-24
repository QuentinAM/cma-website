<script>
    export let logged_in;

    export let open_accueil = () => console.log("opening accueil");
    export let open_appointement = () => console.log("opening appointement");
    export let open_account = () => console.log('opening account');
    export let open_login = () => console.log('opening login');
    export let logout = () => console.log('logging out');
</script>

<nav class="navbar">
    <a on:click={open_accueil} href='#' class="nav-item">Accueil</a>
    <a on:click={open_appointement} href='#' class="nav-item">Prendre rendez-vous</a>
    {#if logged_in}
        <a on:click={open_account} href='#' class="nav-item">Mon Compte</a>
        <a on:click={logout} href='#' class="nav-item">Se déconnecter</a>
    {:else}
        <a on:click={open_login} href='#' class="nav-item">Se connecter</a>
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

.navbar a:hover{
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

.navbar .nav-item a:hover{
    color: rgb(16, 16, 42);
    transition: 0.25s;
}

@media screen and (max-width: 490px) {
    .navbar .nav-item{
        display: none;
    }    
  }
</style>