<script>
  export let state;
  let click = "home";
  let patientDetails;
  let patientTicketDetails;
  import Waiting from "./Waiting.svelte";
  import CreateTicket from "./createTicket.svelte";
  import Dashboard from "./Dashboard.svelte";
  import Details from "./Details.svelte";
  import Nav from "./Nav.svelte";
  import RegisterForm from "./RegisterForm.svelte";
  import SeeTickets from "./seeTickets.svelte";
  import Ticketmain from "./Ticketmain.svelte";
  import AdminInfo from "./AdminInfo.svelte";
  let names = [];
  fetch("/api/ticketinfo").then((result) => {
    if (result.ok) {
      result.json().then((e) => {
        console.log(e);
        names = e.data;
      });
    }
  });
</script>

<Nav navStatus="Dashboard" bind:state bind:click />
{#if click == "home"}
  <Dashboard bind:click bind:patientDetails />
{:else if click == "register"}
  <RegisterForm />
{:else if click == "seeTickets"}
  <SeeTickets bind:patientTicketDetails bind:click bind:names />
{:else if click == "ticketopen"}
  <Ticketmain {patientTicketDetails} bind:click />
{:else if click == "details"}
  <Details user={patientDetails} />
{:else if click == "waiting"}
  <Waiting />
{:else if click == "adminInfo"}
  <AdminInfo />
{/if}
