<script>
  import { each } from "svelte/internal";

  const fhir_Var = [
    {
      first_name: "Sulav",
      family_name: "Pokharel",
      gender: "male",
      brithdate: "2002-12-12",
      phoneno: "9863335885",
      email: "sulavpokharel7@gmail.com",
      address: "Hetauda",
    },
    {
      first_name: "Avinav",
      family_name: "Bhattarai",
      gender: "male",
      brithdate: "2002-01-17",
      phoneno: "9823333033",
      email: "aveenavbhattarai@gmail.com",
      address: "Baglung",
    },
  ];
</script>

<main>
  <body>
    <div class="main container">
      <div class="search">
        <label for="searchbar">Search</label>
        <input type="text" id="searchbar" />
      </div>
      <div class="view container">
        <ul>
          {#each fhir_Var as patient}
            <div class="ticket container">
              {patient.first_name}
              {patient.family_name}
              Phone no:{patient.phoneno}
            </div>
          {/each}
        </ul>
      </div>
    </div>
  </body>
</main>

<style>
  main {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
