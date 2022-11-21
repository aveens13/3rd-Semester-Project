<script>
  import logo from "../assets/pl.jpg";
  import hero from "../assets/hero.jpg";
  import f1 from "../assets/remote.png";
  import psg from "../assets/psg.jpg";
  import { fade, scale, slide } from "svelte/transition";
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
            <span class="a btn" on:click={() => (state = "googleMaps")}
              >Get Started
              <i class="las la-caret-square-right" />
            </span>
          </div>
        </div>
        <div class="right">
          <img src={hero} alt="Hero" class="person" />
        </div>
      </div>
    </div>

    <div class="features-area" id="features">
      <div class="container">
        <div class="feature-1">
          <div class="feature-title">
            <h1>Remotely Observe the Patients</h1>
          </div>
          <div class="bottom-area-features">
            <div class="feature-text">
              <p>
                We use digital technologies to monitor and capture medical and
                other health data from patients and electronically transmit this
                information to healthcare providers for assessment and, when
                necessary, recommendations and instructions.
              </p>
            </div>
            <div class="feature-image">
              <img src={f1} alt="Feature 1" />
            </div>
          </div>
        </div>
        <div class="feature-2">
          <div class="feature-title">
            <h1>Post-Surgery checkups at ease of your home</h1>
          </div>
          <div class="bottom-area-features">
            <div class="feature-image">
              <img src={psg} alt="Feature 1" />
            </div>
            <div class="feature-text">
              <p>
                The patient-generated medical data and remote patient monitoring
                after surgery can also help hospitals reduce the length of stay
                and number of readmissions. After surgery checkups are important
                but it is hard to always stay at the hospital for regular
                checkups.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="pricing" class="pricing-area" in:slide>
      <div class="container">
        <div class="card">
          <div class="price">NRs 555</div>
          <div class="month">per month</div>
          <div class="info-price">
            Best value for a single patient using our resources.
          </div>
          <div class="info">
            <i class="las la-check-circle" /> All resources available
          </div>
          <div class="info">
            <i class="las la-check-circle" /> Single Patient
          </div>
        </div>
        <div class="card">
          <div class="price">NRs 955</div>
          <div class="month">per month</div>
          <div class="info-price">
            Best value for a patient using our resources for a family.
          </div>
          <div class="info">
            <i class="las la-check-circle" /> All resources available
          </div>
          <div class="info">
            <i class="las la-check-circle" /> Up to 4 patients*
          </div>
          <div class="info">
            <i class="las la-check-circle" /> Priority checkups
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-area">
      <div class="container">
        <!-- Site footer -->
        <footer class="site-footer">
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-sm-6 col-xs-12">
                <p class="copyright-text">
                  Copyright &copy; 2022 All Rights Reserved by
                  <a href="#">Pluscare</a>
                </p>
              </div>

              <div class="col-md-4 col-sm-6 col-xs-12">
                <ul class="social-icons">
                  <li>
                    <a class="facebook" href="#"><i class="fa fa-facebook" /></a
                    >
                  </li>
                  <li>
                    <a class="twitter" href="#"><i class="fa fa-twitter" /></a>
                  </li>
                  <li>
                    <a class="dribbble" href="#"><i class="fa fa-dribbble" /></a
                    >
                  </li>
                  <li>
                    <a class="linkedin" href="#"><i class="fa fa-linkedin" /></a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
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
    --lightTwo: #333;
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
  .pricing-area {
    margin-top: 4.5rem;
  }

  .pricing-area .container {
    display: flex;
  }

  .pricing-area .container .card {
    width: 100%;
    margin: 0 5rem;
    /* background-color: #414a4c; */
    border-radius: 1.8rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    height: 60vh;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    transition: all 0.5s ease;
  }

  .pricing-area .container .card:hover {
    background-color: #29aafe;
    color: white;
    transform: scale(1.1);
    cursor: pointer;
  }
  .pricing-area .container .card .price {
    font-family: "Poppins", sans-serif;
    font-size: 3rem;
    margin-top: 3rem;
    font-weight: bolder;
  }
  .pricing-area .container .card .month {
    font-family: "Poppins", sans-serif;
    /* color: var(--darkOne); */
    padding: 1rem;
  }
  .pricing-area .container .card .info-price {
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    /* color: var(--darkTwo); */
    padding: 1rem;
  }
  .pricing-area .container .card .info {
    margin-top: 3rem;
    margin-right: 4rem;
  }
  .features-area {
    margin-top: 4.5rem;
    /* background-color: rgba(0, 0, 0, 0.05);  */
    /* border-radius: 30px 5px 50px 10px; */
  }
  .features-area .container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
  .feature-1,
  .feature-2 {
    display: flex;
    flex-direction: column;
    padding: 3rem 0;
    justify-content: center;
  }
  .feature-title {
    display: inline-block;
    padding-bottom: 2rem;
  }
  .feature-text {
    color: var(--lightOne);
    font-size: 1.15rem;
    /* justify-content: center; */
  }
  .bottom-area-features {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .feature-1 .bottom-area-features .feature-image {
    margin-left: 3rem;
  }
  .feature-2 .bottom-area-features .feature-image {
    margin-right: 3rem;
    margin-top: 1.5rem;
  }
  .bottom-area-features .feature-image {
    opacity: 0.8;
    width: 100%;
    display: inline-block;
    /* margin-left: 3rem; */
    height: auto;
  }
  .bottom-area-features .feature-image img {
    border-radius: 1.8rem;
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
    max-width: 87rem;
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
  .site-footer {
    background-color: #fff;
    padding: 45px 0 20px;
    font-size: 15px;
    line-height: 24px;
    color: #737373;
  }
  .site-footer {
    margin-top: 3rem;
  }
  .site-footer a {
    color: #737373;
  }
  .site-footer a:hover {
    color: #3366cc;
    text-decoration: none;
  }
  .site-footer .social-icons {
    text-align: right;
  }
  .site-footer .social-icons a {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin-left: 6px;
    margin-right: 0;
    border-radius: 100%;
    background-color: #33353d;
  }
  .copyright-text {
    margin: 0;
  }
  .social-icons {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  .social-icons li {
    display: inline-block;
    margin-bottom: 4px;
  }
  .social-icons a {
    background-color: #eceeef;
    color: #818a91;
    font-size: 16px;
    display: inline-block;
    line-height: 44px;
    width: 44px;
    height: 44px;
    text-align: center;
    margin-right: 8px;
    border-radius: 100%;
    -webkit-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }
  .social-icons a:active,
  .social-icons a:focus,
  .social-icons a:hover {
    color: #fff;
    background-color: #29aafe;
  }
  .social-icons a.facebook:hover {
    background-color: #3b5998;
  }
  .social-icons a.twitter:hover {
    background-color: #00aced;
  }
  .social-icons a.linkedin:hover {
    background-color: #007bb6;
  }
  .social-icons a.dribbble:hover {
    background-color: #ea4c89;
  }
</style>
