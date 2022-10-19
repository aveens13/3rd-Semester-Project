<script>
  export let state;
  export let click;
  function clickedHome() {
    click = "home";
  }
  function clickedRegister() {
    click = "register";
  }
  function clickedsee() {
    click = "seeTickets";
  }
  function clickedCreate() {
    click = "createTicket";
  }
  async function logoutButton() {
    state = "n";
  }
</script>

<body>
  <div class="sidebar">
    <div class="sidebar-brand">
      <h2><span>Pluscare</span></h2>
    </div>
    <div class="sidebar-menu">
      <ul>
        <li on:click={clickedHome}>
          <span class="a"
            ><span class="las la-igloo" /><span>Dashboard</span></span
          >
        </li>
        <li on:click={clickedRegister}>
          <span class="a"
            ><span class="las la-users" /><span>Register a patient</span></span
          >
        </li>
        <li on:click={clickedsee}>
          <span class="a"
            ><span class="las la-clipboard-list" /><span>See Tickets</span
            ></span
          >
        </li>
        <li on:click={clickedCreate}>
          <span class="a"
            ><span class="las la-receipt" /><span>Create Tickets</span></span
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="main-content">
    <header>
      <div class="header-title">
        <h2>
          <label for="">
            <span class="las la-bars" /><span>Dashboard</span>
          </label>
        </h2>
      </div>
      <div class="user-wrapper">
        <img src="./admin.png" alt="" />
        <div>
          <h4>Admin</h4>
        </div>
      </div>
    </header>
    <!-- <main>
      <div class="cards">
        <div class="card-single">
          <div>
            <h1>41</h1>
            <span>Patients</span>
          </div>
          <div>
            <span class="las la-users" />
          </div>
        </div>
        <div class="card-single">
          <div>
            <h1>41</h1>
            <span>Tickets</span>
          </div>
          <div>
            <span class="las la-clipboard" />
          </div>
        </div>
        <div class="card-single">
          <div>
            <h1>41</h1>
            <span>Remaining</span>
          </div>
          <div>
            <span class="las la-clipboard" />
          </div>
        </div>
      </div>
    </main> -->
  </div>
</body>

<style>
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style-type: none;
    text-decoration: none;
    font-family: "Poppins", sans-serif;
  }
  .sidebar {
    width: 250px;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    background: #6d8baa;
  }
  .sidebar-brand {
    height: 90px;
    padding-top: 1rem;
    padding-right: 0rem;
    padding-left: 2rem;
    padding-bottom: 1rem;
    color: #fff;
  }
  .sidebar-brand span {
    display: inline-block;
    padding-right: 1rem;
  }
  .sidebar ul {
    list-style: none;
  }
  .sidebar-menu {
    margin-top: 1rem;
  }
  .sidebar-menu li {
    width: 100%;
    margin-bottom: 1.7rem;
    padding-left: 0rem;
  }
  .sidebar-menu .a {
    display: block;
    color: #fff;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .sidebar-menu .a:hover {
    background: #fff;
    color: #6d8baa;
    border-radius: 30px 0px 0px 30px;
  }
  .sidebar-menu .a span:first-child {
    font-size: 1.5rem;
    padding-right: 1rem;
  }
  .main-content {
    margin-left: 250px;
  }
  header {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }
  header h2 {
    color: #222;
  }
  header label span {
    font-size: 1.7rem;
    padding-right: 1rem;
  }
  .user-wrapper {
    display: flex;
    align-items: center;
  }
  .user-wrapper img {
    border-radius: 50%;
    margin-right: 1rem;
  }
</style>
