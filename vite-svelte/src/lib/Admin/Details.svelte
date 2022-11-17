<script>
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
</script>

<div class="container" in:fade>
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
        </div>
      </div>
    </div>
    <div class="middle-section">
      <div class="left-pannel">
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
            <span>{user.weight}</span>
            <p>Kg</p>
          </div>
        </div>
      </div>
      <div class="right-pannel">
        <canvas id="myChart" bind:this={ctx} />
      </div>
    </div>
    <div class="bottom-section"><!--This is bottom section.--></div>
  </div>
</div>

<style>
  .container {
    font-family: "Poppins", sans-serif;
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
  .middle-section > .left-pannel > .card {
    width: 100%;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-items: center;
    border-radius: 1.8rem;
    /* background-color: #000; */
    /* color: #fff; */
    margin-left: 2rem;
    transition: all 0.2s ease;
    /* box-shadow: 0rem 2rem 3rem rgba(132, 139, 200, 0.18);*/
    box-shadow: 0.1rem 0rem 5rem 0.5rem rgba(132, 139, 200, 0.18);
  }
  .middle-section > .left-pannel > .card:hover {
    transition: all 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    background-color: #5157bd;
    color: #fff;
    cursor: pointer;
    transform: scale(1.02);
  }

  .middle-section > .left-pannel > .card .info {
    display: flex;
    margin: auto;
  }
  .middle-section > .left-pannel > .card .card-insight span {
    margin-left: 1rem;
    font-weight: 700;
    font-size: 1.4rem;
  }
  .middle-section > .left-pannel > .card .card-insight i {
    margin: auto;
    padding-left: 5rem;
    font-weight: 900;
    font-size: 1.6rem;
  }
  .middle-section > .left-pannel > .card .info p {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .middle-section > .left-pannel > .card .card-insight {
    display: flex;
    width: 100%;
    margin-top: 2rem;
    /* background-color: #57bd84; */
    font-family: "Poppins", sans-serif;
  }
  .middle-section > .left-pannel > .card .info span {
    font-size: 3rem;
    font-weight: bold;
  }
  .middle-section > .right-pannel {
    width: 100%;
    height: 32vh;
    margin-left: 5rem;
  }
  .bottom-section {
    height: 100%;
    /* background-color: aqua; */
    width: 100%;
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
