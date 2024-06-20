<script>
    import Values from "./Values.svelte";
</script>

<div>
   <Values />
</div>

<style>
    div {
        --sidebar-width: 350px;
        border-right: 1px solid #000000;
        box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.2);
        z-index: 3;
        height: 100%;
        width: var(--sidebar-width);
    }
</style>