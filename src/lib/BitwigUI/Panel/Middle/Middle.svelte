<script>
    import Arrange from "./Arrange/Arrange.svelte";
    import Device from "./Device/Device.svelte";
</script>

<div>
    <Arrange />
    <Device />
</div>

<style>
    div {
        --border-width: 2px;
        display: flex;
        flex-direction: column;
        width: 825px;
        height: 100%;
        margin-right: 7px;
        margin-left: 3px;
    }
</style>