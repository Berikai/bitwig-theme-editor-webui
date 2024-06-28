<script>
    import { ThemeStore } from "../../../../Scripts/Theme";

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<div id="device-bg" style="--hole-dark: {theme["window"]["Hole (dark)"]}; --panel-body: {theme["window"]["Panel body"]}; --panel-stroke: {theme["window"]["Panel stroke"]}; --device-header: {theme["window"]["Device Header"]};">
    <span class="column">
        <span class="line" style="background-color: #808080;"></span>
        <i class="rotate">PROJECT</i>
        <span class="line" style="background-color: #808080;"></span>
    </span>
    <span class="column">
        <span class="line" style="background-color: #FF5706;"></span>
        <i class="rotate">INST 1</i>
        <span class="line" style="background-color: #FF5706;"></span>
    </span>
</div>

<style>
    div {
        display: flex;
        width: 100%;
        height: 243px;
        border-radius: 3px;
        border: 2px solid var(--panel-stroke);
        margin-top: 3px;
        background-color: var(--hole-dark);
    }
    .column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 10px;
        padding-bottom: 10px;
        align-items: center;
        font-size: 10px;
        font-weight: bold;
        width: 28px;
        margin-right: 2px;
        background-color: var(--device-header);
        overflow: hidden;
        white-space: nowrap;
    }
    .rotate {
        transform: rotate(-90deg);
    }
    .line {
        width: 100%;
        height: 5px;
    }
</style>