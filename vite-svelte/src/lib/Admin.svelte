<script>
</script>

<navbar>
  <nav>
    <ul class="navlist">
      <li class="nav-item">
        <span>Hello Admin</span>
      </li>
      <li class="nav-item">
        <span>Create a user</span>
      </li>
      <li class="nav-item">
        <span>See tickets</span>
      </li>
      <li class="nav-item">
        <span>Create an ticket</span>
      </li>
      <li class="nav-item">
        <button class="btn-primary">Log Out</button>
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
    justify-content: flex-end;
    align-items: center;
  }

  .nav-item {
    list-style: none;
    margin-right: 2rem;
  }
  .nav-item:first-child {
    margin-right: auto;
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
</style>
