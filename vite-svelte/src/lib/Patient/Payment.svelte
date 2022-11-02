<script>
  var config = {
    publicKey: "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
    productIdentity: "1234567890",
    productName: "Dragon",
    productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
    paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS"],
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
  var checkout = new KhaltiCheckout(config);
  function paymentInitiated() {
    checkout.show({ amount: 1000 });
  }
</script>

<main>
  <button on:click={paymentInitiated}>Pay with Khalti</button>
</main>

<style>
  main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  main button {
    padding: 1rem;
    background: #6d8baa;
    color: #fff;
    border-radius: 1.8rem;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
  }
</style>
