<script>
  import svelteLogo from "./assets/svelte.svg";
  import Counter from "./lib/Counter.svelte";
  import Login from "./lib/Login.svelte";
  import UserLogin from "./lib/UserLogin.svelte";
  import Waiting from "./lib/Waiting.svelte";
  let state;
  state = "n";
</script>

<main>
  {#if state == "waiting"}
    <Waiting />
  {:else if state == "logged in"}
    <UserLogin />
  {:else}
    <Login />
  {/if}
</main>
