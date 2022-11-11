<script>
  import svelteLogo from "./assets/svelte.svg";
  import Admin from "./lib/Admin/Admin.svelte";
  import Counter from "./lib/Admin/Admin.svelte";
  import Login from "./lib/Login.svelte";
  import Page from "./lib/Page.svelte";
  import Video from "./lib/VideoPage.svelte";
  // import Layout from "./routes/_layout.svelte";
  import Patient from "./lib/Patient/Patient.svelte";
  import UserLogin from "./lib/UserLogin.svelte";
  import Waiting from "./lib/Waiting.svelte";
  let state;
  let response;
  state = "waiting";
  fetch("/api/is-logged-in").then((result) => {
    if (result.ok) {
      result.json().then((e) => {
        state = "patient";
        response = e;
        // e.response.name[0].given[0] + " " + e.response.name[0].family;
        console.log(e);
      });
    } else {
      state = "video";
      setTimeout(() => {
        state = "page";
      }, 1500);
    }
  });
  console.log("res ho" + response);
</script>

<main>
  {#if state == "waiting"}
    <Waiting />
  {:else if state == "patient"}
    <Patient bind:state responseObject={response} />
  {:else if state == "admin"}
    <Admin bind:state />
  {:else if state == "page"}
    <Page bind:state />
  {:else if state == "video"}
    <Video />
  {:else}
    <Login bind:state bind:response />
  {/if}
</main>
