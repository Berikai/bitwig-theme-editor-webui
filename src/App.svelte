<script>
    import Content from "./lib/Content.svelte";
    import Sidebar from "./lib/SideBar.svelte";
    import Topbar from "./lib/TopBar.svelte";
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
    }
    div {
        --topbar-height: 40px;
        display: flex;
        flex-direction: row;
        height: calc(100% - var(--topbar-height));
    }
</style>