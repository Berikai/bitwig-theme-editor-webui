<script>
    import Bitwig from "./BitwigUI/Bitwig.svelte";
</script>

<div class="transparent-bg">
    <Bitwig />
</div>

<style>
    .transparent-bg {
        background-image: url("../assets/transparent.png");
        /*background-image: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><rect x="0" y="0" width="1" height="1" fill="%23181818"/><rect x="0" y="1" width="1" height="1" fill="%23202020"/><rect x="1" y="0" width="1" height="1" fill="%23202020"/><rect x="1" y="1" width="1" height="1" fill="%23181818"/></svg>');*/
        background-size: 20px 20px;
        /*height: 100% + var(--content-padding);*/
        display: flex;
        width: calc(100% - max(var(--sidebar-width), var(--sidebar-min-width)));
        overflow: auto;
        scrollbar-color: #444 #333;
    }
</style>
