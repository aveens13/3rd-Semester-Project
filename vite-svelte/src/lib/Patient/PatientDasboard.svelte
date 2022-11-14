<script>
  export let active;
  import { Label } from "@smui/snackbar";
  import { fade } from "svelte/transition";
</script>

<main in:fade>
  <div class={active ? "container active" : "container"}>
    <span class="dashboardTop"><h1>Dashboard</h1></span>
    <div class="main-box">
      <div class="first-box">
        <div class="history">
          <span>History</span>
          <div class="history-bar">
            <div class="search">
              <label for="search" style="margin-right:1rem;">Search</label
              ><input
                type="text"
                id="history-search"
                placeholder="Search here"
              />
            </div>
            <div class="history-sort">
              <label for="history-sort" style="margin-right: 1rem;"
                >Sort by</label
              >
              <select id="history-sort">
                <option for="history-sort" id="">Alphabet</option>
                <option for="history-sort" id="">By date(newest)</option>
                <option for="history-sort" id="">By date(oldest)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="notification">
        <span>Notification</span>
      </div>
    </div>
  </div>
</main>

<style>
  .container {
    margin-left: 100px;
    transition: all 0.5s ease;
  }
  .container.active {
    margin-left: 250px;
  }
  main {
    height: 96vh;
    margin-left: 80px;
    font-family: "Poppins", sans-serif;
    /* background-color: #f2f6fa; */
    margin-right: 20px;
  }
  .main-box {
    margin-top: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    min-height: 90vh;
  }
  .first-box {
    margin-top: 100px;
    width: 65%;
  }

  .history {
    display: flex;
    flex-direction: column;
    min-height: 60%;
    text-align: center;
    border-radius: 25px;
    background-color: #ffffff;
    box-shadow: 0rem 2rem 3rem rgba(132, 139, 200, 0.18);
  }
  .history-bar {
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    margin-top: 30px;
  }
  .search {
    display: flex;
    justify-content: flex-start;
    margin-left: 1rem;
  }
  .notification {
    margin-top: 20px;
    width: 25%;
    /* height: 95vh; */
    margin-bottom: 3rem;
    text-align: center;
    border-radius: 25px;
    background-color: #ffffff;
    box-shadow: 0.1rem 0rem 5rem 0.5rem rgba(132, 139, 200, 0.18);
  }
  .notification,
  .history span {
    font-size: 1.2rem;
  }
  .history-sort {
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
  }
  .history-sort label,
  select {
    margin-right: 0;
  }
</style>
