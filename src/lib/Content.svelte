<script>
    import Bitwig from './BitwigUI/Bitwig.svelte';
    import Transparent from '../assets/transparent.png';
</script>

<div style="background-image: url({Transparent});">
    <Bitwig />
</div>

<style>
    div {
        --content-padding: 50px;
        /*height: 100% + var(--content-padding);*/
        display: flex;
        width: calc(100% - max(var(--sidebar-width), var(--sidebar-min-width)) - 2*var(--content-padding));
        overflow: auto;
        padding: var(--content-padding);
        scrollbar-color: #444 #333;
    }
</style>