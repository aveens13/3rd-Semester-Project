<script>
  export let state;
  let active = false;
  let ticketActive;
  let patientState = "dashboard";
  import PatientDasboard from "./PatientDasboard.svelte";
  import PatientNav from "./PatientNav.svelte";
  import GeneralTicket from "./GeneralTicket.svelte";
  import Tickets from "./Tickets.svelte";
  import CovidTicket from "./CovidTicket.svelte";
  import DiabetesTicket from "./DiabetesTicket.svelte";
  import Modal from "../Modals/Modal.svelte";
  import Payment from "./Payment.svelte";
  export let responseObject;
</script>

<PatientNav
  bind:state
  bind:active
  bind:patientState
  bind:ticketActive
  responseNav={responseObject}
/>
{#if patientState == "dashboard"}
  <PatientDasboard />
{:else if patientState == "user"}
  <!--  -->
{:else if patientState == "tickets"}
  <Modal bind:show={ticketActive} big={false}>
    <Tickets bind:active bind:patientState />
  </Modal>
{:else if patientState == "generalticket"}
  <GeneralTicket bind:active />
{:else if patientState == "covidTicket"}
  <CovidTicket bind:active />
{:else if patientState == "diabetesTicket"}
  <DiabetesTicket bind:active />
{:else if patientState == "payment"}
  <Payment />
{/if}
