<script>
  export let active;
  export let patientState;
</script>

<main>
  <div class={active ? "container active" : "container"}>
    <div class="conditions">
      <button on:click={() => (patientState = "generalticket")}
        >GeneralTicket</button
      >
      <button on:click={() => (patientState = "covidTicket")}>Covid</button>
      <button on:click={() => (patientState = "diabetesTicket")}
        >Diabetes</button
      >
    </div>
  </div>
</main>

<style>
  .container.active {
    margin-left: 250px;
  }
  .container {
    margin-left: 100px;
    transition: all 0.5s ease;
  }
  .container .conditions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .container .conditions button {
    padding: 1rem;
    margin: 0.8rem;
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
    border-radius: 1.8rem;
    border: none;
  }
</style>
