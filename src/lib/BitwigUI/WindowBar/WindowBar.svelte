<script>
    import { onMount } from "svelte";
    import { ThemeStore } from "../../Theme";
    import { scrollToValue } from '../../scrollToValue';

    onMount(() => {
        document.getElementById("panel").addEventListener("mousedown", (e) => {
            scrollToValue(e, "Panel body")
        });

        Array.from(document.getElementsByClassName("play-button")).forEach((element) => {
            if (element.id == "rec") {
                element.addEventListener("mousedown", (e) => {
                    scrollToValue(e, "Record button color")
                });
                return;
            }

            if (element.id == "play") {
                element.addEventListener("mousedown", (e) => {
                    scrollToValue(e, "On")
                });
                return;
            }

            element.addEventListener("mousedown", (e) => {
                scrollToValue(e, "Button background")
            });
        });

        Array.from(document.getElementsByClassName("normal-button")).forEach((element) => {
            element.addEventListener("mousedown", (e) => {
                scrollToValue(e, "Button background")
            });
        });
    });
    
    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<div id="panel" style="--button-stroke: {theme["window"]["Button stroke"]}; background-color: {theme["window"]["Panel body"]}; --button-background: {theme["window"]["Button background"]}; --button-gradient: {(theme["window"]["Button background"].length == 9 ? theme["window"]["Button background"].substring(0, 7) + "D0" : "#767676")}; --on: {theme["window"]["On"]}; --rec: {theme["window"]["Record button color"]};">
    <span class="normal-button button-active">FILE</span>
    <span class="play-button-group">
        <span class="play-button button-active">PLAY</span><i></i>
        <span id="play" class="play-button">
            <svg width="24" fill="#ffffff" viewBox="0 0 24 24">
                <path stroke-width="1.5" d="M18.25 12L5.75 5.75V18.25L18.25 12Z"></path>
            </svg>
        </span><i></i>
        <span class="play-button button-active">
            <svg width="11" height="11">
                <rect width="11" height="11" fill="#ffffff" />
            </svg>
        </span><i></i>
        <span id="rec" class="play-button">
            <svg width="13" height="13">
                <circle cx="6.5" cy="6.5" r="6.5" fill="#ffffff" />
            </svg>
        </span>
    </span>
    <span class="hitech-group" style="">

    </span>
    <span class="normal-button button-active">ADD</span>
    <span class="normal-button button-active">EDIT</span>
</div>

<style>
    div {
        --side-margin: 5px;
        --padding-left: 5px;

        display: flex;
        flex-direction: row;
        height: 45px;
        width: calc(100% - calc(2 * var(--side-margin)) - var(--padding-left));
        border-radius: 5px;
        margin-left: var(--side-margin);

        padding-left: var(--padding-left);
        
        opacity: 1; /* Development only, set to 1 in production */
    }
    i {
        border-right: 1px solid #2f2f2f;
    }
    #play:active {
        background-color: var(--on);
        background-image: none;
    }
    #rec:active {
        background-color: var(--rec);
        background-image: none;
    }
    .normal-button {
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

        border: 1px solid var(--button-stroke);
        border-radius: 3px;
    }
    .button-active:active {
        filter: brightness(0.8);
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
        border: 1px solid var(--button-stroke);
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

        background-color: #1f1f1f;

        border-radius: 4px;
        overflow: hidden;
    }
</style>