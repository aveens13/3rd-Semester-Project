<script>
  import logo from "../assets/pl.jpg";
  import hero from "../assets/hero.jpg";
  import { fade } from "svelte/transition";
  export let state;
</script>

<main in:fade>
  <div class="big-wrapper">
    <header>
      <div class="container">
        <div class="logo">
          <img src={logo} alt="Logo" />
          <h3>PlusCare</h3>
        </div>
        <div class="links">
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li>
              <span class="a btn" on:click={() => (state = "login")}>Login</span
              >
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="showcase-area">
      <div class="container">
        <div class="left">
          <div class="big-title">
            <h1>Remote Patient Monitoring</h1>
            <h1>Visit our nearest location.</h1>
          </div>
          <p class="text">
            We remotely monitor your health by providing IOMT devices. We use
            technologies to build the bridge that space between the traditional
            physical setting of healthcare, and where people really want to live
            every day.
          </p>
          <div class="cta">
            <span class="a btn" on:click={() => (state = "login")}
              >Get Started</span
            >
          </div>
        </div>
        <div class="right">
          <img src={hero} alt="Hero" class="person" />
        </div>
        <div id="features" class="features">
          <!--  -->
        </div>
      </div>
    </div>

    <div class="bottom-area">
      <div class="conatiner">
        <!--  -->
      </div>
    </div>
  </div>
</main>

<style>
  :root {
    --mainColor: #6d8baa;
    --hoverColor: #5bacdf;
    --backgroundColor: #fff;
    --darkOne: #312f3a;
    --darkTwo: #45424b;
    --lightOne: #919191;
    --lightTwo: #aaa;
  }
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  main {
    font-family: "Poppins", sans-serif;
  }
  img {
    width: 100%;
  }
  .a,
  a {
    text-decoration: none;
    cursor: pointer;
  }
  .big-wrapper {
    padding: 1.7rem 0 2rem;
    width: 100%;
    min-height: 98vh;
    overflow: hidden;
    background-color: var(--backgroundColor);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .container {
    position: relative;
    max-width: 81rem;
    width: 100%;
    margin: 0 auto;
    padding: 0 3rem;
    z-index: 10;
  }
  header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .logo h3 {
    color: var(--darkTwo);
    font-size: 1.55rem;
    line-height: 1.2rem;
    font-weight: 700;
  }
  .logo img {
    width: 50px;
    margin-right: 0.6rem;
    margin-top: -0.6rem;
  }
  .links ul {
    display: flex;
    list-style: none;
    align-items: center;
  }
  .links .a,
  a {
    color: var(--lightTwo);
    margin-left: 4.5rem;
    display: inline-block;
    transition: 0.3s;
  }
  .links .a,
  a:hover {
    color: var(--hoverColor);
    transform: scale(1.05);
  }
  .btn {
    display: inline-block;
    padding: 0.9rem 1.9rem;
    color: #fff !important;
    background-color: var(--mainColor);
    border-radius: 1rem;
    text-transform: capitalize;
    transition: 0.3s;
  }
  .btn:hover {
    background-color: var(--hoverColor);
    transform: scale(1) !important;
  }
  .showcase-area .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
  }
  .big-title {
    font-size: 1.4rem;
    color: var(--darkOne);
    text-transform: capitalize;
    line-height: 1.4;
  }
  .text {
    color: var(--lightOne);
    font-size: 1.1rem;
    margin: 1.9rem 0 2.5rem;
    max-width: 600px;
    line-height: 2.3;
  }
  .showcase-area .btn {
    box-shadow: 0 0 40px 2px rgba(0, 0, 0, 0.05);
  }
  .person {
    width: 123%;
    transform: translate(15%, 25px);
    border-radius: 1.8rem;
    opacity: 85%;
  }
</style>
