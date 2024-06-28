<script>
  import { onMount } from "svelte";
    import Content from "./lib/Content.svelte";
    import Sidebar from "./lib/SideBar/SideBar.svelte";
    import Topbar from "./lib/TopBar/TopBar.svelte";

    onMount(() => {
        document.getElementById("loading").remove();
    });
</script>

<main style="--sidebar-width: 20vw;--sidebar-min-width: 320px;">
    <Topbar />
    <div>
        <Sidebar />
        <Content />
    </div>
</main>

<div class="smallscreen">
    <h2>Bitwig Theme Editor WebUI</h2>
    <p>Your screen resolution is too low.</p>
    <p>Try rotating your mobile device.</p>
</div>

<style>
    main {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    div {
        --topbar-height: 40px;
        position: relative;
        display: flex;
        flex-direction: row;
        height: calc(100% - var(--topbar-height));
    }
    @media only screen and (max-width: 349px) {
        main { display: flex; }
        .smallscreen { 
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            height: calc(100vh - 2*10px);
            width: calc(100vw - 2*10px);
            flex-direction: column;
            padding: 10px;
            justify-content: center;
            align-items: center;
            text-align: center;
            opacity: 0.8;
            background-color: #242424;
            z-index: 10;
        }
    }
    @media only screen and (min-width: 350px) {
        .smallscreen { display: none; }
    }
</style>