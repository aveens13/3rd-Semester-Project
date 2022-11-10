<script>
  import { fade, slide } from "svelte/transition";
  import swal from "sweetalert";
  export let state;
  export let click;
  export let navStatus;

  function clickedHome() {
    click = "home";
    navStatus = "Dashboard";
  }
  function clickedRegister() {
    click = "register";
    navStatus = "Registration";
  }
  function clickedsee() {
    click = "seeTickets";
    navStatus = "See Tickets";
  }
  function clickedCreate() {
    click = "createTicket";
    navStatus = "Create Ticket";
  }
  function logoutButton() {
    swal({
      title: "Log Out",
      text: "Are you sre you want to log out?",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        state = "n";
      }
    });
  }
</script>

<body in:fade>
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
        <li on:click={logoutButton}>
          <span class="logout">
            <i class="bx bx-log-out" id="log_out" />
          </span>
        </li>
      </ul>
    </div>
  </div>
  <div class="main-content">
    <header>
      <div class="header-title">
        <h2>
          <label for="">
            <span class="las la-bars" /><span in:fade>{navStatus}</span>
          </label>
        </h2>
      </div>
      <div class="user-wrapper">
        <i
          on:click={() => {
            click = "adminInfo";
            navStatus = "Admin";
          }}
          class="las la-user-nurse"
        />
      </div>
    </header>
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
  #log_out {
    position: absolute;
    left: 50%;
    bottom: 5px;
    transform: translateX(-50%);
    min-width: 50px;
    line-height: 50px;
    color: #fff;
    font-size: 20px;
    border-radius: 12px;
    cursor: pointer;
    text-align: center;
  }
  .main-content {
    margin-left: 250px;
  }
  header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    /* box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); */
  }
  header h2 {
    color: #222;
  }
  header label span {
    font-size: 1.5rem;
    padding-right: 1rem;
  }
  .user-wrapper {
    display: flex;
    align-items: center;
  }
  .user-wrapper i {
    font-size: 50px;
    border-radius: 50%;
    margin-right: 1rem;
  }
  .user-wrapper i:hover {
    cursor: pointer;
  }
</style>
