<script>
    import { onMount } from "svelte";
    import NewProject from './NewProject.svelte';
    import Logo from './Logo.svelte';
    import WindowButtons from './WindowButtons.svelte';
    import { scrollToValue } from '../../scrollToValue';

    onMount(() => {
        document.getElementById("top_bar").addEventListener("mousedown", (e) => {
            scrollToValue(e, "Window background")
        });
    });
</script>

<div id="top_bar">
    <NewProject />
    <Logo />
    <WindowButtons />
</div>

<style>
    div {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 28px;
        width: 100%;
        z-index: 1;

        opacity: 1; /* Development only, set to 1 in production */
    }
</style>