<script>
    import { ThemeStore } from "../../../Theme";

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<div>
    <span class="title">INSTRUMENT TRACK</span>
    <span class="sub-title">Inst 1</span>
    <span class="color-palette"></span>
    <span class="comment">Comment</span>
    <span class="active-area">
        <svg width="25px" height="25px">
            <circle cx="11" cy="11" r="8" fill="{theme["window"]["On"]}" />
        </svg>
        Active
    </span>
    <span class="channel-area"></span>
</div>

<style>
    div {
        --border-width: 2px;
        display: flex;
        flex-direction: column;
        width: calc(161px - 2 * var(--border-width));
        height: calc(100% - 2 * var(--border-width));
        background-color: brown;
        border-radius: 3px;
        border: 2px solid black;
        overflow: hidden;
    }
    span {
        width: 100%;
    }
    .title {
        height: 18px;
        background-color: #2f2f2f;
        font-size: 11px;
        display: flex;
        text-align: center;
        justify-content: center;
        padding-top: 2px;
    }
    .sub-title {
        height: 18px;
        background-color: rgb(32, 32, 32);
        font-size: 11px;
        display: flex;
        text-align: center;
        padding-top: 3px;
        padding-left: 3px;
        font-style: italic;
        border-bottom: 2px solid #2f2f2f;
    }
    .color-palette {
        height: 53px;
        border-bottom: 2px solid #2f2f2f;
        background-color: black;
    }
    .comment {
        height: 103px;
        border-bottom: 2px solid #2f2f2f;
        background-color: black;
        padding-top: 2px;
        padding-left: 3px;
        font-size: 10px;
        font-style: italic;
    }
    .active-area {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 25px;
        padding-top: 2px;
        padding-left: 1px;
        font-size: 12px;
        background-color: black;
        border-bottom: 2px solid #2f2f2f;
    }
    .channel-area {
        display: flex;
        height: 53px;
        background-color: #6f6f6f;
        border-bottom: 2px solid #2f2f2f;
    }
</style>