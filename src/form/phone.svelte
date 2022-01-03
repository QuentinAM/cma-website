<script>
    import { onMount } from 'svelte';

    let phoneInputField;

    // onMount(() => {
    //     const phoneInput = window.intlTelInput(phoneInputField, {
    //         utilsScript:
    //         "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    //     });
    // });

</script>

<!-- <svelte:head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>
</svelte:head> -->

<div class="container">
 <form id="login" onsubmit="process(event)">
   <p>Enter your phone number:</p>
   <input bind:this={phoneInputField} id="phone" type="tel" name="phone" />
   <input type="submit" class="btn" value="Verify" />
 </form>
</div>

<style>


</style>