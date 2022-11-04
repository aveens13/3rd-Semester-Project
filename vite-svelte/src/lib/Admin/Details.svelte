<script>
  export let user;
  console.log(user);
</script>

<main>
  <div class="heading">
    <h4>Name: {user.name[0].given[0]} {user.name[0].family}</h4>
  </div>
</main>

<style>
  main {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .heading {
    color: #319ac7;
  }
</style>
