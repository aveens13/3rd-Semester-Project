<script>
  export let patientTicketDetails;
</script>

<img src={`/api/getimage/${patientTicketDetails._id}`} alt="Condition" />

<style>
  img {
    height: 700px;
    width: 1200px;
    border-radius: 1.8rem;
  }
</style>
