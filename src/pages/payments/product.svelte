<!-- <script>
    import Stripe from 'stripe';
    var stripe = Stripe('pk_test_51KAyz4Jm42LaAy7DcunXaL1vNAjm5dr8yZf28GMOIPWtlyO71ZaOcM2eLmFt8a3bnZ4eVDGt5PUAqTavtAwhRaNt00wZqAIbef'   );

    export let amount;
    export let name;
    export let price_id;

    // Checkout
    async function start_checkout()
    {
        const session = await stripe.checkout.sessions.create({
        line_items: [   
        {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: price_id,
            quantity: 1,
        },
        ],
        mode: 'payment',
        success_url: `http://localhost:5000/success`,
        cancel_url: `http://localhost:5000/cancel`,
        });
    }

</script>

<h2>Checkout : {name}</h2>
<button on:click={start_checkout}> Buy {amount / 100}</button>

<style>


</style> -->