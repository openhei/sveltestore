<script>
  let email = "";
  let password = "";
  let username = "default username";

  let isMember = true;
  $: isEmpty = !name || !password || !username;

  function toggleMember() {}
  async function handleSubmit() {}
</script>

<section class="form">

  <h2 class="section-title">
    {#if isMember}Sign in{:else}Register{/if}
  </h2>
  <form class="login-form" on:submit:preventDefault={handleSubmit}>
    <div class="form-control">
      <label for="email">email</label>
      <input type="email" id="email" bind:value={email} />
    </div>
    <div class="form-control">
      <label for="password">password</label>
      <input type="password" id="password" bind:value={password} />
    </div>
    {#if !isMember}
      <div class="form-control">
        <label for="username">username</label>
        <input type="text" id="username" bind:value={username} />
      </div>
    {/if}
    {#if isEmpty}
      <p class="form-empty">please fill out all form fields</p>
    {/if}
    <button
      type="submit"
      class="btn btn-primary btn-block"
      disabled={isEmpty}
      class:disabled={isEmpty}>
      Submit
    </button>
    {#if isMember}
      <p class="register-link">
        Need to register?
        <button type="button" on:click={toggleMember}>click here</button>
      </p>
    {:else}
      <p class="regiser-link">
        Already memeber?
        <button type="button" on:click={toggleMember}>click here</button>
      </p>
    {/if}
  </form>
</section>
