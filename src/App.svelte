<script>
    import Content from "./lib/Content.svelte";
    import Sidebar from "./lib/SideBar/SideBar.svelte";
    import Topbar from "./lib/TopBar/TopBar.svelte";
</script>

<main>
    <Topbar />
    <div>
        <Sidebar />
        <Content />
    </div>
</main>

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
        display: flex;
        flex-direction: row;
        height: calc(100% - var(--topbar-height));
    }
</style>