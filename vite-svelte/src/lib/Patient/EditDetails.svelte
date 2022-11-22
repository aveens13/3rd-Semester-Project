<script>
  import { fade } from "svelte/transition";
  import swal from "sweetalert";
  export let user;
  export let active;
  export let patientState;
  async function editDetails(event) {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const plainFormdata = Object.fromEntries(formData.entries());
    const formDatainJSON = JSON.stringify(plainFormdata);
    const response = await fetch(`/api/editPatient/${user._id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: formDatainJSON,
    });
    if (response.ok) {
      response.json().then((e) => {
        swal({
          title: "Updated",
          text: e.message,
          icon: "success",
        });
      });
    } else {
      response.json().then((e) => {
        swal({
          title: "Databse Error",
          text: e.message,
          icon: "error",
        });
      });
    }
  }
</script>

<main>
  <div class={active ? "container active" : "container"} in:fade>
    <header>Edit Details</header>
    <span class="asterick"
      >&#42; <i
        >You are registered under the Pluscare Org. and any details that are to
        be edited should follow the FHIR schema model.</i
      ></span
    >
    <span class="asterick">Inputs marked with &#42; should be edited</span>
    <form
      method="POST"
      action={"/api/editPatient/" + user._id}
      on:submit|preventDefault={editDetails}
    >
      <span class="title">Personal Details</span>
      <div class="fields">
        <div class="input-field">
          <label for="first name">First name</label>
          <input
            type="text"
            id="first name"
            name="firstName"
            value={user.name[0].given[0]}
            placeholder="Name"
          />
        </div>
        <!-- <div class="input-field">
          <label for="first name">Middle name</label>
          <input
            type="text"
            id="middle name"
            name="middleName"
            placeholder="Middle Name"
          />
        </div> -->
        <div class="input-field">
          <label for="last name">Last name</label>
          <input
            type="text"
            id="last name"
            name="lastName"
            value={user.name[0].family}
            placeholder="Surname"
          />
        </div>
        <!-- Birthdate -->
        <div class="input-field">
          <label for="birthdate"
            >Birthdate <span class="asterick">&#42;</span></label
          >
          <input type="date" id="dob" name="birthDate" required />
        </div>
        <div class="input-field">
          <label for="blood">Blood Group</label>
          <input
            type="text"
            id="blood"
            name="blood"
            value={user.blood}
            placeholder="Blood Group"
            required
          />
        </div>
        <div class="input-field">
          <label for="weight">Weight</label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={user.weight}
            placeholder="_ _ Kg"
            required
          />
        </div>
      </div>

      <!-- Gender -->
      <label for="gender">Gender <span class="asterick">&#42;</span></label>
      <div class="radios">
        <div class="input-radio">
          <input type="radio" id="male" value="Male" name="gender" />
          <label for="male">Male</label>
        </div>
        <div class="input-radio">
          <input type="radio" id="female" value="Female" name="gender" />
          <label for="female">Female</label>
        </div>
        <div class="input-radio">
          <input type="radio" id="others" value="others" name="gender" />
          <label for="others">Others</label>
        </div>
      </div>
      <div class="title">Contact information</div>
      <div class="contact">
        <div class="input-contact">
          <label for="phone">Mobile no.</label>
          <input
            type="text"
            id="phone"
            name="patientNumber"
            value={user.telecom[0].value}
            placeholder="+977"
            required
          />
        </div>
        <div class="input-contact">
          <label for="tele">Telephone no.</label>
          <input
            type="text"
            id="tele"
            name="patientTelephone"
            placeholder="01- "
          />
        </div>
      </div>
      <div class="title">Address</div>
      <div class="fields">
        <div class="input-field">
          <label for="street">Street name</label>
          <input
            type="text"
            id="street"
            name="streetName"
            value={user.address[0].line[0]}
            required
          />
        </div>
        <div class="input-field">
          <label for="city">City</label>
          <input
            type="text"
            id="city"
            name="cityName"
            value={user.address[0].city}
            required
          />
        </div>
        <div class="input-field">
          <label for="state">State</label>
          <input
            type="text"
            id="state"
            name="stateName"
            value={user.address[0].state}
            required
          />
        </div>
      </div>
      <div class="buttonHolder">
        <input type="submit" value="Update" />
      </div>
    </form>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap");
  .asterick {
    color: red;
    /* padding-left: 2rem; */
  }
  .asterick i {
    color: #ff7782;
  }
  main {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins", sans-serif;
  }
  .container.active {
    margin-left: 275px;
  }
  .container {
    position: relative;
    margin-left: 100px;
    /* max-width: 1600px; */
    border-radius: 6px;
    padding: 30px;
    margin-top: 3rem;
    /* box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1); */
    transition: all 0.5s ease;
    width: 100%;
  }
  .container header {
    font-size: 20px;
    margin-bottom: 30px;
    font-weight: 600;
    color: #333;
  }
  .container form {
    position: relative;
    min-height: 490px;
    margin-top: 16px;
    background-color: #fff;
  }
  .container form .title {
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 500;
    margin: 6px 0;
    color: #fff;
  }
  .container form .fields {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  form .fields .input-field {
    display: flex;
    width: calc(100% / 2 - 100px);
    padding-right: 5rem;
    flex-direction: column;
    margin: 4px 0;
  }
  .input-field label {
    font-size: 14px;
    font-weight: 500;
    color: #2e2e2e;
  }
  .input-field input {
    outline: none;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    border-radius: 5px;
    border: 1px solid #aaa;
    padding: 0 15px;
    height: 42px;
    margin: 8px 0;
  }
  .input-field input:is(:focus, :valid) {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.13);
  }
  .container form .radios {
    display: flex;
    align-items: left;
    margin-bottom: 15px;
  }
  form .radios .input-radio {
    display: flex;
    font-size: 16px;
    font-weight: 400;
    width: calc(100% / 5 - 30px);
    /* flex-direction: column; */
    margin: 4px 0;
  }
  .container form .contact {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  form .contact .input-contact {
    display: flex;
    width: calc(100% / 3 - 30px);
    flex-direction: column;
    margin: 4px 3rem 4px 0rem;
  }
  .input-contact label {
    font-size: 14px;
    font-weight: 500;
    color: #2e2e2e;
  }
  .input-contact input {
    outline: none;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    border-radius: 5px;
    border: 1px solid #aaa;
    padding: 0 15px;
    height: 42px;
    margin: 8px 0;
  }
  form input[type="submit"] {
    margin: 20px 0;
    font-size: 1rem;
    width: 15%;
    color: white;
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
  /* .buttonHolder {
      text-align: center;
    } */
  @media (max-width: 750px) {
    .container form {
      overflow-y: scroll;
    }
    .container form::-webkit-scrollbar {
      display: none;
    }
    form .fields .input-field {
      width: calc(100% / 2 - 30px);
    }
  }

  @media (max-width: 550px) {
    form .fields .input-field {
      width: 100%;
    }
  }
</style>
