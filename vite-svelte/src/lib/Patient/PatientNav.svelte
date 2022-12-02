<script>
  export let active;
  export let state;
  export let patientState;
  export let responseNav;
  export let ticketActive;
  import swal from "sweetalert";
  let name =
    responseNav.response.name[0].given[0] +
    " " +
    responseNav.response.name[0].family;
  console.log(name);
  function logoutSession() {
    swal({
      title: "Log Out",
      text: "Are you sre you want to log out?",
      icon: "warning",
      //@ts-ignore
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("/api/logout").then((result) => {
          result.json().then((e) => {
            if (e.status == "logout") {
              state = "login";
            }
          });
        });
      }
    });
  }
</script>

<main>
  <div class={active ? "sidebar active" : "sidebar"}>
    <div class="logo_content">
      <div class="logo">
        <i class="bx bx-health" />
        <div class="logo_name">Pluscare</div>
      </div>
      <i class="bx bx-menu" id="btn" on:click={() => (active = !active)} />
    </div>
    <ul class="nav_list">
      <li on:click={() => (patientState = "dashboard")}>
        <span class="a">
          <i class="bx bx-grid-alt" />
          <span class="links_name">Dashboard</span>
        </span>
        <span class="tooltip">Dashboard</span>
      </li>
      <li on:click={() => (patientState = "user")}>
        <span class="a">
          <i class="bx bx-user" />
          <span class="links_name">User</span>
        </span>
        <span class="tooltip">User</span>
      </li>
      <li
        on:click={() => (ticketActive = true)}
        on:click={() => (patientState = "tickets")}
      >
        <span class="a">
          <i class="bx bx-message-square-check" />
          <span class="links_name">Tickets</span>
        </span>
        <span class="tooltip">Tickets</span>
      </li>
      <li on:click={() => (patientState = "payment")}>
        <span class="a">
          <i class="bx bx-credit-card" />
          <span class="links_name">Payment</span>
        </span>
        <span class="tooltip">Payment</span>
      </li>
    </ul>
    <div class="profile_content">
      <div class="profile">
        <div class="profile_details">
          <img src="" alt="" />
          <div class="name_job">
            <div class="name">{name}</div>
            <div class="job">Patient</div>
          </div>
        </div>
        <i class="bx bx-log-out" id="log_out" on:click={logoutSession} />
      </div>
    </div>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap");
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  main {
    position: relative;
    /* min-height: 98vh; */
    /* width: 100%; */
    overflow: hidden;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 78px;
    background: #6d8baa;
    padding: 6px 14px;
    transition: all 0.5s ease;
  }
  .sidebar.active {
    width: 240px;
  }
  .sidebar .logo_content .logo {
    color: #fff;
    display: flex;
    height: 50px;
    width: 100%;
    align-items: center;
    opacity: 0;
    pointer-events: none;
  }
  .sidebar.active .logo_content .logo {
    opacity: 1;
    pointer-events: none;
  }
  .logo_content .logo i {
    font-size: 28px;
    margin-right: 5px;
  }
  .logo_content .logo .logo_name {
    font-size: 20px;
    font-weight: 400;
  }
  .sidebar #btn {
    position: absolute;
    color: #fff;
    left: 50%;
    cursor: pointer;
    top: 6px;
    font-size: 20px;
    height: 50px;
    width: 50px;
    text-align: center;
    line-height: 50px;
    transform: translateX(-50%);
  }
  .sidebar.active #btn {
    left: 90%;
  }
  .sidebar ul {
    margin-top: 20px;
  }
  .sidebar ul li {
    position: relative;
    list-style: none;
    margin: 0 5px;
    height: 50px;
    width: 100%;
    line-height: 50px;
  }
  .sidebar ul li .tooltip {
    position: absolute;
    left: 80px;
    top: 0;
    transform: translateY(-50%, -50%);
    border-radius: 9px;
    height: 35px;
    width: 122px;
    line-height: 35px;
    text-align: center;
    background: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0s;
    opacity: 0;
    pointer-events: none;
    display: block;
  }
  .sidebar.active ul li .tooltip {
    display: none;
  }
  .sidebar ul li:hover .tooltip {
    transition: all 0.5s ease;
    top: 50%;
    opacity: 1;
  }
  .sidebar ul li .a {
    color: #fff;
    display: flex;
    align-items: center;
    transition: all 0.4s ease;
    border-radius: 18px;
    white-space: nowrap;
  }
  .sidebar ul li .a:hover {
    background: #fff;
    color: #6d8baa;
    cursor: pointer;
  }
  .sidebar.active ul li .a i {
    font-size: 14px;
  }
  .sidebar ul li .a i {
    height: 50px;
    min-width: 50px;
    font-size: 20px;
    border-radius: 12px;
    line-height: 50px;
    text-align: center;
    transition: all 100ms ease-in;
  }
  .sidebar .links_name {
    opacity: 0;
    pointer-events: none;
  }
  .sidebar.active .links_name {
    opacity: 1;
    pointer-events: auto;
  }
  .sidebar .profile_content {
    position: absolute;
    color: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .sidebar .profile_content .profile {
    position: relative;
    padding: 10px 6px;
    height: 60px;
  }
  .profile_content .profile .profile_details {
    display: flex;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    white-space: nowrap;
  }
  .sidebar.active .profile .profile_details {
    opacity: 1;
    pointer-events: auto;
  }
  .profile .profile_details .name_job {
    margin-left: 10px;
  }
  .profile .profile_details .name {
    font-size: 15px;
    font-weight: 400;
  }
  .profile .profile_details .job {
    font-size: 12px;
  }
  .profile #log_out {
    position: absolute;
    left: 50%;
    bottom: 5px;
    transform: translateX(-50%);
    min-width: 50px;
    line-height: 50px;
    font-size: 20px;
    border-radius: 12px;
    cursor: pointer;
    text-align: center;
  }
  .sidebar.active .profile #log_out {
    left: 88%;
  }
</style>
