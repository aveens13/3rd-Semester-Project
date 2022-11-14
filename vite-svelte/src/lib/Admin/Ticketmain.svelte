<script>
  import { tick } from "svelte";
  import { bind } from "svelte/internal";
  import { fade, slide } from "svelte/transition";
  import swal from "sweetalert";
  import Modal from "../Modals/Modal.svelte";
  import Image from "./Image.svelte";
  export let click;
  let ticketActives = false;
  export let patientTicketDetails;
  let active = false;
  const time = patientTicketDetails.dateCreated;
  const date = new Date(time);
  const dateCreated = date.toDateString();
  let contactNo;
  fetch(`/api/contact/${patientTicketDetails.createdBy.userID}`).then((res) => {
    // console.log(res);
    res.json().then((response) => {
      console.log(response);
      contactNo = response.contactNo;
    });
  });
  async function handleVisitHospital() {
    await fetch(`/api/visitHospital/${patientTicketDetails._id}`).then(
      (response) => {
        if (response.ok) {
          response.json().then((res) => {
            console.log(res);
            swal({
              title: `${res.status}`,
              text: `${res.message} triggered`,
              icon: "info",
            });
          });
        } else {
          console.log("Cannot get visit hospital");
        }
      }
    );
  }

  async function handleSendNurse() {
    await fetch(`/api/sendNurse/${patientTicketDetails._id}`).then(
      (response) => {
        if (response.ok) {
          response.json().then((res) => {
            console.log(res);
            swal({
              title: `${res.status}`,
              text: `${res.message} triggered`,
              icon: "info",
            });
          });
        } else {
          console.log("Cannot Post Send Nurse");
        }
      }
    );
  }
  function handleDelete() {
    fetch(`/api/deleteTicket/${patientTicketDetails._id}`).then((response) => {
      if (response.ok) {
        active = true;
        setTimeout(() => {
          active = false;
          click = "seeTickets";
        }, 1500);
      } else {
      }
    });
  }
  function imageModal() {
    ticketActives = true;
  }
</script>

{#if ticketActives}
  <Modal bind:show={ticketActives} big={false}>
    <Image {patientTicketDetails} />
  </Modal>
{/if}
<main in:fade>
  <div class="container">
    <div class="info">
      <div class="info-patient" in:slide>
        Name :
        <span class="details"
          >{patientTicketDetails.createdBy.firstName}
          {patientTicketDetails.createdBy.lastName}
        </span>
      </div>
      <div class="info-patient" in:slide>
        Contact Number :
        <span class="details">{contactNo} </span>
      </div>
      <div class="info-patient" in:slide>
        Created on :
        <span class="details">{dateCreated}</span>
      </div>
      <div class="info-patient" in:slide>
        Ticket type :
        <span class="details">{patientTicketDetails.type}</span>
      </div>
      {#if patientTicketDetails.type == "general" || patientTicketDetails.type == "General"}
        <div class="info-patient" in:slide>
          Condition :
          <span class="details">{patientTicketDetails.condition}</span>
        </div>
        <div class="info-patient" in:slide>
          Medication :
          <span class="details">{patientTicketDetails.medication.isTaking}</span
          >
        </div>
        {#if patientTicketDetails.medication.isTaking == "yes"}
          <div class="info-patient" in:slide>
            Medicine List :
            <span class="details"
              >{patientTicketDetails.medication.medicineList}</span
            >
          </div>
        {/if}
      {/if}
      <div class="info-patient" in:slide>
        Symptom :
        <span class="details">{patientTicketDetails.symptom}</span>
      </div>
      {#if patientTicketDetails.type == "Covid"}
        <div class="info-patient" in:slide>
          Measurements :
          <span class="details">
            <span class="detailsMeasurement"
              >Oxygen Saturation : {patientTicketDetails.measurements
                .oxygenSaturation} %</span
            >

            <span class="detailsMeasurement"
              >Body Temperature : {patientTicketDetails.measurements
                .temperature}</span
            >

            <span class="detailsMeasurement"
              >Heart Rate : {patientTicketDetails.measurements.heartRate} BPM</span
            >
          </span>
        </div>
      {:else if patientTicketDetails.type == "Diabetes"}
        <div class="info-patient" in:slide>
          Measurements :
          <span class="details">
            <span class="detailsMeasurement"
              >HDB1AC Level : {patientTicketDetails.measurements.hbaLevel} %</span
            >

            <span class="detailsMeasurement"
              >Glucose Fasting : {patientTicketDetails.measurements
                .glucoseFasting} mg/dl</span
            >

            <span class="detailsMeasurement"
              >Glucose Random : {patientTicketDetails.measurements
                .glucoseRandom} mg/dl</span
            >
          </span>
        </div>
      {/if}
    </div>
    <div class="photo">
      {#if patientTicketDetails.conditionImage}
        <div class="conditionPhoto" in:fade>
          <img
            src={`/api/getimage/${patientTicketDetails._id}`}
            alt="Condition"
            on:click={imageModal}
          />
        </div>
      {/if}
    </div>
  </div>
  <div class="actions">
    <div class="button">
      <button on:click={handleSendNurse}
        ><i class="las la-user-md" /> Send Nurse</button
      >
    </div>
    <div class="button">
      <button on:click={handleVisitHospital}
        ><i class="las la-clinic-medical" /> Visit Hospital</button
      >
    </div>
    <div class="danger">
      <button on:click={handleDelete}><i class="las la-trash" /> Delete</button>
    </div>
  </div>
  <div class={active ? "toast active" : "toast"}>
    <div class="toast-content">
      <i class="las la-check" />
      <div class="message">
        <div class="text text-1">Deleted</div>
        <div class="text text-2">The ticket was deleted</div>
      </div>
    </div>
    <div class={active ? "progress active" : "progress"} />
  </div>
</main>

<style>
  main {
    margin-left: 300px;
  }
  .toast {
    font-family: "Poppins", sans-serif;
    position: absolute;
    top: 25px;
    right: 35px;
    border-radius: 1.2rem;
    background: #cbd3dd;
    padding: 20px 35px 20px 25px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    border-left: 6px solid #4070f4;
    overflow: hidden;
    visibility: hidden;
    transform: translateX(calc(100% + 35px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .toast.active {
    transform: translateX(0%);
    visibility: visible;
  }
  .toast-content .la-check {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 35px;
    background-color: #4070f4;
    color: #fff;
    font-size: 20px;
    border-radius: 50%;
  }
  .toast .toast-content {
    display: flex;
    align-items: center;
  }
  .toast .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: #ddd;
  }
  .toast .progress::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: #4070f4;
  }
  .progress.active::before {
    animation: progress 1.5s linear forwards;
  }

  @keyframes progress {
    100% {
      right: 100%;
    }
  }
  .message .text {
    font-size: 1rem;
    font-weight: 400;
  }
  .message .text.text-1 {
    font-weight: 600;
  }
  .toast-content .message {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
  }
  .container {
    margin-top: 10%;
    margin-right: 1rem;
    padding: 1rem;
    border-radius: 1.8rem;
    box-sizing: border-box;
    box-shadow: 0 2rem 3rem #cbd3dd;
    display: flex;
    justify-items: center;
  }
  .photo {
    margin: auto;
  }
  .container:hover {
    border: none;
    box-shadow: 0 2rem 3rem #d9e1e9;
    cursor: pointer;
  }
  .info-patient {
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    padding: 1rem;
  }
  .details {
    margin-left: 1rem;
  }
  .details .detailsMeasurement {
    margin-left: 2rem;
    padding: 1rem;
  }
  .conditionPhoto {
    margin-top: 3rem;
    margin-left: auto;
    opacity: 90%;
  }
  .conditionPhoto img {
    height: 200px;
    width: 15vw;
    border-radius: 3rem;
  }
  .actions {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }
  .actions i {
    font-size: 1.3rem;
  }
  .actions .button,
  .danger {
    margin: 1rem;
  }
  .actions .button button {
    padding: 0.8rem;
    width: 100%;
    color: #fff;
    background: #6d8baa;
    border: none;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    border-radius: 1.8rem;
  }
  .actions .danger button {
    padding: 0.8rem;
    width: 100%;
    color: #fff;
    background: #ff3a31;
    border: none;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    border-radius: 1.8rem;
  }
</style>
