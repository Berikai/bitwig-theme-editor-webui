<script>
    import { theme } from "../../Theme";

    let themeValue;

    theme.subscribe((_value) => {
        themeValue = _value;
    });
</script>

<div style="background-color: {themeValue["window"]["Panel body"]}; --button-background: {themeValue["window"]["Button background"]}; --button-gradient: {(themeValue["window"]["Button background"].length == 9 ? themeValue["window"]["Button background"].substring(0, 7) + "D0" : "#767676")}; --on: {themeValue["window"]["On"]};">
    <span class="file-button">FILE</span>
    <span class="play-button-group">
        <span class="play-button">PLAY</span><i></i>
        <span id="play" class="play-button">
            <svg width="24" fill="#ffffff" viewBox="0 0 24 24">
                <path stroke-width="1.5" d="M18.25 12L5.75 5.75V18.25L18.25 12Z"></path>
            </svg>
        </span><i></i>
        <span class="play-button">
            <svg width="11" height="11">
                <rect width="11" height="11" fill="#ffffff" />
            </svg>
        </span><i></i>
        <span class="play-button">
            <svg width="13" height="13">
                <circle cx="6.5" cy="6.5" r="6.5" fill="#ffffff" />
            </svg>
        </span>
    </span>
    <span class="hitech-group" style="">

    </span>
    <span class="file-button">ADD</span>
    <span class="file-button">EDIT</span>
</div>

<style>
    div {
        --side-margin: 5px;

        display: flex;
        flex-direction: row;
        height: 45px;
        width: calc(100% - calc(2 * var(--side-margin)));
        border-radius: 5px;
        margin-left: var(--side-margin);

        padding-left: 5px;
        
        opacity: 1; /* DEVELOPMENT ONLY */
    }
    i {
        border-right: 1px solid #2f2f2f;
    }
    #play:active {
        background-color: var(--on);
        background-image: none;
    }
    .file-button {
        width: 39px;
        height: 35px;
        background-image: linear-gradient(var(--button-gradient), var(--button-background));
        color: white;
        font-size: 11px;

        margin-top: 5px;
        margin-right: 6px;

        display: flex;
        justify-content: center;
        align-items: center;

        border: 1px solid #2f2f2f;
        border-radius: 3px;
    }
    .play-button {
        width: 39px;
        height: 35px;
        background-image: linear-gradient(var(--button-gradient), var(--button-background));
        color: white;
        font-size: 11px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .play-button-group {
        height: 35px;

        margin-top: 5px;
        margin-right: 5px;

        display: flex;
        justify-content: center;
        align-items: center;

        border: 1px solid #2f2f2f;
        border-radius: 3px;
        overflow: hidden;
    }
    .hitech-group {
        height: 39px;
        width: 416px;

        margin-left: 2px;
        margin-right: 7px;
        margin-top: 3px;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #1f1f1f;

        border-radius: 4px;
    }
</style>