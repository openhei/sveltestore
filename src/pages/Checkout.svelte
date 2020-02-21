<script>
  import { onMount } from "svelte";
  import { navigate, link } from "svelte-routing";

  import user from "../stores/user";
  import cart, { cartTotal } from "../stores/cart";

  import submitOrder from "../strapi/submitOrder";

  import globalStore from "../stores/globalStore.js";

  let name = "";

  //stripe vars
  let cardElement;
  let cardErrors;
  let card;
  let stripe;
  let elements;

  $: isEmpty = !name || $globalStore.alert;

  onMount(() => {
    if (!$user.jwt) {
      navigate("/");
      return;
    }

    if ($cartTotal > 0) {
      stripe = Stripe("pk_test_hekXLY1wA4OTcoFHzx4ktPtg00oGncTCwB");
      elements = stripe.elements(); //
      card = elements.create("card"); //

      //mount card
      //bind to
      card.mount(cardElement);

      //errors
      card.addEventListener("change", function(event) {
        if (event.error) {
          cardErrors.textContent = event.error.message;
        } else {
          cardErrors.textContent = "";
        }
      });
    }
  });

  async function handleSubmit() {
    globalStore.toggleItem("alert", true, "submitting order...");
    let response = await stripe
      .createToken(card)
      .catch(err => console.error(err));

    const { token } = response;
    if (token) {
      const { id } = token;
      //submit  the order
      let order = await submitOrder({
        name,
        total: $cartTotal,
        items: $cart,
        stripeTokenId: id,
        userToken: $user.jwt
      });
      if (order) {
        globalStore.toggleItem("alert", true, "your order is complete!");
        cart.set([]);
        localStorage.setItem("cart", JSON.stringify([]));

        navigate("/");
        return;
      } else {
        globalStore.toggleItem(
          "alert",
          true,
          "there was an error with your order, please try again",
          true
        );
      }
    } else {
    }
  }
</script>

{#if $cartTotal > 0}
  <section class="form">
    <h2 class="section-title">checkout</h2>
    <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
      <h3>order total : ${$cartTotal}</h3>
      <div class="form-control">
        <label for="name">your name</label>
        <input type="text" id="name" bind:value={name} />
      </div>

      <!-- stripe stuff  -->

      <div class="stripe-input">
        <label for="card-element">credit or debit card</label>
        <p class="stripe-info">
          Test using this credit card:
          <span>4242424242424242</span>
          <br />
          enter any 5 digits for the zip code
          <br />
          enter ay 3 digits for the CVC
        </p>
        <div id="card-element" bind:this={cardElement} />
        <div id="card-errors" bind:this={cardErrors} role="alert" />
      </div>

      <!-- error message  -->
      {#if isEmpty}
        <p class="form-empty">please fill out name field</p>
      {/if}
      <!-- submit button  -->

      <button
        type="submit"
        class="btn btn-primary btn-block"
        disabled={isEmpty}
        class:disabled={isEmpty}>
        submit
      </button>

    </form>
  </section>
{:else}
  <div class="checkout-empty">
    <h2>your cart is empty</h2>
    <a href="/products" use:link class="btn btn-primary">fill it</a>
  </div>
{/if}
