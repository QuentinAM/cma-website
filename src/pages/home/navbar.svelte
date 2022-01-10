<script>
    import { onMount } from 'svelte';

    export let logged_in;

    export let open_accueil;
    export let open_appointement;
    export let open_account;
    export let open_about;
    export let open_login;
    export let logout;

    let actual_element = null;

    function handle_click(e)
    {
        e.preventDefault();
        e.target.parentNode.classList.add('active');
        if (e.target.id == "accueil")
        {
            open_accueil();
        }
        else if (e.target.id == "appointement")
        {
            open_appointement();
        }
        else if (e.target.id == "account")
        {
            open_account()
        }
        else if (e.target.id == "login")
        {
            open_login()
        }
        else if (e.target.id == "logout")
        {
            logout();
        }
        else if (e.target.id == "about")
        {
            open_about();
        }
    }

</script>

<div>
  <nav class="navbar navbar-expand-md navbar-light">
    <a class="navbar-brand" id="accueil" href="/" on:click={handle_click}>CMA</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" id="accueil" href="/" on:click={handle_click}>Accueil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="appointement" href="/" on:click={handle_click}>Prendre rendez-vous</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="about" href="/" on:click={handle_click}>A propos</a>
        </li>
        {#if logged_in}
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Mon compte
          </a>
          <div class="dropdown-menu animate slideIn" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/" on:click={handle_click}>Mes rendez-vous</a>
            <a class="dropdown-item" href="/" on:click={handle_click}>Mes informations</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" id="logout" href="/" on:click={handle_click}>Se déconnecter</a>
          </div>
        </li>
        {:else}
          <li class="nav-item">
            <a class="nav-link" id="login" href="/" on:click={handle_click}>Se connecter</a>
          </li>
        {/if}
      </ul>
    </div>
  </nav>
</div>


<style>
.navbar{
  padding: 20px 20px;
  border-radius: 20px 20px 0 0;
  background-color: #c5c5c5;
  z-index: 10;
  width: 100%;
}
.navbar-brand{
  font-weight: 200;
  font-size: 2em;
  text-transform: uppercase;
  color: #262626;
}
.nav-item{
  padding: 10px;
  font-weight: 450;
  font-size: 1.2em;
  text-transform: uppercase;
}
.navbar .navbar-nav .nav-item .nav-link:hover,
.navbar .navbar-nav .nav-item.active .nav-link{
  background: #262626;
  color: #fff;
}
.navbar .navbar-nav .nav-item .nav-link{
  color: #262626;
  padding: 5px 15px;
}
.navbar .navbar-toggler{
  border: none;
  color: #fff;
  border: 2px solid #7f7f7f;
  border-radius: 0;
  outline: none;
}
a{
  border-radius: 15px;
  text-decoration: none;
}
.dropdown-item{
  color: #262626;
}

@media (min-width: 768px) {
  .animate {
    animation-duration: 0.3s;
    -webkit-animation-duration: 0.3s;
    animation-fill-mode: both;
    -webkit-animation-fill-mode: both;
  }
}

@keyframes slideIn {
  0% {
    transform: translateY(1rem);
    opacity: 0;
  }

  100% {
    transform: translateY(0rem);
    opacity: 1;
  }

  0% {
    transform: translateY(1rem);
    opacity: 0;
  }
}

@-webkit-keyframes slideIn {
  0% {
    -webkit-transform: transform;
    -webkit-opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    -webkit-opacity: 1;
  }

  0% {
    -webkit-transform: translateY(1rem);
    -webkit-opacity: 0;
  }
}

.slideIn {
  -webkit-animation-name: slideIn;
  animation-name: slideIn;
}
</style>