<script>
  import svelteLogo from "./assets/svelte.svg";
  import Admin from "./lib/Admin/Admin.svelte";
  import Counter from "./lib/Admin/Admin.svelte";
  import Login from "./lib/Login.svelte";
  import UserLogin from "./lib/UserLogin.svelte";
  import Waiting from "./lib/Waiting.svelte";
  let state;
  state = "n";
</script>

<main>
  {#if state == "waiting"}
    <Waiting />
  {:else if state == "user"}
    <UserLogin />
  {:else if state == "admin"}
    <Admin bind:state />
  {:else}
    <Login bind:state />
  {/if}
</main>
