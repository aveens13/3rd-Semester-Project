<script>
  export let patient;
  export let active;
  import { fade } from "svelte/transition";
  let date = new Date(Date.now());
  let dateInvoice = date.toDateString();
  let name =
    patient.response.name[0].given[0] + " " + patient.response.name[0].family;
  let line = patient.response.address[0].line[0];
  let address =
    patient.response.address[0].city +
    " , " +
    patient.response.address[0].state;
  let contactNo = patient.response.telecom[0].value;
  // console.log(name, line, address);
  // let container;
  // var opt = {
  //   margin: 0,
  //   filename: "report.pdf",
  //   image: { type: "jpeg", quality: 0.98 },
  //   html2canvas: { scale: 8 },
  //   jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  // };
  var config = {
    publicKey: "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
    productIdentity: "1234567890",
    productName: "Dragon",
    productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
    paymentPreference: ["KHALTI"],
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
  };
  // @ts-ignore
  var checkout = new KhaltiCheckout(config);
  function paymentInitiated() {
    checkout.show({ amount: 60000 });
    // @ts-ignore
    // html2pdf().from(container).set(opt).save();
  }
</script>

<main class={active ? "container active" : "container"} in:fade>
  <div class="body">
    <header>
      <h1>Invoice</h1>
      <address>
        <p>{name}</p>
        <p>
          {line}<br />{address}
        </p>
        <p>{contactNo}</p>
      </address>
    </header>
    <article>
      <h1>Recipient</h1>
      <address contenteditable>
        <p>Pluscare<br />28 Kilo Dhulikhel</p>
      </address>
      <table class="meta">
        <tr>
          <th><span contenteditable>Invoice #</span></th>
          <td><span contenteditable>101138</span></td>
        </tr>
        <tr>
          <th><span contenteditable>Date</span></th>
          <td><span contenteditable>{dateInvoice}</span></td>
        </tr>
        <tr>
          <th><span contenteditable>Amount Due</span></th>
          <td
            ><span id="prefix" contenteditable>NRs</span><span>600.00</span></td
          >
        </tr>
        <tr>
          <th><span contenteditable>Total</span></th>
          <td><span data-prefix>NRs</span><span>600.00</span></td>
        </tr>
        <tr>
          <th><span contenteditable>Amount Paid</span></th>
          <td><span data-prefix>NRs</span><span contenteditable>0.00</span></td>
        </tr>
        <tr>
          <th><span contenteditable>Balance Due</span></th>
          <td><span data-prefix>NRs</span><span>600.00</span></td>
        </tr>
      </table>
    </article>
    <aside>
      <h1><span>Additional Notes</span></h1>
      <div>
        <p>
          A finance charge of 1.5% will be made on unpaid balances after 30
          days.
        </p>
      </div>
    </aside>
    <button on:click={paymentInitiated} class="khaltiButton"
      ><i class="las la-money-bill-wave" />Pay with Khalti</button
    >
  </div>
</main>

<style>
  .container.active {
    margin-left: 250px;
  }
  .container {
    transition: all 0.5s ease;
    margin-left: 100px;
  }
  main p {
    font-family: "Poppins", sans-serif;
    font-size: 1.2rem;
  }
  main .khaltiButton {
    padding: 1rem;
    background: #6d8baa;
    color: #fff;
    border: none;
    border-radius: 1.2rem;
    font-family: "Poppins", sans-serif;
  }

  main .khaltiButton i {
    /* padding: 1rem; */
    font-size: 1.2rem;
    margin-right: 1rem;
  }
  *[contenteditable] {
    border-radius: 0.25em;
    min-width: 1em;
    outline: 0;
  }

  *[contenteditable] {
    cursor: pointer;
  }

  *[contenteditable]:hover,
  *[contenteditable]:focus,
  td:hover *[contenteditable],
  td:focus *[contenteditable],
  span[contenteditable] {
    display: inline-block;
  }

  /* heading */

  h1 {
    font: bold 100% sans-serif;
    letter-spacing: 0.5em;
    text-align: center;
    text-transform: uppercase;
  }

  /* table */

  table {
    font-size: 75%;
    table-layout: fixed;
    width: 100%;
  }
  table {
    border-collapse: separate;
    border-spacing: 2px;
  }
  th,
  td {
    border-width: 1px;
    padding: 0.5em;
    position: relative;
    text-align: left;
  }
  th,
  td {
    border-radius: 0.25em;
    border-style: solid;
  }
  th {
    background: #eee;
    border-color: #bbb;
  }
  td {
    border-color: #ddd;
  }

  .body {
    /* padding-top: 1rem; */
    box-sizing: border-box;
    height: 90vh;
    margin: 1rem auto;
    overflow: hidden;
    padding: 0.5in;
    width: 100%;
  }
  .body {
    background: #fff;
    border-radius: 1px;
    box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  }

  /* header */

  header {
    margin: 0 0 3em;
  }
  header:after {
    clear: both;
    content: "";
    display: table;
  }

  header h1 {
    background: #000;
    border-radius: 0.25em;
    color: #fff;
    margin: 0 0 1em;
    padding: 0.5em 0;
  }
  header address {
    float: left;
    font-size: 75%;
    font-style: normal;
    line-height: 1.25;
    margin: 0 1em 1em 0;
  }
  header address p {
    margin: 0 0 0.25em;
  }
  /* article */

  article,
  article address,
  table.meta {
    margin: 0 0 3em;
  }
  article:after {
    clear: both;
    content: "";
    display: table;
  }
  article h1 {
    clip: rect(0 0 0 0);
    position: absolute;
  }

  article address {
    float: left;
    font-size: 125%;
    font-weight: bold;
  }

  /* table meta & balance */

  table.meta {
    float: right;
    width: 36%;
  }
  table.meta:after {
    clear: both;
    content: "";
    display: table;
  }

  /* table meta */

  table.meta th {
    width: 40%;
  }
  table.meta td {
    width: 60%;
  }

  /* table items */

  /* aside */

  aside h1 {
    border: none;
    border-width: 0 0 1px;
    margin: 0 0 1em;
  }
  aside h1 {
    border-color: #999;
    border-bottom-style: solid;
  }

  /* javascript */

  @media print {
    * {
      -webkit-print-color-adjust: exact;
    }
    .body {
      box-shadow: none;
      margin: 0;
    }
    span:empty {
      display: none;
    }
  }

  @page {
    margin: 0;
  }
</style>
