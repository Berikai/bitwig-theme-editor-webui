<script>
    import Content from "./lib/Content.svelte";
    import Sidebar from "./lib/SideBar/SideBar.svelte";
    import Topbar from "./lib/TopBar/TopBar.svelte";
    import ZoomBar from "./lib/ZoomBar.svelte";
</script>

<main>
    <Topbar />
    <div>
        <Sidebar />
        <ZoomBar />
        <Content />
    </div>
</main>

<!--
<div class="smallscreen">
    <h2>Bitwig Theme Editor WebUI</h2>
    <p>Your screen resolution is too low.</p>
    <p>Please use a resolution with minimum 720px width.</p>
</div>
-->

<style>
    main {
        --sidebar-width: 20%;
        --sidebar-min-width: 320px;
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
    /*@media only screen and (max-width: 719px) {
        main { display: none; }
        .smallscreen { 
            display: flex;
            height: calc(100vh - 2*10px);
            flex-direction: column;
            padding: 10px;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
    }
    @media only screen and (min-width: 720px) {
        .smallscreen { display: none; }
    }*/
</style>