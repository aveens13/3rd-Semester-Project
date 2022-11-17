<script>
  export let active;
  import { Label } from "@smui/snackbar";
  import { fade, slide } from "svelte/transition";
  export let patient;
  let ticketFinal = [];
  let ticketCreated = [];
  console.log(patient.response._id);
  fetch(`/api/getticketNotifications/${patient.response._id}`).then(
    (response) => {
      if (response.ok) {
        response.json().then((result) => {
          console.log(result);
          ticketFinal = result;
        });
      } else {
        response.json().then((result) => {
          console.log(result);
        });
      }
    }
  );
  fetch(`/api/getTicketIndividual/${patient.response._id}`).then((response) => {
    if (response.ok) {
      response.json().then((result) => {
        ticketCreated = result;
      });
    } else {
      response.json().then((result) => {
        console.log(result);
      });
    }
  });

  function stringyfyDate(givenDate) {
    const date = new Date(givenDate);
    return date.toDateString();
  }
</script>

<main in:fade>
  <div class={active ? "container active" : "container"}>
    <span class="dashboardTop"><h1>Dashboard</h1></span>
    <div class="main-box">
      <div class="first-box">
        <div class="history">
          <span>History</span>
          <div class="history-bar">
            <div class="search">
              <label for="search" style="margin-right:1rem;">Search</label
              ><input
                type="search"
                id="history-search"
                placeholder="Search here"
              />
            </div>
            <div class="history-sort">
              <label for="history-sort" style="margin-right: 1rem;"
                >Sort by</label
              >
              <select id="history-sort">
                <option for="history-sort" value="new" id=""
                  >By date(newest)</option
                >
                <option for="history-sort" value="old" id=""
                  >By date(oldest)</option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="bottom-section">
          <div class="card-main">
            <div class="card">
              <div class="card-insight">
                <span>Heartrate</span><i class="las la-heartbeat" />
              </div>
              <div class="info">
                <span>70</span>
                <p>bpm</p>
              </div>
            </div>
            <div class="card">
              <div class="card-insight">
                <span>Fever</span><i class="las la-thermometer" />
              </div>
              <div class="info">
                <span>--</span>
                <p>&#176;F</p>
              </div>
            </div>
            <div class="card">
              <div class="card-insight">
                <span>Weight</span><i class="las la-weight" />
              </div>
              <div class="info">
                <span>{patient.response.weight}</span>
                <p>Kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="notification">
        <span>Notification<i class="las la-bell" /></span>
        <div class="notification-container">
          {#each ticketFinal as ticket}
            <div class="notification-banner" in:fade>
              <div class="text-notification">
                {#if ticket.type == "Hospital"}
                  <i class="las la-stethoscope" />
                {:else if ticket.type == "Nurse"}
                  <i class="las la-user-md" />
                {/if}
                <p class="text-muted" in:slide>
                  {ticket.status}
                </p>
              </div>
            </div>
          {/each}
          {#each ticketCreated as ticket}
            <div class="notification-banner">
              <div class="text-notification">
                <i class="las la-ticket-alt" />
                <p class="text-muted" in:slide>
                  You created a {ticket.type} ticket on {stringyfyDate(
                    ticket.dateCreated
                  )}
                </p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  :root {
    --rad: 0.7rem;
    --dur: 0.3s;
    --color-dark: #2f2f2f;
    --color-light: #fff;
    --color-brand: #57bd84;
    --font-fam: "Lato", sans-serif;
    --height: 5rem;
    --btn-width: 6rem;
    --bez: cubic-bezier(0, 0, 0.43, 1.49);
  }
  .container {
    margin-left: 100px;
    transition: all 0.5s ease;
  }
  .container.active {
    margin-left: 250px;
  }
  .history-sort select {
    /* appearance: none; */
    /* background-color: transparent; */
    border: none;
    padding: 0 1em 0 1rem;
    margin: 0;
    /* width: 100%; */
    font-family: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    line-height: inherit;
  }
  input {
    height: 1rem;
    font-family: "Poppins", sans-serif;
    border: 0;
    color: #2f2f2f;
    font-size: 0.8rem;
  }
  input[type="search"] {
    outline: 0;
    /* width: 100%; */
    background: var(--color-light);
    padding: 0.8rem 1.6rem;
    border-radius: var(--rad);
    /* appearance: none; */
    transition: all var(--dur) var(--bez);
    transition-property: width, border-radius;
    z-index: 1;
    position: relative;
  }
  main {
    height: 92vh;
    /* overflow-y: hidden;
    overflow-x: hidden; */
    margin-left: 80px;
    font-family: "Poppins", sans-serif;
    /* background-color: #f2f6fa; */
    margin-right: 20px;
  }
  .main-box {
    margin-top: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    min-height: 80vh;
  }
  .first-box {
    /* margin-top: 100px; */
    display: flex;
    flex-direction: column;
    width: 65%;
  }
  .first-box .bottom-section {
    margin: 2rem 1.5rem 2rem 0;
  }

  .bottom-section .card-main {
    display: flex;
    justify-content: space-between;
    padding: 2rem 0rem;
  }

  .bottom-section .card-main .card {
    width: 100%;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-items: center;
    border-radius: 1.8rem;
    /* background-color: #5157bd;
    color: #fff; */
    margin-left: 2rem;
    transition: all 0.2s ease;
    /* box-shadow: 0rem 2rem 3rem rgba(132, 139, 200, 0.18);*/
    box-shadow: 0.1rem 0rem 5rem 0.5rem rgba(132, 139, 200, 0.18);
  }
  .bottom-section .card-main .card:hover {
    transition: all 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    background-color: #5157bd;
    color: #fff;
    cursor: pointer;
    transform: scale(1.1);
  }

  .bottom-section .card-main .card .info {
    display: flex;
    margin: auto;
  }
  .card-main .card .info span {
    font-size: 3rem;
    font-weight: bold;
  }
  .card-main .card .info p {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .card .card-insight {
    display: flex;
    width: 100%;
    margin-top: 2rem;
    /* background-color: #57bd84; */
    font-family: "Poppins", sans-serif;
  }
  .card .card-insight span {
    margin-left: 1rem;
    font-weight: 700;
    font-size: 1.4rem;
  }
  .card .card-insight i {
    margin: auto;
    padding-left: 5rem;
    font-weight: 900;
    font-size: 1.6rem;
  }
  .history {
    display: flex;
    flex-direction: column;
    min-height: 60%;
    text-align: center;
    border-radius: 25px;
    background-color: #ffffff;
    box-shadow: 0rem 2rem 3rem rgba(132, 139, 200, 0.18);
  }
  .history span {
    font-weight: bolder !important;
    font-size: 1.8rem !important;
  }
  .history-bar {
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    margin-top: 30px;
  }
  .search {
    display: flex;
    justify-content: flex-start;
    margin-left: 1rem;
  }
  .notification-container {
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .notification-container::-webkit-scrollbar {
    display: none;
  }
  .notification {
    margin-top: 20px;
    width: 25%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    text-align: center;
    border-radius: 25px;
    /* background-color: #fff;
    color: #2d2d2f; */
    color: #fff;
    background-color: #2d2d2f;
    box-shadow: 0.1rem 0rem 5rem 0.5rem rgba(132, 139, 200, 0.18);
  }
  .notification .notification-banner {
    padding: 1.2rem 5rem;
    border-bottom: 1px solid #323134;
  }
  .notification-banner p .text-muted {
    font-size: 0.8rem !important;
    margin-bottom: 2rem;
  }
  .notification-banner .text-notification {
    display: flex;
  }
  .notification-banner .text-notification i {
    font-size: 2rem;
    padding: 0.1rem 1.2rem 0rem 0rem;
  }
  .notification span i:hover {
    cursor: pointer;
    transform: scale(1.5);
    transition: all 0.5s ease;
  }
  .notification-banner .text-notification .la-ticket-alt {
    color: #41f1b6;
  }
  .notification-banner .text-notification .la-stethoscope {
    color: #7d8da1;
  }
  .notification-banner .text-notification .la-user-md {
    color: #f78ca9;
  }
  .history span {
    font-size: 1.2rem;
  }
  .notification span {
    width: 100%;
    display: flex;
    font-size: 1.5rem;
    padding: 3rem 0 1.5rem 3rem;
  }
  .notification span i {
    margin-left: 10rem;
  }
  .history-sort {
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
  }
  .history-sort label,
  select {
    margin-right: 0;
  }
</style>
