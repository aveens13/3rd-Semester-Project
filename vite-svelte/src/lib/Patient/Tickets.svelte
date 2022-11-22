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
    display: flex;
    justify-content: center;
    margin-right: 3rem;
    flex-direction: column;
  }
  .container .conditions button {
    font-family: "Poppins", sans-serif;
    padding: 1rem;
    margin: 0.8rem;
    width: 100%;
    font-size: 1.5rem;
    font-family: "Poppins", sans-serif;
    border-radius: 1.8rem;
    border: none;
  }

  .container .conditions button:hover {
    background-color: #5157bd;
    transition: all 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    color: #fff;
    cursor: pointer;
    transform: scale(1.1);
  }
</style>
