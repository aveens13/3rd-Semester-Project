<script>
  import { tick } from "svelte";
  import {
    add_resize_listener,
    bind,
    createEventDispatcher,
    each,
  } from "svelte/internal";
  import { fade, slide } from "svelte/transition";
  import swal from "sweetalert";
  import Modal from "../Modals/Modal.svelte";
  import Patient from "../Patient/Patient.svelte";
  import Image from "./Image.svelte";
  export let click;
  let ticketActives = false;
  export let patientTicketDetails;
  let active = false;
  const time = patientTicketDetails.dateCreated;
  const date = new Date(time);
  const dateCreated = date.toDateString();
  let container;
  let contactNo;
  let line;
  let city;
  let state;
  let email;
  var opt = {
    margin: 0,
    filename: "report.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 8 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  fetch(`/api/contact/${patientTicketDetails.createdBy.userID}`).then((res) => {
    // console.log(res);
    res.json().then((response) => {
      console.log(response);
      contactNo = response.contactNo;
      line = response.patient.address[0].line[0];
      city = response.patient.address[0].city;
      state = response.patient.address[0].state;
      email = response.patient.telecom[1].value;
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
      }
    });
  }
  function imageModal() {
    ticketActives = true;
  }
  function downloadPDF() {
    // @ts-ignore
    html2pdf().from(container).set(opt).save();
  }
</script>

{#if ticketActives}
  <Modal bind:show={ticketActives} big={false}>
    <Image {patientTicketDetails} />
  </Modal>
{/if}
<main in:fade>
  <div class="wrapper">
    <div class="container" id="container" bind:this={container}>
      <div class="info-patient" in:slide>
        <div class="emergency_contact">
          <div class="title">
            <span>Emergency Contact</span>
          </div>
          <p class="secondary_title">Contact Information</p>
          <div class="contact_details">
            <div class="name">
              <span>Name</span>
              <p>
                {patientTicketDetails.createdBy.firstName}
                {patientTicketDetails.createdBy.lastName}
              </p>
            </div>
            <div class="email">
              <span>Email</span>
              <p>{email}</p>
            </div>
            <div class="contact_no">
              <span>Contact no</span>
              <p>{contactNo}</p>
            </div>
          </div>
          <p class="secondary_title">Address</p>
          <div class="contact_details">
            <div class="line">
              <span>Line</span>
              <p>{line}</p>
            </div>
            <div class="city">
              <span>City</span>
              <p>{city}</p>
            </div>
            <div class="state">
              <span>State</span>
              <p>{state}</p>
            </div>
          </div>
        </div>
        <hr />

        <div class="medical_details">
          <div class="title">
            <span>Medical Details</span>
          </div>
          <div class="contact_details">
            <div class="created_on">
              <span>Created on</span>
              <p>{dateCreated}</p>
            </div>
            <div class="condition">
              <span>Condition</span>
              {#if patientTicketDetails.type == "general" || patientTicketDetails.type == "General"}
                <p>{patientTicketDetails.condition[0]}</p>
              {/if}
              {#if patientTicketDetails.type == "covid" || patientTicketDetails.type == "Covid"}
                <p>Covid</p>
              {/if}
              {#if patientTicketDetails.type == "diabetes" || patientTicketDetails.type == "Diabetes"}
                <p>Diabetes</p>
              {/if}
            </div>
            <div class="medication">
              <span>Medication</span>
              {#if patientTicketDetails.medication.isTaking == "no" || patientTicketDetails.medication.isTaking == "No" || patientTicketDetails.type == "Covid" || patientTicketDetails.type == "Diabetes"}
                <p>None</p>
              {/if}
              {#if patientTicketDetails.medication.isTaking == "yes" || patientTicketDetails.medication.isTaking == "Yes"}
                <p>Yes</p>
              {/if}
            </div>
          </div>

          <p class="secondary_title">Lists</p>
          <div class="contact_details">
            <div class="symptoms">
              <span>Symptoms</span>
              {#each patientTicketDetails.symptom as symptom}
                <div class="symptom">
                  <p>{symptom}</p>
                </div>
              {/each}
            </div>

            <div class="medication_allergy">
              <span>Allergies</span>
              {#if patientTicketDetails.medicationAllergy.hasAllergy == "no" || patientTicketDetails.medicationAllergy.hasAllergy == "No" || patientTicketDetails.type == "Covid" || patientTicketDetails.type == "Diabetes"}
                <p>N/A</p>
              {/if}
              {#if patientTicketDetails.medicationAllergy.hasAllergy == "no" || patientTicketDetails.medicationAllergy.hasAllergy == "No"}
                {#each patientTicketDetails.medicationAllergy.allergy as allergy}
                  <p>{allergy}</p>
                {/each}
              {/if}
            </div>

            <div class="medications">
              <span>Medications</span>
              {#if patientTicketDetails.medication.isTaking == "no" || patientTicketDetails.medication.isTaking == "No" || patientTicketDetails.type == "Covid" || patientTicketDetails.type == "Diabetes"}
                <p>N/A</p>
              {/if}
              {#if patientTicketDetails.medication.isTaking == "yes" || patientTicketDetails.medication.isTaking == "Yes"}
                <p>{patientTicketDetails.medication.medicineList}</p>
              {/if}
            </div>
          </div>
          <hr />

          {#if patientTicketDetails.type == "covid" || patientTicketDetails.type == "Covid"}
            <div class="title">
              <span>Measurements</span>
            </div>
            <div class="contact_details">
              <div class="measurements_1">
                <span>Oxygen Saturation</span>
                <p>{patientTicketDetails.measurements.oxygenSaturation}%</p>
              </div>
              <div class="measurements_2">
                <span>Temperature</span>
                <p>{patientTicketDetails.measurements.temperature}C</p>
              </div>
              <div class="measurements_3">
                <span>Heart Rate</span>
                <p>{patientTicketDetails.measurements.heartRate} bpm</p>
              </div>
            </div>
          {/if}
          {#if patientTicketDetails.type == "diabetes" || patientTicketDetails.type == "Diabetes"}
            <div class="title">
              <span>Measurements</span>
            </div>
            <div class="contact_details">
              <div class="measurements_1">
                <span>HbA1c</span>
                <p>{patientTicketDetails.measurements.hbaLevel}%</p>
              </div>
              <div class="measurements_2">
                <span>Glucose Level(Fasting)</span>
                <p>{patientTicketDetails.measurements.glucoseFasting} mg/dL</p>
              </div>
              <div class="measurements_3">
                <span>Glucose Level(Random)</span>
                <p>{patientTicketDetails.measurements.glucoseRandom} mg/dL</p>
              </div>
            </div>
          {/if}

          {#if patientTicketDetails.type == "diabetes" || patientTicketDetails.type == "Diabetes" || patientTicketDetails.type == "covid" || patientTicketDetails.type == "Covid"}
            <hr />
          {/if}
          {#if patientTicketDetails.description !== "" || patientTicketDetails.conditionImage}
            <div class="title">
              <span>Others</span>
            </div>
          {/if}
          <div class="description">
            {#if patientTicketDetails.description !== ""}
              <span> Description</span>
              <p>{patientTicketDetails.description}</p>
            {/if}
          </div>
          <div class="photo">
            {#if patientTicketDetails.conditionImage}
              <span>Attachment/s</span>
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
      </div>
    </div>
    <div class="actions">
      <div class="button">
        <button on:click={handleSendNurse} title="Send Nurse to Patient"
          ><i class="las la-user-md" /> Send Nurse</button
        >
      </div>
      <div class="button">
        <button on:click={handleVisitHospital} title="Suggest Visiting Hospital"
          ><i class="las la-clinic-medical" /> Visit Hospital</button
        >
      </div>
      <div class="danger">
        <button on:click={handleDelete} title="Delete the ticket"
          ><i class="las la-trash" /> Delete</button
        >
      </div>
      <div class="button">
        <button on:click={downloadPDF} title="Download"
          ><i class="las la-user-md" />Download PDF</button
        >
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
  </div>
</main>

<style>
  main {
    margin-left: 300px;
  }
  .toast {
    font-family: "Poppins", sans-serif;
    position: relative;
    top: 25px;
    right: 35px;
    margin-left: 60rem;
    margin-bottom: 3rem;
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
    margin-top: 5%;
    margin-right: 1rem;
    padding: 1rem;
    border-radius: 1.8rem;
    box-sizing: border-box;
    box-shadow: 0 2rem 3rem #cbd3dd;
    /* display: flex;
    justify-items: center; */
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
  .conditionPhoto {
    align-items: center;
    margin-top: 1.5rem;
    position: relative;
    margin-left: 40%;
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
  .secondary_title {
    text-decoration: underline;
    display: block;
  }
  .contact_details {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    text-align: center;
  }
  .title span {
    text-align: center;
    font-size: 1.8rem;
    color: white;
  }
  .title {
    display: block;
    margin: 3px;
    padding: 0.5rem;
    border-radius: 1.8rem;
    background-color: #6d8baa;
    text-align: center;
  }
  .emergency_contact {
    margin-top: 5px;
  }
  .name span,
  .email span,
  .contact_no span,
  .line span,
  .city span,
  .state span,
  .created_on span,
  .condition span,
  .medication span,
  .symptoms span,
  .medication_allergy span,
  .medications span,
  .measurements_1 span,
  .measurements_2 span,
  .measurements_3 span,
  .description span,
  .photo span {
    color: #2e6e8a;
    font-weight: bold;
    font-size: 0.9rem;
  }
  .name p,
  .email p,
  .contact_no p,
  .line p,
  .city p,
  .state p,
  .created_on p,
  .condition p,
  .medication p,
  .symptoms p,
  .medication_allergy p,
  .medications p,
  .measurements_1 p,
  .measurements_2 p,
  .measurements_3 p,
  .description p {
    color: #263c56;
    font-weight: bold;
  }
  .name,
  .line,
  .symptoms,
  .measurements_1,
  .created_on {
    text-align: start;
  }
  .contact_no,
  .state,
  .medication,
  .medications,
  .measurements_3 {
    text-align: end;
  }
</style>
