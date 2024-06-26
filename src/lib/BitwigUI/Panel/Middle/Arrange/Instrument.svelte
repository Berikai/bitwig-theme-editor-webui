<script>
    export let type;
    export let isSelected = false;
    export let isRec = false;
    export let isSolo = false;
    export let isMute = false;

    import { ThemeStore } from "../../../../Theme";

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<span class="channels-row" style="display:flex;justify-content:space-between;border-top:1px solid {theme["window"]["Hole (dark)"]};border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{isSelected ? theme["window"]["Selected Panel body"] : theme["window"]["Panel body"]};">
    <span style="display:flex;">
        <span class="instrument" style="background-color:{isSelected ? theme["window"]["Selected Panel body"] : theme["window"]["Panel body"]};">i</span>
    </span>
    <span style="display:flex;">
        <span style="display:flex;justify-content:center;align-items:center;width:25px;height:43px;border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Panel body"]};">c2</span>
        <span style="display:flex;justify-content:center;align-items:center;width:85px;height:43px;border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Hole (medium)"]};">d2</span>
        <span style="display:flex;justify-content:center;align-items:center;width:84px;height:43px;border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Hole (medium)"]};box-shadow: inset #202020 -10px 0px 12px -10px;">d2</span>
        <span style="display:flex;justify-content:center;align-items:center;width:23px;height:43px;border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Button in tree background"]};">e2</span>
    </span>
</span>

<style>
    .instrument {
        display:flex;
        justify-content:center;
        align-items:center;
        width:199px;
        height:43px;
        background-color:red;
    }
    .channels-row {
        display: flex;
        flex-direction: row;
    }
</style>