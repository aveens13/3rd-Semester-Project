<script>
  export let state;
  let click = "home";
  import AdminNav from "./AdminNav.svelte";
  import CreateTicket from "./createTicket.svelte";
  import Dashboard from "./Dashboard.svelte";
  import Nav from "./Nav.svelte";
  import RegisterForm from "./RegisterForm.svelte";
  import SeeTickets from "./seeTickets.svelte";
  import Ticketmain from "./Ticketmain.svelte";
</script>

<Nav bind:state bind:click />
<!-- <AdminNav bind:state bind:click /> -->
{#if click == "home"}
  <Dashboard />
{:else if click == "register"}
  <RegisterForm />
{:else if click == "seeTickets"}
  <SeeTickets bind:click />
{:else if click == "createTicket"}
  <CreateTicket />
{:else if click == "ticketopen"}
  <Ticketmain />
{:else}
  <!--  -->
{/if}
