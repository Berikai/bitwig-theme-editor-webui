<script>
    export let value;
    export let selected;

    import { theme } from "../Theme";
    import ColorPicker from "./ColorPicker.svelte";

    let themeValue;

    theme.subscribe((_value) => {
        themeValue = _value;
    });
</script>

<div>
    <section>
        <span>{value}</span>
        <code style={`background-color: ${themeValue[selected][value]};`} hidden></code>
        <i><ColorPicker value={value} selected={selected} /></i>
    </section>
</div>

<style>
    div {
        display: flex;
        height: 50px;
        color: black;
        background-color: whitesmoke;
        border-bottom: 1px solid #a5a5a5;
    }
    section {
        display: flex;
        align-items: center;
        flex-direction: row;
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