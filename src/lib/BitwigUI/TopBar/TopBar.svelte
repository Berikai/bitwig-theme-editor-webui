<script>
    import NewProject from './NewProject.svelte';
    import Logo from './Logo.svelte';
    import WindowButtons from './WindowButtons.svelte';
</script>

<div>
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

        opacity: 1; /* Set to 1 in production */
    }
</style>