<script>
  export let state;
  export let click;
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

<navbar>
  <nav>
    <input type="checkbox" id="check" />
    <label for="check" class="checkbtn">
      <i class="fa fa-bars" />
    </label>
    <ul class="navlist">
      <li class="nav-item">
        <span>Pluscare</span>
      </li>
      <li class="nav-item" on:click={clickedRegister}>
        <span>Register a patient</span>
      </li>
      <li class="nav-item" on:click={clickedsee}>
        <span>See tickets</span>
      </li>
      <li class="nav-item" on:click={clickedCreate}>
        <span>Create an ticket</span>
      </li>
      <li class="nav-item">
        <button class="btn-primary" on:click={logoutButton}>Log Out</button>
      </li>
    </ul>
  </nav>
</navbar>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
  .navlist {
    background-color: white;
    /* box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.25); */
    margin: 0;
    padding: 1rem 0;
    display: flex;
    font-family: "Montserrat", sans-serif;
    font-size: 16 px;
    font-weight: 500;
    justify-content: flex-end;
    align-items: center;
  }

  .nav-item {
    list-style: none;
    margin-right: 2rem;
  }
  .nav-item:first-child {
    margin-right: auto;
    font-weight: bold;
    font-size: 1.2rem;
    margin-left: 2rem;
  }
  .nav-item span {
    text-decoration: none;
    cursor: pointer;
    color: black;
    transition: all 200ms ease-in;
  }
  .nav-item span:hover {
    color: #6d8baa;
  }
  .btn-primary {
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    color: black;
    background-color: #6d8baa;
    border: none;
    outline: none;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    transition: all 200ms ease-in;
  }
  .btn-primary:hover {
    background-color: #6d8bbb;
  }
  .checkbtn {
    font-size: 30px;
    float: right;
    margin-right: 40px;
    line-height: 80px;
    cursor: pointer;
    display: none;
  }

  #check {
    display: none;
  }
  /* @media (max-width: 925px) {
      .nav-item:first-child {
        font-size: 30px;
        padding-left: 50px;
      }
      .navlist span {
        font-size: 16px;
      }
    }
    @media (max-width: 858px) {
      .checkbtn {
        display: block;
      }
      .navlist {
        position: fixed;
        width: 100%;
        height: 100vh;
        background: #2c3e50;
        top: 80px;
        left: 0;
        text-align: center;
      }
      .navlist {
        display: block;
      }
      .nav-item {
        padding: 10px;
      }
      .navlist span {
        font-size: 20px;
      }
      span:hover,
      span:active {
        background: none;
        color: #6d8baa;
      }
    } */
</style>
