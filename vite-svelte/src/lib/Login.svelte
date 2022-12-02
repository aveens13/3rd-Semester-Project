<script>
  import Snackbar, { Label, Actions } from "@smui/snackbar";
  import logo from "../assets/pl.jpg";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import IconButton from "@smui/icon-button";
  import Button from "@smui/button";
  import swal from "sweetalert";
  let snackbarError;
  let snackbarText = "";
  let changed;
  let data = null;
  export let state;
  export let response;
  async function submitHandle(event) {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const plainFormdata = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormdata);
    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: formDataJsonString,
    });
    if (response.ok) {
      const e = await response.json();
      console.log(e);
      state = "admin";
    } else {
      console.log("Snackbar");
      snackbarText = "Cannot login, check admin username and password";
      snackbarError.open();
    }
  }
  async function submitSignin(event) {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const plainFormdata = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormdata);
    const resp = await fetch("api/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: formDataJsonString,
    });
    if (resp.ok) {
      const e = await resp.json();
      state = "patient";
      response = e;
      console.log(response);
    } else {
      snackbarText =
        "Cannot login, check patient's username and password on your mail";
      snackbarError.open();
    }
  }

  async function forgotPassword() {
    swal("Enter your email", {
      //@ts-ignore
      content: "input",
    }).then((value) => {
      fetch(`api/forgot-password/${value}`).then(async (resp) => {
        const response = await resp.json();
        if (resp.ok) {
          swal({
            title: response.message,
            text: "Check your email to reset your password",
            icon: "success",
            //@ts-ignore
            button: "Ok",
          });
        } else {
          swal("Error", `${response.message}`, "error");
        }
      });
    });
  }
  console.log(data);
</script>

<Snackbar bind:this={snackbarError} class="demo-error">
  <Label>{snackbarText}</Label>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>

<main>
  <div class="logo">
    <img src={logo} alt="Logo" />
  </div>
  <div
    class={changed == "admin" ? "container right-panel-active" : "container"}
    id="container"
    in:fade={{ delay: 500 }}
  >
    <div class="form-container sign-up-container">
      <form
        method="POST"
        class="form-menu"
        on:submit|preventDefault={submitHandle}
      >
        <h1>Login as Admin</h1>
        <input type="text" name="adminUsername" placeholder="Username" />
        <input type="password" name="adminPassword" placeholder="Password" />
        <input type="submit" class="buttonsub" value="Login to System" />
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form
        method="POST"
        action="api/signin"
        on:submit|preventDefault={submitSignin}
      >
        <h1>Sign in</h1>
        <input type="email" placeholder="Email" name="myEmail" />
        <input type="password" placeholder="Password" name="myPassword" />
        <a href="#" on:click={forgotPassword}>Forgot your password?</a>
        <input type="submit" class="buttonsub" value="Signin" />
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome User!</h1>
          <p>
            To view your dashbaord please enter the details that the system has
            provided
          </p>
          <button class="ghost buttonsub" on:click={() => (changed = "signin")}
            >Sign In as Patient</button
          >
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Medical Staff</h1>
          <p>Enter the admin credentials of the site!</p>
          <button
            class="ghost buttonsub"
            id="signUp"
            on:click={() => (changed = "admin")}>Log in as Medical Staff</button
          >
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");
  .logo {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    margin-left: 3rem;
    margin-top: 3rem;
    cursor: pointer;
  }

  .logo img {
    width: 100px;
    margin-right: 0.6rem;
    margin-top: -0.6rem;
  }
  img {
    width: 100%;
  }
  h1 {
    font-weight: bold;
    margin: 0;
    /* font-family: "Montserrat", sans-serif; */
  }
  .sign-in-container h1 {
    padding-bottom: 50px;
    font-family: "Montserrat", sans-serif;
  }
  .sign-up-container h1 {
    padding-bottom: 50px;
    font-family: "Montserrat", sans-serif;
  }
  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }
  button.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }
  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
  form {
    background-color: #ffffff;
    display: flex;
    font-family: "Montserrat", sans-serif;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }

  input {
    background-color: #eee;
    color: #333;
    border: none;
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }
  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 768px;
    margin-top: 30px;
    margin-bottom: 30px;
    max-width: 100%;
    min-height: 480px;
  }
  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }
  .buttonsub {
    border-radius: 20px;
    border: 1px solid #6d8baa;
    background-color: #6d8baa;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  .buttonsub:active {
    transform: scale(0.95);
  }

  .buttonsub:focus {
    outline: none;
  }
  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }
  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }
  .overlay {
    background: #6888a7;
    background: -webkit-linear-gradient(to right, #6d8baa, #6d8baa);
    background: linear-gradient(to right, #6d8baa, #6d8baa);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 40%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }
</style>
