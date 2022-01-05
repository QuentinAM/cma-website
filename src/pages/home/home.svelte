<script>
    import * as animateScroll from "svelte-scrollto";
    import viewport from './viewport.js'; 

    function handle_click_about(e)
    {
        e.preventDefault();
        animateScroll.scrollToBottom();
    }

    function handle_click_back(e)
    {
        e.preventDefault();
        animateScroll.scrollToTop();
    }
</script>

<section class="banner">
    <div class="row">
        <div class="col-sm-6">
            <h2>Cabinet Marc Abel</h2>
            <p>Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
            </p>
            <a href="/" class="btnD1" on:click={handle_click_about}>En savoir plus</a>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <h2>Le cabinet</h2>
            <a href="/" class="btnD1" on:click={handle_click_back}>Back</a>
        </div>
    </div>
</section>

<style>
.row{
    padding: 200px 0 200px;
}
.banner{
    position: relative;
    background: grey;
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    text-align: center;
}
.banner h2{
    margin: 0;
    padding: 0 30px;
    font-size: 2.8em;
    font-weight: 300;
    color: #262626;
    text-transform: uppercase;
}
.banner p{
    margin: 1em 0 0;
    padding: 0 30px;
    font-size: 1.2em;
    line-height: 1.5em;
    color: #262626;
}
.btnD1{
    display: inline-block;
    margin: 1em 0 0;
    background: #ff2670;
    color: #fff;
    padding: 10px 20px;
    text-transform: uppercase;
    border: none;
    text-decoration: none;
    font-weight: 400;
}
.btnD1:hover{
    color: #fff;
    text-decoration: none;
}
@media (max-width: 768px)
{
    .banner
    {
        padding: 200px 0;
    }
    .banner h2
    {
        font-size: 1.8em;
    }
}
</style>