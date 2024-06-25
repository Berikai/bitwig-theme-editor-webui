<script>
    import { onMount } from "svelte";
    import { ThemeStore } from "../../Theme";
    import { scrollToValue } from '../../scrollToValue';
    
    import Cpu from "./Icons/CPU.svelte";
    import Io from "./Icons/IO.svelte";
    import AbortAutomation from "./Icons/AbortAutomation.svelte";
    import Metronome from "./Icons/Metronome.svelte";
    import Loop from "./Icons/Loop.svelte";
    import PunchIn from "./Icons/PunchIn.svelte";
    import PunchOut from "./Icons/PunchOut.svelte";

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

<div id="panel" style="--hitech-on: {theme["window"]["Hitech on"]}; --button-stroke: {theme["window"]["Button stroke"]}; background-color: {theme["window"]["Panel body"]}; --button-background: {theme["window"]["Button background"]}; --button-gradient: {(theme["window"]["Button background"].length == 9 ? theme["window"]["Button background"].substring(0, 7) + "D0" : "#767676")}; --on: {theme["window"]["On"]}; --rec: {theme["window"]["Record button color"]};">
    <span class="window-panel-main">    
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
            <span class="hitech-part1">
                <span class="hitech-row">
                    <Cpu color={theme["window"]["Hitech on"]} />
                    <span style="margin-top:3px;margin-left: 3px;width: 20px;height: 10px;background-color:{theme["window"]["Hitech on"]};opacity: 0.5;"></span>
                </span>
                <span class="hitech-row">
                    <Io color={theme["window"]["Hitech on"]} />
                    <span style="display: flex; flex-direction: column;">
                        <span style="margin-top:2px;margin-left: 3px;width: 20px;height: 4px;background-color:{theme["window"]["Hitech on"]};opacity: 0.5;"></span>
                        <span style="margin-top:1px;margin-left: 3px;width: 20px;height: 4px;background-color:{theme["window"]["Hitech on"]};opacity: 0.5;"></span>
                    </span>
                </span>
            </span>
            <span class="hitech-part2">
                <span class="hitech-row">110.00</span>
                <span class="hitech-row">4/4</span>
            </span>
            <span class="hitech-part3">
                <span class="hitech-row">1.1.1.00</span>
                <span class="hitech-row">0:00.000</span>
            </span>
            <span class="hitech-part4">
                <AbortAutomation color={"#cfcfcf"}/>
                <Metronome color={"#cfcfcf"}/>
            </span>
            <span class="hitech-part5">
                <Loop color={"#cfcfcf"}/>
                <span style="display:flex;flex-direction: column;margin-left: 5px;">
                    <span class="hitech-row" style="opacity: 0.5;justify-content:flex-end;">1.1.1.00</span>
                    <span class="hitech-row" style="opacity: 0.5;justify-content:flex-end;">0:00.000</span>
                </span>
                <span style="display:flex;flex-direction: column;margin-left: 5px;">
                    <PunchIn color={"#cfcfcf"}/>
                    <PunchOut color={"#cfcfcf"}/>
                </span>
            </span>
        </span>
        <span class="normal-button button-active">ADD</span>
        <span class="normal-button button-active">EDIT</span>
    </span>
    <span class="reference_version">Bitwig Studio 5.1.9</span>
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

        justify-content: space-between;
        
        opacity: 1; /* Development only, set to 1 in production */
    }
    .reference_version {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        font-weight: 600;
        opacity: 0.1;
    }
    .window-panel-main {
        display: flex;
        flex-direction: row;
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

        margin-left: 1px;
        margin-right: 7px;
        margin-top: 2px;

        display: flex;

        font-size: 14px;
        font-weight: 500;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        letter-spacing: 1px;

        background-color: #1f1f1f;

        border: 1px solid #2f2f2f;
        border-radius: 3px;
        overflow: hidden;
    }
    .hitech-part1 {
        width: 50px;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        border-right: 1px solid #2f2f2f;
    }
    .hitech-part2 {
        --padding-right: 6px;
        --padding-top: 1px;

        width: calc(67px - var(--padding-right));
        height: calc(100% - var(--padding-top));

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;

        padding-right: var(--padding-right);
        padding-top: var(--padding-top);

        border-right: 1px solid #2f2f2f;

        color: var(--hitech-on);
    }
    .hitech-part3 {
        --padding-right: 6px;
        --padding-top: 1px;

        width: calc(103px - var(--padding-right));
        height: calc(100% - var(--padding-top));

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;

        padding-right: var(--padding-right);
        padding-top: var(--padding-top);

        border-right: 1px solid #2f2f2f;

        color: var(--hitech-on);
    }
    .hitech-part4 {
        width: 35px;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border-right: 1px solid #2f2f2f;
    }
    .hitech-part5 {
        width: 157px;
        height: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        color: var(--hitech-on);
    }
    .hitech-row {
        display: flex;
        flex-direction: row;
    }
</style>