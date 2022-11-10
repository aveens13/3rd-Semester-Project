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
    } else {
      const result = await response.json();
      swal({
        title: "Cannot create a ticket",
        text: "Please fill up the form",
        icon: "error",
      });
      console.log(result);
    }
  }
</script>

<div class={active ? "container active" : "container"}>
  <form
    id="diabetes"
    method="POST"
    action="/api/createTicket"
    on:submit|preventDefault={submitHandler}
    enctype="multipart/form-data"
  >
    <input type="hidden" name="type" value="Diabetes" />
    <div class="form">
      <h1>Fill up form for Diabetes</h1>
      <br />
      <h3>Measurements</h3>
      <div class="flex-measurements">
        <div class="measurements">
          <label for="HbA1c">HbA1c Level</label>
          <input
            type="number"
            id="HbA1c"
            placeholder="in %"
            name="hba"
            required
          />
        </div>

        <div class="measurements">
          <label for="fasting">Glucose Level(Fasting)</label>
          <input
            type="number"
            id="fasting"
            placeholder="in mg/dL"
            name="glucoseFasting"
            required
          />
        </div>

        <div class="measurements">
          <label for="random">Glucose Level(Random)</label>
          <input
            type="number"
            id="random"
            placeholder="in mg/dL"
            name="glucoseRandom"
            required
          />
        </div>
      </div>
      <hr />

      <div class="flex-symptoms">
        <h3>Symptoms</h3>
        <div class="symptoms">
          <label>
            <input
              type="checkbox"
              value="Urinate a lot"
              name="symptom"
            />Urinate a lot</label
          >

          <label>
            <input type="checkbox" value="Are very thirsty" name="symptom" />Are
            very thirsty</label
          >

          <label>
            <input type="checkbox" value="Are very hungry" name="symptom" />Are
            very hungry</label
          >

          <label>
            <input
              type="checkbox"
              value="Have numb or tingling hands or feet"
              name="symptom"
            />Have numb or tingling hands or feet</label
          >
        </div>
        <div class="symptoms">
          <label>
            <input type="checkbox" value="Feel very tired" name="symptom" />Feel
            very tired</label
          >

          <label>
            <input
              type="checkbox"
              value="Have very dry skin"
              name="symptom"
            />Have very dry skin</label
          >

          <label>
            <input
              type="checkbox"
              value="Have sores that heal slowly"
              name="symptom"
            />Have sores that heal slowly</label
          >

          <label>
            <input
              type="checkbox"
              value="Have more infections than usual"
              name="symptom"
            />Have more infections than usual</label
          >
        </div>
      </div>
      <hr />
      <h3>Others</h3>
      <div class="others">
        <label for="description"
          >Description(can be symptoms,concerns or questions)</label
        >
        <textarea
          id="description"
          placeholder="Symptoms , Concerns or Questions"
          name="desc"
        />
        <br />
        <label for="attachements">Attachments(Test reports,medications)</label>
        <input type="file" id="attachments" name="photo" />
      </div>

      <input type="submit" value="Submit" id="submit" />
    </div>
  </form>
</div>

<style>
  .container {
    margin-left: 50px;
  }
  .form {
    margin: 50px 200px 50px 250px;

    background-color: white;
    font-family: "Poppins", sans-serif;
    outline-color: #6d8baa;
    outline-offset: 25px;
    outline-style: groove;
  }
  h1 {
    font-size: 32px;
    position: relative;
    text-align: center;
  }
  h3 {
    font-size: 20px;
    text-align: left;
    text-decoration: underline;
  }
  .measurements {
    display: flex;
  }
  .flex-measurements {
    display: flex;
    flex-direction: row;
    flex-basis: 100%;
    justify-content: space-evenly;
    align-items: center;
  }
  .flex-symptoms {
    display: flex;
    flex-direction: column;
  }

  .symptoms {
    display: flex;
    flex-direction: column;
  }
  /* h4{
  text-decoration: underline;
}  */
  input[type="number"] {
    display: inline;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;
  }
  input[type="checkbox"] {
    cursor: pointer;
  }

  .others {
    display: grid;
  }
  textarea {
    padding: 15px 10px 15px 10px;
    border-radius: 5px;
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
    height: 50px;
  }
  input[type="file"] {
    cursor: pointer;
    padding: 5px 10px 5px 10px;
  }
  form input[type="submit"] {
    margin: 20px 0;
    font-size: 1rem;
    width: 15%;
    color: black;
    background-color: #6d8baa;
    border: none;
    outline: none;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    transition: all 200ms ease-in;
  }
  form input[type="submit"]:hover {
    background-color: #6d8bbb;
  }
  label {
    font-family: "Poppins", sans-serif;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
  }
</style>
