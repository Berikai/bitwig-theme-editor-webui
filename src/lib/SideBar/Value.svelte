<script>
    export let value;
    export let selected;

    import { ThemeStore } from "../Scripts/Theme";
    import ThemeInfo from "../Scripts/ThemeInfo";
    import ColorPicker from "./ColorPicker.svelte";

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<div>
    <section>
        <span id={value}>{value}</span>
        <span class="info">{ThemeInfo[selected][value]}</span>
    </section>
    <code style={`background-color: ${theme[selected][value]};`} hidden></code>
    <i><ColorPicker value={value} selected={selected} /></i>
</div>

<style>
    div {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        min-height: 40px;
        color: black;
        background-color: whitesmoke;
        border-bottom: 1px solid #a5a5a5;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
    }
    div:hover {
        cursor: pointer;
    }
    span {
        margin-left: 10px;
        margin-right: 10px;
    }
    span.info {
        font-size: 12px;
        color: gray;
    }
    code {
        margin-right: 30px;
        width: 20px;
        height: 20px;
        border: 1px solid black;
    }
    i {
        margin-right: 20px;
    }
</style>