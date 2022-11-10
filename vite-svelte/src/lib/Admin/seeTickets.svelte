<script>
  import { each } from "svelte/internal";
  import { fade, slide, scale } from "svelte/transition";
  import Waiting from "./Waiting.svelte";
  export let click;
  export let names;
  export let patientTicketDetails;
  import Name from "./Name.svelte";
  import Modal from "../Modals/Modal.svelte";
  let fhir_var = fetch("/api/ticketinfo").then((result) => {
    if (result.ok) {
      return result.json();
    } else {
      return null;
    }
  });
  let patientNames = [];
  names.forEach((name) => {
    patientNames = [
      ...patientNames,
      name.createdBy.firstName + " " + name.createdBy.lastName,
    ];
  });
  function handleClick(patient) {
    click = "ticketopen";
    patientTicketDetails = patient;
  }

  //Filtering the names based on the input
  let filteredNames = [];
  /* HANDLING THE INPUT */
  let searchInput; // use with bind:this to focus element
  let inputValue = "";
  const makeMatchBold = (str) => {
    // replace part of (name === inputValue) with strong tags
    let matched = str.substring(0, inputValue.length);
    let makeBold = `<strong>${matched}</strong>`;
    let boldedMatch = str.replace(matched, makeBold);
    return boldedMatch;
  };
  const removeBold = (str) => {
    //replace < and > all characters between
    return str.replace(/<(.)*?>/g, "");
    // return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
  };
  let hiLiteIndex = null;
  $: hiLitedCountry = filteredNames[hiLiteIndex];
  $: if (!inputValue) {
    filteredNames = [];
    hiLiteIndex = null;
  }
  const clearInput = () => {
    inputValue = "";
    searchInput.focus();
  };
  const filterNames = () => {
    let storageArr = [];
    if (inputValue) {
      patientNames.forEach((name) => {
        if (name.toLowerCase().startsWith(inputValue.toLowerCase())) {
          storageArr = [...storageArr, makeMatchBold(name)];
        }
      });
    }
    filteredNames = storageArr;
  };
  console.log(filteredNames);
  const setInputVal = (name) => {
    inputValue = removeBold(name);
    filteredNames = [];
    hiLiteIndex = null;
    document.querySelector("#name-input").focus();
  };

  const submitValue = () => {
    if (inputValue) {
      console.log(`${inputValue} is submitted!`);
      setTimeout(clearInput, 1000);
    } else {
      alert("You didn't type anything.");
    }
  };

  const navigateList = (e) => {
    if (e.key === "ArrowDown" && hiLiteIndex <= filteredNames.length - 1) {
      hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1);
    } else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
      hiLiteIndex === 0
        ? (hiLiteIndex = filteredNames.length - 1)
        : (hiLiteIndex -= 1);
    } else if (e.key === "Enter") {
      setInputVal(filteredNames[hiLiteIndex]);
    } else {
      return;
    }
  };
</script>

<svelte:window on:keydown={navigateList} />
{#await fhir_var}
  <Waiting />
{:then response_var}
  <main>
    <div class="topnav">
      <div class="type" />
    </div>
    <div class="wrapper">
      <div class="search">
        <input
          id="name-input"
          type="text"
          placeholder="Name of Patient"
          bind:this={searchInput}
          bind:value={inputValue}
          on:input={filterNames}
        />
        <i
          class="las la-search"
          on:click={submitValue}
          on:input={submitValue}
        />
      </div>
    </div>
    {#if filteredNames.length > 0}
      <ul id="autocomplete-items-list">
        {#each filteredNames as name, i}
          <Name
            itemLabel={name}
            highlighted={i === hiLiteIndex}
            on:click={() => setInputVal(name)}
          />
        {/each}
      </ul>
    {/if}
    <div class="container" in:fade>
      {#each response_var.data as patient}
        <div class="card" in:slide>
          <div class="info">
            <h1>
              {patient.createdBy.firstName + " " + patient.createdBy.lastName}
            </h1>
            <p>Created a ticket</p>
            <ul>
              <li>Type: {patient.type}</li>
              <li><span class="status">Status: </span></li>
            </ul>
            <div class="links">
              <span class="a" on:click={() => handleClick(patient)}
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
          <!-- {#if patient.conditionImage}
          <div class="conditionPhoto">
            <img src={`/api/getimage/${patient._id}`} alt="" />
          </div>
        {/if} -->
        </div>
      {/each}
    </div>
  </main>
{/await}

<style>
  .waiting {
    margin-left: 300px;
  }
  main {
    margin-left: 250px;
  }
  .container {
    box-sizing: border-box;
    width: 100%;
    height: 80vh;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
    justify-content: center;
  }
  .search {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
  }
  .search i {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
  }
  .search i:hover {
    cursor: pointer;
  }
  .search input {
    /* width: 15%; */
    font-family: "Poppins", sans-serif;
    border-radius: 1.8rem;
    padding: 0.5rem;
    border: 1px solid #a0adbd;
  }
  .search input[type="search"]:focus {
    border: 1px solid #cbd3dd;
  }
  div.wrapper {
    position: relative;
    display: inline-block;
    margin-left: 2rem;
    width: 15%;
  }
  #autocomplete-items-list {
    position: relative;
    margin-left: 2rem;
    border-radius: 1.8rem;
    padding: 0;
    top: 0;
    width: 297px;
    border: 1px solid #ddd;
    background-color: #ddd;
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
  .info ul li:last-child {
    margin-left: auto;
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
</style>
