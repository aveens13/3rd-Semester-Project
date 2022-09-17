<script>
  export let state;
  let click = "none";
  import AdminNav from "./AdminNav.svelte";
  import CreateTicket from "./createTicket.svelte";
  import RegisterForm from "./RegisterForm.svelte";
  import SeeTickets from "./seeTickets.svelte";
</script>

<AdminNav bind:state bind:click />
{#if click == "none"}
  <!--  -->
{:else if click == "register"}
  <RegisterForm />
{:else if click == "seeTickets"}
  <SeeTickets />
{:else if click == "createTicket"}
  <CreateTicket />
{:else}
  <!--  -->
{/if}
