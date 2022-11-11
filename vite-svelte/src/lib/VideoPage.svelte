<script>
  import vi from "../assets/pl.mp4";
</script>

<div class="content">
    <video
        autoplay
        muted
        loop
        Playsinline
        src={vi}
        >
        <track kind="captions"/>
    </video>
</div>

<style>
    .content{
        width:100%;
        height:97vh;
        display:flex;
        justify-content:center;
        align-items:center;
    }
  video {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: none;
	}
</style>
