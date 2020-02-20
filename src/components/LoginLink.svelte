<script>
  import user from "../stores/user";
  import { link } from "svelte-routing";
  import globalStore from "../stores/globalStore";

  //logout function
</script>

{#if $user.jwt}
  <!-- content here -->
  <a
    href="/"
    class="logout-btn"
    use:link
    on:click={() => {
      globalStore.toggleItem('sidebar', false);
    }}>
    Logout
  </a>
{:else}
  <!-- else content here -->
  <a
    href="/login"
    use:link
    on:click={() => {
      globalStore.toggleItem('sidebar', false);
    }}>
    login
  </a>
{/if}
