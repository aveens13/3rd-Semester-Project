<script>
  import swal from "sweetalert";
  export let active;
  async function submitHandler(event) {
    const form = event.currentTarget;
    const formData = new FormData(form);
    console.log(formData);
    const response = await fetch("api/createTicket", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const result = await response.json();
      swal({
        title: "Ticket",
        text: "Successfully Created a ticket",
        icon: "success",
      });
      console.log(result);
    }
  }
</script>

<main>
  <div class={active ? "container active" : "container"}>
    <form
      method="POST"
      action="/api/createTicket"
      on:submit|preventDefault={submitHandler}
      enctype="multipart/form-data"
    >
      <div class="conditions">
        <h4>
          Check the conditions that apply to you:<span class="asterick"
            >&#42;</span
          >
        </h4>
        <div class="condition">
          <div class="conditioncheck">
            <input type="checkbox" name="condition" value="Asthma" />
            <label for="Asthama">Asthma</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="condition" value="cancer" />
            <label for="cancer">Cancer</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="condition" value="diabetes" />
            <label for="diabetes">Diabetes</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="condition" value="hypertension" />
            <label for="hypertension">Hypertension</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="condition" value="epilepsy" />
            <label for="epilepsy">Epilepsy</label>
          </div>
        </div>
      </div>
      <div class="symptoms">
        <h4>
          Check the symptoms that you are currently experiencing:<span
            class="asterick">&#42;</span
          >
        </h4>
        <div class="condition">
          <div class="conditioncheck">
            <input type="checkbox" name="symptom" value="chest-pain" />
            <label for="chest-pain">Chest Pain</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="symptom" value="respiratory" />
            <label for="respiratory">Respiratory</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="symptom" value="cardiac" />
            <label for="cardiac">Cardiac</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="symptom" value="neurological" />
            <label for="neurological">Neurological</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="symptom" value="gastro" />
            <label for="gastro">Gastrointestinal</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="symptom" value="weightgain" />
            <label for="weightgain">Weight Gain</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="symptom" value="weightloss" />
            <label for="weightloss">Weight Loss</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="symptom" value="headache" />
            <label for="headache">Headache</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="symptom" value="fever" />
            <label for="fever">Fever</label>
          </div>
          <div class="conditioncheck">
            <input type="checkbox" name="symptom" value="highbloodpressure" />
            <label for="highbloodpressure">High Blood Pressure</label>
          </div>
        </div>
      </div>
      <div class="medications">
        <h4>
          Are you taking any medications?<span class="asterick">&#42</span>
        </h4>
        <div class="medication">
          <div class="medicationRadio">
            <input type="radio" id="yes" name="medication" value="yes" />
            <label for="yes">Yes</label><br />
          </div>
          <div class="medicationRadio">
            <input type="radio" id="no" name="medication" value="no" />
            <label for="no">No</label><br />
          </div>
          <h4>If yes then please imply:</h4>
          <textarea
            name="medicine"
            id="medicine"
            class="textarea"
            cols="10"
            rows="5"
            placeholder="Please mention your medicines here"
          />
        </div>
        <h4>
          Do you have any medication allergies?<span class="asterick">&#42</span
          >
        </h4>
        <div class="medication">
          <div class="medicationRadio">
            <input type="radio" id="yes" name="medicationAllergy" value="yes" />
            <label for="yes">Yes</label><br />
          </div>
          <div class="medicationRadio">
            <input type="radio" id="no" name="medicationAllergy" value="no" />
            <label for="no">No</label><br />
          </div>
          <div class="medicationRadio">
            <input
              type="radio"
              id="not-sure"
              name="medicationAllergy"
              value="not-sure"
            />
            <label for="not-sure">Not Sure</label><br />
            <h4>If yes then please imply:</h4>
            <textarea
              name="allergy"
              id="allergy"
              class="textarea"
              cols="10"
              rows="5"
              placeholder="Please mention your allergies here"
            />
          </div>
        </div>
      </div>
      <div class="conditionphoto">
        <label for="fieldphoto"
          >Do you have any image of the part where you have problem?</label
        >
        <div class="photo">
          <input
            type="file"
            accept="image/*"
            id="fieldphoto"
            name="photo"
            class="file_import"
          />
          <i class="las la-link" />
        </div>
      </div>
      <div class="submitButton">
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
</main>

<style>
  .asterick {
    color: red;
  }

  .textarea {
    background: #ebeaea;
    color: #666666;
    padding: 1em;
    border-radius: 0.8rem;
    border: 2px solid transparent;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    line-height: 1.4rem;
    width: 300px;
    transition: all 0.2s;
  }
  .textarea:focus {
    cursor: text;
    color: #333333;
    background-color: white;
    border-color: #333333;
  }
  .container.active {
    margin-left: 250px;
    /* transition: all 0.5s ease; */
  }
  .container {
    margin-left: 100px;
    transition: all 0.5s ease;
  }
  .container h4 {
    font-family: "Poppins", sans-serif;
  }
  .condition {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem;
    margin-left: 2rem;
  }
  .condition .conditioncheck {
    padding: 0.5rem;
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
  }
  .conditionphoto {
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
  }
  .conditionphoto .photo .file_import {
    font-size: 1rem;
    margin: 1rem;
    font-family: "Poppins", sans-serif;
    border-radius: 2rem;
    width: 300px;
    border: 1px solid black;
  }
  .medication {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    padding: 1rem;
    margin-left: 2rem;
  }
  .medication .medicationRadio {
    padding: 0.5rem;
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
  }
  .submitButton input {
    padding: 1rem;
    width: 200px;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    background: #6d8baa;
    border: none;
    margin: 1rem;
    border-radius: 2rem;
  }
</style>
