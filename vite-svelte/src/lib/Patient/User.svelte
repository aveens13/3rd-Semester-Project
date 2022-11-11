<script>
  export let responseObject;
  const time = responseObject.response.birthDate;
  const date = new Date(time);
  const dateCreated = date.toDateString();
</script>

<main class="wrapper">
  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            alt=""
            class="rounded-circle"
            width="300px"
            src="https://media-exp1.licdn.com/dms/image/C4D0BAQGAUbVRtYhCwQ/company-logo_200_200/0/1645348114439?e=2147483647&v=beta&t=HCurpBmcJTOwhmVcC5UkJTuxuCJRguldsHPRhoqyU9c"
          />
        </div>
      </div>
      <div class="col-md-5 border-right">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Patient Information</h4>
          </div>
          <div class="row mt-2">
            <div class="col-md-12">
              <label for="patientId" class="labels">PatientID</label>
              <p class="form-control">{responseObject.response._id}</p>
            </div>
            <div class="name">
              <div class="col-md-6">
                <label for="firstName" class="labels">Name</label>
                <p class="form-control">
                  {responseObject.response.name[0].given[0]}
                </p>
              </div>
              <div class="col-md-6">
                <label for="lastName" class="labels">Surname</label>
                <p class="form-control">
                  {responseObject.response.name[0].family}
                </p>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label for="Number" class="labels">Mobile Number</label>
              <p class="form-control">
                {responseObject.response.telecom[0].value}
              </p>
            </div>
            <div class="col-md-12">
              <label for="Address" class="labels">Address</label>
              <p class="form-control">
                {responseObject.response.address[0].line[0] +
                  " ," +
                  responseObject.response.address[0].city}
              </p>
            </div>
            <div class="col-md-12">
              <label for="dob" class="labels">Date of Birth</label>
              <p class="form-control">{dateCreated}</p>
            </div>
            <div class="col-md-12">
              <label for="sex" class="labels">Sex</label>
              <p class="form-control">
                {responseObject.response.gender.toUpperCase()}
              </p>
            </div>
            <div class="col-md-12">
              <label for="age" class="labels">Age</label>
              <p class="form-control">19yrs 7m 0d</p>
            </div>
            <div class="col-md-12">
              <label for="email" class="labels">Email</label>
              <p class="form-control">
                {responseObject.response.telecom[1].value}
              </p>
            </div>
            <!-- <div class="col-md-12">
              <label for="refer" class="labels">Reffered by</label>
              <p class="form-control">Yadav Bhatta</p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  main {
    margin-left: 250px;
    margin-bottom: 100px;
  }
  .form-control:focus {
    box-shadow: none;
    border-color: #ba68c8;
  }

  .text-right {
    font-size: 30px;
    margin-left: 100px;
  }

  .name {
    display: flex;
    margin-right: 3rem;
  }
  .name p {
    margin-right: 3rem;
  }
  .labels {
    font-weight: bold;
  }
  .rounded-circle {
    border-radius: 150px;
  }
</style>
