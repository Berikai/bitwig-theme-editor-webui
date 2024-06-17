<script>
    import Reference from '../../assets/reference.png'
    import TopBar from './TopBar/TopBar.svelte';
    import WindowBar from './WindowBar/WindowBar.svelte';
</script>

<div style="background-image: url({Reference});">
    <TopBar />
    <WindowBar />
</div>

<style>
    div {
        --width: 1228px;
        --height: 768px;
        --top-margin: 50px;

        display: flex;
        flex-direction: column;
        min-width: var(--width);
        margin: auto;
        /*margin-top: max(var(--top-margin), calc(var(--top-margin) + (100vh - var(--height)) / 6)); /* Center vertically */
        width: var(--width);
        height: var(--height);
        background-color: #2e2e2e;
    }
</style>