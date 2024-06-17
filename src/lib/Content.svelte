<script>
    import Bitwig from './BitwigUI/Bitwig.svelte';
    import Transparent from '../assets/transparent.png';
    //import Contentbar from './ContentBar.svelte';
</script>

<div style="background-image: url({Transparent});">
    <!-- <Contentbar /> -->
    <Bitwig />
</div>

<style>
    div {
        --sidebar-width: 350px;
        
        height: 100%;
        display: flex;
        position: relative;
        width: calc(100% - var(--sidebar-width));
        overflow: auto;
    }
</style>