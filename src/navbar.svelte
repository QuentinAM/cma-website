<script>
    export let logged_in;

    export let open_accueil;
    export let open_appointement;
    export let open_account;
    export let open_login;
    export let logout;
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a  class="navbar-brand">
    <img src="" width="30" height="30" class="d-inline-block align-top" alt="">
        CMA
    </a>

    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <!-- svelte-ignore a11y-missing-attribute -->
            <a on:click={open_accueil()} class="nav-link">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <!-- svelte-ignore a11y-missing-attribute -->
            <a on:click={open_appointement()} class="nav-link">Prendre rendez-vous</a>
          </li>
          {#if logged_in}
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Mon compte
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="dropdown-item">Action</a>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="dropdown-item">Another action</a>
                <div class="dropdown-divider"></div>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="dropdown-item">Something else here</a>
                </div>
            </li>
            <li class="nav-item">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a on:click={logout()} class="nav-link">Se déconnecter</a>
            </li>
          {:else}
            <li class="nav-item">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a on:click={open_login()} class="nav-link">Se connecter</a>
            </li>
          {/if}
        </ul>
      </div>
</nav>

<style>
ul.navbar-nav a:hover{
    cursor: pointer;
}
</style>