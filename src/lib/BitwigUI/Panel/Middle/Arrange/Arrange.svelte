<script>
    import { ThemeStore } from "../../../../Theme";

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<div style="--panel-body: {theme["window"]["Panel body"]}; --active-panel-stroke: {theme["window"]["Active Panel stroke"]};"></div>

<style>
    div {
        display: flex;
        width: 100%;
        height: 401px;
        border-radius: 3px;
        border: 2px solid var(--active-panel-stroke);
        background-color: #2f2f2f; /* DEVELOPMENT */
    }
</style>