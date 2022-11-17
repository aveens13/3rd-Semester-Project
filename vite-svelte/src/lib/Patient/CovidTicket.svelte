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

<main>
  <!-- Covid-19 form fill-up -->
  <div class={active ? "container active" : "container"}>
    <form
      id="covid"
      method="POST"
      action="/api/createTicket"
      on:submit|preventDefault={submitHandler}
      enctype="multipart/form-data"
    >
      <input type="hidden" name="type" value="Covid" />
      <div class="outform">
        <div class="form">
          <h1>Fill up form for Covid-19</h1>

          <h3 class="title">Measurements</h3>
          <div class="flex-measurements">
            <div class="measurements">
              <label for="oxygen">Oxygen Saturation</label>
              <input
                type="number"
                id="oxygen"
                name="oxygen"
                placeholder="98"
                required
              />
            </div>
            <div class="measurements">
              <label for="temperature">Temperature</label>
              <input
                type="number"
                id="temperature"
                name="temperature"
                placeholder="98"
                required
              />
            </div>
            <div class="measurements">
              <label for="heart">Heart Rate</label>
              <input
                type="number"
                id="heart"
                name="heart"
                placeholder="60 bpm"
                required
              />
            </div>
            <div class="measurements">
              <label for="weight">Weight</label>
              <input
                type="number"
                id="weight"
                name="weight"
                placeholder="60Kg"
                required
              />
            </div>
          </div>

          <hr />

          <h3 class="title">
            Symptoms(Tick the ones that you have experienced)
          </h3>
          <div class="flex-symptoms">
            <h4>Common symptoms</h4>
            <div class="symptoms">
              <label for="cough">
                <input
                  type="checkbox"
                  value="cough"
                  id="cough"
                  name="symptom"
                />Cough</label
              >

              <label for="fever">
                <input
                  type="checkbox"
                  value="fever"
                  id="fever"
                  name="symptom"
                />Fever</label
              >

              <label for="tiredness">
                <input
                  type="checkbox"
                  value="Tiredness"
                  id="tiredness"
                  name="symptom"
                />Tiredness</label
              >

              <label for="Loss of Taste or Smell">
                <input
                  type="checkbox"
                  value="Loss of Taste or Smell"
                  id="Loss of Taste or Smell"
                  name="symptom"
                />Loss of Taste or smell</label
              >
            </div>

            <h4>Least common symptoms</h4>
            <div class="symptoms">
              <label for="sore throat">
                <input
                  type="checkbox"
                  value="sore throat"
                  id="sore throat"
                  name="symptom"
                />Sore throat</label
              >

              <label for="headache">
                <input
                  type="checkbox"
                  value="headache"
                  id="headache"
                  name="symptom"
                />Headache</label
              >

              <label for="aches">
                <input
                  type="checkbox"
                  value="Aches and pains"
                  id="aches"
                  name="symptom"
                />Aches and Pains</label
              >
            </div>
            <div class="symptoms">
              <label for="diarrhoea">
                <input
                  type="checkbox"
                  value="Diarrhoea"
                  id="diarrhoea"
                  name="symptom"
                />Diarrhoea</label
              >

              <label for="rashes">
                <input
                  type="checkbox"
                  value="Rashes on Skins"
                  id="rashes"
                  name="symptom"
                />Rashes/Discolouration
              </label>

              <label for="eyes">
                <input
                  type="checkbox"
                  value="Red or Irritated Eyes"
                  id="eyes"
                  name="symptom"
                />Red or Irritated Eyes</label
              >
            </div>

            <h4>Serious Symptoms</h4>
            <div class="symptoms">
              <label for="Difficulty Breathing">
                <input
                  type="checkbox"
                  value="Difficulty Breathing"
                  name="symptom"
                />Difficulty Breathing</label
              >

              <label for="Loss of Speech/Confusion">
                <input
                  type="checkbox"
                  value="Loss of Speech/Confusion"
                  name="symptom"
                />Loss of Speech/Confusion</label
              >

              <label for="Chest Pain">
                <input type="checkbox" value="Chest Pain" name="symptom" />Chest
                Pain</label
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
              placeholder="Symptoms,concerns or questions"
              name="desc"
            />
            <br />
            <label for="attachements"
              >Attachments(Test reports,medications)</label
            >
            <input type="file" id="attachments" name="photo" />
          </div>

          <input type="submit" value="Submit" id="submit" />
        </div>
      </div>
    </form>
  </div>
</main>

<style>
  .container {
    margin-left: 120px;
    transition: all 0.5s ease;
  }
  .container.active {
    margin-left: 300px;
  }
  main .form {
    margin: 50px 50px 50px 0;
    background-color: white;
    font-family: "Poppins", sans-serif;
    outline-color: #6d8baa;
    outline-offset: 25px;
    /* outline-style: groove; */
  }
  h1 {
    font-size: 32px;
    position: relative;
    text-align: center;
  }
  h3 {
    font-size: 20px;
    text-align: left;
    /* text-decoration: underline; */
  }
  .measurements {
    display: flex;
  }
  .flex-measurements {
    display: flex;
    flex-direction: row;
    flex-basis: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .flex-symptoms {
    display: flex;
    flex-direction: column;
  }

  .symptoms {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  h4 {
    text-decoration: underline;
  }
  input[type="number"] {
    display: inline;
    margin-left: 10px;
    font-family: "Poppins", sans-serif;
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
    height: 50px;
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
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
    font-size: 1rem;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
    margin-right: 0.8rem;
  }
</style>
