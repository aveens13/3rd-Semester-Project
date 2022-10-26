<main>
  <form action="/api/create" method="POST" enctype="multipart/form-data">
    <input type="file" name="photo" id="photo" />
    <input type="submit" value="Upload" />
  </form>
  <img
    src="http://localhost:5173/api/getimage/6357cdf41eab295edb088557"
    alt=""
  />
</main>

<style>
  main {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  main img {
    width: 100px;
    margin-left: 1rem;
    height: 100px;
    border-radius: 1.8rem;
  }
  .heading {
    color: #319ac7;
  }
</style>
