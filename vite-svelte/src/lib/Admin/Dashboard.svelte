<script>
  export let click;
  export let patientDetails;
  import { fade, slide, scale } from "svelte/transition";
  import Waiting from "../Waiting.svelte";
  import Details from "./Details.svelte";
  let patients = 0;
  let response = [];
  let ticktesDone = 0;
  let ticketsRem = 0;
  fetch("/api/patients").then((result) => {
    if (result.ok) {
      console.log(result);
      result.json().then((e) => {
        response = e.data;
        patients = e.numberofPatients;
      });
    } else {
      response = null;
    }
  });

  fetch("/api/ticketinfo").then((result) => {
    if (result.ok) {
      result.json().then((e) => {
        console.log(e);
        ticketsRem = e.noOfTickets;
        ticktesDone = e.ticketsdone;
      });
    }
  });
  function handleClick(patient) {
    click = "details";
    patientDetails = patient;
  }
</script>

<main in:fade>
  <div class="date">
    <input type="date" name="todayDate" />
  </div>
  <div class="insights">
    <div class="patients">
      <i class="las la-user-friends" />
      <div class="middle">
        <div class="left">
          <h3>Patients</h3>
          {#key patients}
            <h1 in:fade>{patients}</h1>
          {/key}
        </div>
      </div>
      <small class="text-muted">registered on the pluscare</small>
    </div>
    <div class="tickets_rem">
      <i class="las la-ticket-alt" />
      <div class="middle">
        <div class="left">
          <h3>Remaining</h3>
          {#key ticketsRem}
            <h1 in:fade>{ticketsRem}</h1>
          {/key}
        </div>
      </div>
      <small class="text-muted">tickets</small>
    </div>
    <div class="completed">
      <i class="las la-ticket-alt" />
      <div class="middle">
        <div class="left">
          <h3>Completed</h3>
          <h1>{ticktesDone}</h1>
        </div>
      </div>
      <small class="text-muted">tickets</small>
    </div>
  </div>
  <div class="patients-list">
    <h2>Pluscare Patients</h2>
    <div class="patients">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Payment</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {#each response as patient}
            <tr>
              <td in:slide
                >{patient.name[0].given[0] + " " + patient.name[0].family}</td
              >
              <td in:slide>{patient.telecom[0].value}</td>
              <td in:slide>Pending</td>
              <td class="warning" in:slide>Due</td>
              <td class="primary" in:slide on:click={() => handleClick(patient)}
                >Details</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</main>

<style>
  .recent-updates {
    margin-top: 1rem;
  }
  .recent-updates h2 {
    margin-bottom: 0.8rem;
  }
  .recent-updates .updates {
    background-color: #dce1eb;
    padding: 1.8rem;
    border-radius: 2rem;
  }
  .text-muted {
    color: #7d8da1;
  }
  .warning {
    color: #ffcc00;
  }
  .success {
    color: #22ca5d;
  }
  .primary {
    color: #7380ec;
  }
  .primary:hover {
    cursor: pointer;
  }
  main {
    margin-left: 250px;
  }
  main .date {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 0.6rem;
    background: rgba(132, 139, 200, 0.18);
    border-radius: 0.4rem;
  }
  main .date input[type="date"] {
    background: transparent;
    color: #363949;
    font-family: "Poppins", sans-serif;
    border: none;
  }
  main .insights {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.4rem;
  }
  main .insights > div {
    background: #fff;
    padding: 0.5rem;
    border-radius: 1.5rem;
    margin: 1rem;
    box-shadow: 0rem 2rem 3rem rgba(132, 139, 200, 0.18);
    transition: all 300ms ease;
  }
  main .insights > div:hover {
    box-shadow: 0rem 2rem 3rem rgba(132, 139, 200, 0.1);
  }
  main .insights > div i {
    background: #6d8baa;
    padding: 0.5rem;
    border-radius: 50%;
    color: #fff;
    margin-left: 1rem;
    font-size: 2rem;
  }
  main .insights > div h3,
  h1,
  small {
    margin-left: 1rem;
  }
  main .insights > div.tickets_rem i {
    background: #ff7782;
  }
  main .insights > div.completed i {
    background: #41f1b6;
  }
  main .insights small {
    color: #7d8da1;
  }
  main .insights > div .middle {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  main .patients-list {
    margin-top: 2rem;
  }
  main .patients-list h2 {
    margin-bottom: 0.8rem;
  }
  main .patients-list table {
    background: #fff;
    width: 100%;
    border-radius: 2rem;
    padding: 1.8rem;
    text-align: center;
    box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
    transition: all 300ms ease;
  }
  main .patients-list table:hover {
    box-shadow: 0rem 2rem 3rem rgba(132, 139, 200, 0.1);
  }
  main table tbody td {
    height: 2.8rem;
    border-bottom: 1px solid rgba(132, 139, 200, 0.18);
    color: #677483;
  }
  main table tbody tr:last-child td {
    border: none;
  }
  main .patients-list span {
    text-align: center;
    display: block;
    margin: 1rem auto;
    color: #7380ec;
  }
  main .patients-list span:hover {
    cursor: pointer;
  }
</style>
