<script>
  async function onSubmit(event) {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const plainFormdata = Object.fromEntries(formData.entries());
    const formDatainJSON = JSON.stringify(plainFormdata);
    const response = await fetch("/api/register-patient", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: formDatainJSON,
    });
  }
</script>

<main>
  <div class="container">
    <header>Registration</header>
    <form
      method="POST"
      action="/api/register-patient"
      on:submit|preventDefault={onSubmit}
    >
      <span class="title">Personal Details</span>
      <div class="fields">
        <div class="input-field">
          <label for="first name">First name</label>
          <input
            type="text"
            id="first name"
            name="firstName"
            placeholder="First Name"
            required
          />
        </div>
        <div class="input-field">
          <label for="first name">Middle name</label>
          <input
            type="text"
            id="middle name"
            name="middleName"
            placeholder="Middle Name"
          />
        </div>
        <div class="input-field">
          <label for="last name">Last name</label>
          <input
            type="text"
            id="last name"
            name="lastName"
            placeholder="Last Name"
            required
          />
        </div>
        <!-- Birthdate -->
        <div class="input-field">
          <label for="birthdate">Birthdate</label>
          <input type="date" id="dob" name="birthDate" required />
        </div>
        <div class="input-field">
          <label for="occupation">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            placeholder="Business"
          />
        </div>
        <div class="input-field">
          <label for="blood">Blood Group</label>
          <input type="text" id="blood" name="bloodGroup" placeholder="A+" />
        </div>
      </div>

      <!-- Gender -->
      <div class="title">Gender</div>
      <div class="radios">
        <div class="input-radio">
          <input type="radio" id="male" value="male" name="gender" />
          <label for="male">Male</label>
        </div>
        <div class="input-radio">
          <input type="radio" id="female" value="female" name="gender" />
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
          <label for="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            name="patientEmail"
          />
        </div>
        <div class="input-contact">
          <label for="phone">Mobile no.</label>
          <input
            type="text"
            id="phone"
            name="patientNumber"
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
          <input type="text" id="street" name="streetName" required />
        </div>
        <div class="input-field">
          <label for="city">City</label>
          <input type="text" id="city" name="cityName" required />
        </div>
        <div class="input-field">
          <label for="state">State</label>
          <input type="text" id="state" name="stateName" required />
        </div>
      </div>
      <div class="buttonHolder">
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap");
  main {
    max-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins", sans-serif;
  }
  .container {
    position: relative;
    max-width: 1600px;
    border-radius: 6px;
    padding: 30px;
    margin: 20px 15px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
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
    color: #333;
  }
  .container form .fields {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  form .fields .input-field {
    display: flex;
    width: calc(100% / 3 - 30px);
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
    margin: 4px 0;
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
  /* .buttonHolder {
    text-align: center;
  } */
</style>
