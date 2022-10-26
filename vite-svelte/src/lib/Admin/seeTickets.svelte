<script>
  import { each } from "svelte/internal";
  export let click;
  let fhir_var = [];
  fetch("/api/ticketinfo").then((result) => {
    if (result.ok) {
      result.json().then((e) => {
        console.log(e);
        fhir_var = e;
      });
    } else {
      fhir_var = null;
    }
  });
</script>

<main>
  <div class="container">
    {#each fhir_var as patient}
      <div class="card">
        <div class="info">
          <h1>
            {patient.createdBy.firstName + " " + patient.createdBy.lastName}
          </h1>
          <p>Created a ticket</p>
          <ul>
            <li>Type: {patient.type}</li>
            <li>Condition: {patient.condition}</li>
          </ul>
          <div class="links">
            <span class="a" on:click={() => (click = "ticketopen")}
              >See Ticket</span
            >
            {#if patient.completed}
              <span class="check"><i class="chk las la-check" />Checked</span>
            {:else if !patient.completed}
              <span class="check"
                ><i class="unchk las la-eye-slash" />Unchecked</span
              >
            {/if}
          </div>
        </div>
        {#if patient.conditionImage}
          <div class="conditionPhoto">
            <img
              src={`http://localhost:5173/api/getimage/${patient._id}`}
              alt=""
            />
          </div>
        {/if}
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    margin-left: 250px;
  }
  .container {
    width: 100%;
    height: 80vh;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
    justify-content: center;
  }
  .card {
    background: #fff;
    display: flex;
    align-items: center;
    padding: 2rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    margin-left: 2rem;
    border-radius: 1.8rem;
    width: 90%;
    margin-right: 2rem;
    box-shadow: 0 2rem 3rem #cbd3dd;
    transition: all 300ms ease;
  }
  .card:hover {
    box-shadow: 0 2rem 3rem #d9e1e9;
  }
  .info {
    margin-left: 30px;
    color: #555;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
  }
  .info h1 {
    font-size: 26px;
    font-weight: 500;
    color: #333;
    margin-bottom: 1rem;
  }
  .info ul {
    display: flex;
    align-items: center;
    margin: 10px 0 30px;
  }
  .info li {
    list-style: none;
    display: inline-flex;
    align-items: center;
    font-size: 0.9rem;
    margin-right: 1.2rem;
    margin-top: 1rem;
  }
  .links {
    display: flex;
    /* background: #333; */
    justify-content: flex-start;
    align-items: center;
    margin: 20px 0;
  }
  .links .a {
    display: inline-flex;
    align-items: center;
    height: 50px;
    background: #6d8baa;
    color: #fff;
    border-radius: 0.5rem;
    border: 2px solid #6d8baa;
    padding: 3px 30px;
    cursor: pointer;
    margin-right: 1.5rem;
    font-size: 12px;
  }
  .links .unchk {
    margin-right: 1rem;
    color: #ff7782;
  }
  .links .chk {
    margin-right: 1rem;
    color: #41f1b6;
  }
  .links .check {
    margin-left: auto;
  }
  .conditionPhoto {
    margin-left: auto;
    opacity: 90%;
  }
  .conditionPhoto img {
    height: 200px;
    width: 200px;
    border-radius: 3rem;
  }
</style>
