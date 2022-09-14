<script>
  export let state;
  let click = "none";
  import AdminNav from "./AdminNav.svelte";
  import RegisterForm from "./RegisterForm.svelte";
</script>

<AdminNav bind:state bind:click />
{#if click == "none"}
  <!--  -->
{:else if click == "register"}
  <RegisterForm />
{:else}
  <!--  -->
{/if}
