<script>
  export let state;
  let click = "home";
  let fhir_var = [];
  let patientDetails;
  let patientTicketDetails;
  import Waiting from "../Waiting.svelte";
  import CreateTicket from "./createTicket.svelte";
  import Dashboard from "./Dashboard.svelte";
  import Details from "./Details.svelte";
  import Nav from "./Nav.svelte";
  import RegisterForm from "./RegisterForm.svelte";
  import SeeTickets from "./seeTickets.svelte";
  import Ticketmain from "./Ticketmain.svelte";
  let noOfTickets = 0;
  fetch("/api/ticketinfo").then((result) => {
    if (result.ok) {
      result.json().then((e) => {
        console.log(e);
        fhir_var = e.data;
        noOfTickets = e.noOfTickets;
      });
    } else {
      fhir_var = null;
    }
  });
</script>

<Nav navStatus="Dashboard" bind:state bind:click />
<!-- <AdminNav bind:state bind:click /> -->
{#if click == "home"}
  <Dashboard
    ticketsRem={noOfTickets}
    bind:click
    bind:patientDetails
    bind:fhir_var
  />
{:else if click == "register"}
  <RegisterForm />
{:else if click == "seeTickets"}
  <SeeTickets bind:patientTicketDetails bind:fhir_var bind:click />
{:else if click == "createTicket"}
  <CreateTicket />
{:else if click == "ticketopen"}
  <Ticketmain {patientTicketDetails} bind:click />
{:else if click == "details"}
  <Details user={patientDetails} />
{:else if click == "waiting"}
  <Waiting />
  <!--  -->
{/if}
