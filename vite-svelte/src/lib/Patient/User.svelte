<!-- <script>
  export let active;
  import { fade } from "svelte/transition";
  import logo from "../../assets/pl.jpg";
  export let responseObject;
  const time = responseObject.response.birthDate;
  const date = new Date(time);
  const dateCreated = date.toDateString();
</script> -->
<script>
  export let patientState;
  export let active;
  import Chart from "chart.js/auto";
  import { onMount } from "svelte";
  let ctx;
  onMount(async () => {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Blood Pressure",
          "Weight",
          "Temperature",
          "Heart Rate",
          "Height in Cms",
        ],
        datasets: [
          {
            label: "Value",
            data: [120, user.weight, 78, 70, 168],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  });
  import { fade } from "svelte/transition";
  export let user;
  console.log(user);
  import logo from "../../assets/avatar.jpg";
  import logo2 from "../../assets/logo2.png";
  const date = new Date(user.birthDate);
  const birthDate = date.toDateString();
  async function onEditDetails() {
    patientState = "editDetails";
  }
</script>

<div class={active ? "container active" : "container"} in:fade>
  <div class="patient-nav">
    <span class="show">Patient ></span>
    <span class="name">
      {#if user.gender == "male" || user.gender == "Male"}
        Mr.
      {:else}
        Ms.
      {/if}
      {user.name[0].given[0]}
      {user.name[0].family}</span
    >
  </div>
  <div class="wrapper">
    <div class="top-section">
      <div class="left-pannel">
        {#if user.gender == "female" || user.gender == "Female"}
          <img src={logo2} alt="PatientImage" />
        {:else}
          <img src={logo} alt="PatientImage" />
        {/if}
        <div class="info">
          <span class="bold">Patient</span>
          <span class="light"
            >{user.name[0].given[0]} {user.name[0].family}</span
          >
        </div>
      </div>
      <div class="right-pannel">
        <div class="actions">
          <button on:click={onEditDetails}
            ><i class="las la-pen" />Edit Details</button
          >
        </div>
      </div>
    </div>
    <div class="middle-section">
      <div class="left-pannel">
        <div class="info-patient-1">
          <div class="line-info">
            <span class="light">Sex:</span>
            <span>{user.gender}</span>
          </div>
          <div class="line-info">
            <span class="light">Number:</span>
            <span>{user.telecom[0].value}</span>
          </div>
          <div class="line-info">
            <span class="light">Email:</span>
            <span>{user.telecom[1].value}</span>
          </div>
          <div class="line-info">
            <span class="light">Blood:</span>
            <span>{user.blood}</span>
          </div>
          <div class="line-info">
            <span class="light">Address:</span>
            <span>{user.address[0].line[0]}, {user.address[0].city}</span>
          </div>
        </div>
        <div class="info-patient-2">
          <div class="line-info">
            <span class="light">Birthdate:</span>
            <span>{birthDate}</span>
          </div>
          <div class="line-info">
            <span class="light">Problem:</span>
            <span>Gastrointestinal</span>
          </div>
          <div class="line-info">
            <span class="light">Id number:</span>
            <span>{user._id}</span>
          </div>
          <div class="line-info">
            <span class="light">Measured Weight:</span>
            <span>{user.weight} Kg</span>
          </div>
        </div>
      </div>
      <div class="right-pannel">
        <canvas id="myChart" bind:this={ctx} />
      </div>
    </div>
    <div class="bottom-section">
      <span class="asterick">&#42;</span>
      <i
        >You are registered under the Pluscare Org. and any details that are to
        be edited should follow the FHIR schema model.</i
      >
    </div>
  </div>
</div>

<style>
  .asterick {
    color: red;
  }
  .container {
    margin-left: 120px;
    transition: all ease 0.5s;
    font-family: "Poppins", sans-serif;
  }
  .container.active {
    margin-left: 300px;
  }
  .wrapper {
    height: 100%;
    /* background-color: aquamarine; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .wrapper > .top-section {
    /* background-color: aqua; */
    margin: 2rem 1rem;
    display: flex;
    justify-content: space-between;
  }
  .top-section > .left-pannel {
    margin-left: 1rem;
    margin-top: 2rem;
    display: flex;
    width: 100%;
  }
  .top-section > .right-pannel {
    margin-top: 2rem;
    margin-right: 2rem;
    margin-bottom: 1rem;
    height: 20vh;
    width: 100%;
    /* background-color: bisque; */
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
  }
  .top-section > .right-pannel > div {
    margin: 1rem;
  }
  .top-section > .left-pannel > .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 3rem;
    margin-bottom: 3rem;
  }
  .middle-section {
    height: 100%;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .middle-section > .left-pannel {
    /* background-color: #bfbfbf; */
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .actions > button {
    margin-top: 3rem;
    font-family: "Poppins", sans-serif;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 1rem;
    border: none;
    transition: all 0.3s ease;
  }
  .actions > button > i {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #ffcc00;
  }
  .actions > button:hover {
    font-size: calc(1rem * 1.1);
    background-color: #5157bd;
    color: white;
    transform: scale(1.1);
  }
  .actions > button:hover i {
    /* font-size: calc(1rem * 1.1); */
    /* background-color: #5157bd; */
    color: white;
    transition: all 0.5s ease;
    transform: scale(2);
  }
  .middle-section > .right-pannel {
    width: 100%;
    background-color: #fff8f8;
    border-radius: 1.8rem;
    color: white;
    cursor: pointer;
    height: 40vh;
    margin-left: 5rem;
    margin-right: 3rem;
    margin-top: -3rem;
  }
  .bottom-section {
    height: 100%;
    margin-top: 3rem;
    /* background-color: aqua; */
    width: 100%;
  }
  .bottom-section i {
    color: #ff7782;
    font-family: "Poppins", sans-serif;
    font-size: 1.2rem;
    font-style: italic;
  }
  .line-info {
    margin-bottom: 1rem;
  }
  .line-info > span {
    margin-right: 1rem;
  }
  .bold {
    font-size: 1.8rem;
    font-weight: bolder;
  }
  .light {
    margin-top: 1rem;
    font-weight: lighter;
  }
  .left-pannel > .info > .light {
    font-size: 1.3rem;
  }
  .top-section > .left-pannel > img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .patient-nav {
    display: flex;
  }
  .patient-nav .show {
    font-weight: bold;
  }
  .patient-nav .name {
    margin-left: 1rem;
    color: #bfbfbf;
  }
  .container {
    height: 80vh;
    padding: 2rem;
    width: 83%;
    margin-left: 250px;
  }
</style>
