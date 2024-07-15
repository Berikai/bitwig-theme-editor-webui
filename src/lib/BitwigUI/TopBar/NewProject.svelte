<script>
    import { ThemeStore } from "../../Scripts/Theme";
    
    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<div style="--light-text: {theme["window"]["Light Text"]};">
    <svg width="6" height="6" viewBox="0 0 6 6">
        <rect width="10" height="10" fill="#c3c3c3" />
    </svg>
    <span>New 1*</span>
    <svg width="7" height="7">
        <line x1="0" y1="0" x2="7" y2="7" stroke={theme["window"]["Light Text"]} />
        <line x1="0" y1="7" x2="7" y2="0" stroke={theme["window"]["Light Text"]} />
    </svg>
</div>

<style>
    div {
        display: flex;
        width: 82px;
        height: 16px;
        margin-top: 6px;
        margin-left: 6px;
        border-radius: 3px;
        border-width: 1px;
        border-style: solid;
        border-color: #c3c3c3;
    }

    svg {
        margin-top: 5px;
        margin-left: 6px;
    }

    rect {
        width: 10px;
        height: 10px;
        fill: #c3c3c3;
    }

    span {
        font-size: 11px;
        color: var(--light-text);
        margin-left: 9px;
        margin-right: 5px;
    }
</style>