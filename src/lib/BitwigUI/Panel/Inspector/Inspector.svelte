<script>
    import { onMount } from "svelte";
    import { ThemeStore } from "../../../Scripts/Theme";
    import { scrollToValue } from '../../../Scripts/scrollToValue';
    
    import Device from "./Icons/Device.svelte";
    import ModulationBySource from "./Icons/ModulationBySource.svelte";
    import Knob from "./Icons/Knob.svelte";
    import ModulationByDestination from "./Icons/ModulationByDestination.svelte";
    import Cpu from "../../WindowBar/Icons/CPU.svelte";

    onMount(() => {
        document.getElementById("insp_title").addEventListener("mousedown", (e) => {
            scrollToValue(e, "Panel body")
        });

        document.getElementById("cpu_svg").addEventListener("mousedown", (e) => {
            scrollToValue(e, "On")
        });

        Array.from(document.getElementsByClassName("display-background")).forEach((element) => {
            element.addEventListener("mousedown", (e) => {
                scrollToValue(e, "Display Background")
            });
        });

        Array.from(document.getElementsByClassName("hole-light")).forEach((element) => {
            element.addEventListener("mousedown", (e) => {
                scrollToValue(e, "Hole (light)")
            });
        });

        Array.from(document.getElementsByClassName("hole-medium")).forEach((element) => {
            element.addEventListener("mousedown", (e) => {
                scrollToValue(e, "Hole (medium)")
            });
        });

        Array.from(document.getElementsByClassName("on")).forEach((element) => {
            element.addEventListener("mousedown", (e) => {
                scrollToValue(e, "On")
            });
        });

        Array.from(document.getElementsByClassName("button-background")).forEach((element) => {
            element.addEventListener("mousedown", (e) => {
                scrollToValue(e, "Button background")
            });
        });

        Array.from(document.getElementsByClassName("rec")).forEach((element) => {
            element.addEventListener("mousedown", (e) => {
                scrollToValue(e, "Record button color")
            });
        });
    });

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<div style="--rec: {theme["window"]["Record button color"]}; --display-background: {theme["window"]["Display Background"]}; --hole-light: {theme["window"]["Hole (light)"]}; --hole-medium: {theme["window"]["Hole (medium)"]}; --hole-light: {theme["window"]["Hole (light)"]}; --button-stroke: {theme["window"]["Button stroke"]}; --panel-body: {theme["window"]["Panel body"]}; --panel-stroke: {theme["window"]["Panel stroke"]}; --button-background: {theme["window"]["Button background"]}; --button-gradient: {(theme["window"]["Button background"].length == 9 ? theme["window"]["Button background"].substring(0, 7) + "D0" : "#767676")};">
    <span id="insp_title" class="title">INSTRUMENT TRACK</span>
    <span class="sub-title display-background">Inst 1</span>
    <span class="color-palette display-background">
        <span class="color" style="background-color: #2c2c2c;"/><span class="color" style="background-color: #7a7a7a;"/><span class="color" style="background-color: #c9c9c9;"/><span class="color" style="background-color: #8689ac;"/><span class="color" style="background-color: #a37943;"/><span class="color" style="background-color: #c69f70;"/><span class="color" style="background-color: #5761c6;"/><span class="color" style="background-color: #848ae0;"/><span class="color" style="background-color: #9549cb;"/>
        <span class="color" style="background-color: #d93871;"/><span class="color" style="background-color: #d92e24;"/><span class="color" style="background-color: #ff5706;"/><span class="color" style="background-color: #d99d10;"/><span class="color" style="background-color: #739814;"/><span class="color" style="background-color: #009d17;"/><span class="color" style="background-color: #00a694;"/><span class="color" style="background-color: #0099d9;"/><span class="color" style="background-color: #bc76b0;"/>
        <span class="color" style="background-color: #e16691;"/><span class="color" style="background-color: #ec6157;"/><span class="color" style="background-color: #ff833e;"/><span class="color" style="background-color: #e4b74e;"/><span class="color" style="background-color: #a0c04c;"/><span class="color" style="background-color: #3ebb62;"/><span class="color" style="background-color: #43d2b9;"/><span class="color" style="background-color: #44c8ff;"/><span class="color" style="background-color: #d1b9db;"/>
    </span>
    <span class="comment display-background">Comment</span>
    <span class="active-area hole-light" style="position: relative;">
        <svg class="on" width="16" height="16">
            <circle cx="8" cy="8" r="8" fill="{theme["window"]["On"]}"/>
        </svg>
        <span style="position:absolute;height:100%;display:flex;align-items:center;margin-left:3px;">
            <span id="cpu_svg" style="display:flex;align-items:center;width:fit-content"><Cpu color={"#0f0f0f"} /></span>
        </span>
        Active
    </span>
    <span class="channel-area hole-light">
        <span class="channel-row">
            Channel
            <span class="channel-all-button button-background">All</span>
            <svg class="arrow-right" width="6px" height="6px" viewBox="0 0 12 12">
                <polygon points="0,0 10,5 0,10" fill="white" />
            </svg>
            <span class="channel-all-button button-background">1</span>
        </span>
        <span class="bend-row">
            P. Bend
            <span class="channel-on-button on" style="background-color: {theme["window"]["On"]};">
                →Expr.
                <span class="channel-on-right display-background" style="color: {theme["window"]["On"]};"> <code>2</code><code>2</code></span>
            </span>
        </span>
    </span>
    <span class="device-area">
        <span class="device-nav hole-light">
            <span class="device-button hole-medium">
                <Device color={theme["window"]["On"]} />
            </span>
            <span class="device-button-r hole-light" style="background-color: none;">
                <Knob color={"#cfcfcf"}/>
            </span>
            <span class="device-button-r hole-light" style="background-color: none;">
                <ModulationBySource color={"#cfcfcf"}/>
            </span>
            <span class="device-button-r hole-light" style="background-color: none;">
                <ModulationByDestination color={"#cfcfcf"}/>
            </span>
        </span>
        <span class="device-in hole-medium">
            <svg width="13px" height="13px" viewBox="0 0 13 13" fill="#8f8f8f" style="margin-top: 4px;margin-left: 4px;fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
                <path d="M5.5,2l0,3.5l-3.5,0l0,2l3.5,0l0,3.5l2,0l0,-3.5l3.5,0l0,-2l-3.5,0l0,-3.5l-2,0Z" style="fill-rule:nonzero;"/>
            </svg>
        </span>
    </span>
    <span class="send-area hole-light">
        <span class="send-button button-background">
            <span style="display:flex;align-items:center;width:17px;height:100%;border-right:1px solid {theme["window"]["Button stroke"]};margin-left:2px;margin-right:3px;">
                <svg fill={theme["window"]["Monitoring buttons color"]} x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15 15">
                    <path d="m 6.5,5.5 -2.5,0 0,4 2.5,0 3.5,2.5 0,-9 z"/>
                </svg>
            </span>
            All ins
        </span>
        <span class="send-button button-background">
            <svg width="11px" height="11px" fill={"#cfcfcf"} viewBox="0 0 11 11" style="margin-left:5px;fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
                <g>
                    <path d="M1.59,1l-0.684,0l0,9l0.692,0l0,-5.857l1.038,4.63l0.693,0l0,-4.369l1.054,3.141l0.676,0l0,-2.704l1.075,1.886l0.656,0l0,-1.664l1.14,1.078l0.591,-0.315l1.385,0.001l0,-0.654l-2.022,0l-1.194,-0.9l-0.592,0l0,1.068l-1.075,-1.886l-0.656,0l0,1.914l-1.054,-3.142l-0.677,0l0,3.402l-1.046,-4.629Z" style="fill-rule:nonzero;"/>
                </g>
            </svg>
            <i style="margin-left:5px;">Master</i>
        </span>
    </span>
    <span class="mixer-area">
        <span class="mixer-half hole-light" style="background-color: var(--hole-light);">
            Sends
        </span>
        <span class="mixer-half">
            <span class="mixer-button">
                <span class="mixer-button-r rec">
                    <svg class="circle" width="10px" height="10px">
                        <circle cx="5" cy="5" r="5" fill="black" />
                    </svg>
                </span>
                <span class="mixer-button-n button-background">S</span>
                <span class="mixer-button-n button-background">M</span>
            </span>
            <span class="mixer-volume hole-medium">
                <svg width="2px" height="20px" viewBox="0 0 2 20">
                    <line x1="1" y1="2px" x2="1" y2="18px" stroke="{theme["window"]["On"]}" />
                </svg>
            </span>
            <span class="mixer-limiter hole-medium">
                <span style="display:flex;flex-direction:column;align-items:center;width:fit-content;">
                    <span style="margin-right:4px;width:32px;height:2px;background-color:{theme["window"]["On"]};opacity:0.7;"></span>
                    <span style="margin-right:5px;margin-bottom:5px;width:30px;height:51px;background-color:{theme["window"]["On"]};opacity:0.3;"></span>
                </span>
            </span>
        </span>
    </span>
</div>

<style>
    div {
        --border-width: 2px;
        display: flex;
        flex-direction: column;
        width: calc(161px - 2 * var(--border-width));
        height: calc(100% - 2 * var(--border-width));
        border-radius: 3px;
        border: 2px solid var(--panel-stroke);
        overflow: hidden;
        background-color: var(--panel-body);

        opacity: 1; /*Development only, set to 1 in production */
    }
    span {
        width: 100%;
    }
    .on {
        width: 22px;
        height: 25px;
        margin-top: 8px;
        margin-left: 3px;
    }
    .title {
        height: 18px;
        background-color: var(--panel-body);
        font-size: 11px;
        display: flex;
        text-align: center;
        justify-content: center;
        padding-top: 2px;
    }
    .sub-title {
        height: 18px;
        background-color: var(--display-background);
        font-size: 11px;
        display: flex;
        text-align: center;
        padding-top: 3px;
        padding-left: 3px;
        font-style: italic;
        border-bottom: 2px solid var(--panel-stroke);
    }
    .color-palette {
        display: flex;
        flex-wrap: wrap;
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 2px;
        height: 52px;
        width: 156px;
        border-bottom: 2px solid var(--panel-stroke);
        background-color: var(--display-background);
    }
    .color {
        width: 15px;
        height: 15px;
        margin-right: 2px;
        margin-bottom: 2px;
    }
    .comment {
        height: 102px;
        border-bottom: 2px solid var(--panel-stroke);
        background-color: var(--display-background);
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
        background-color: var(--hole-light);
        border-bottom: 2px solid var(--panel-stroke);
    }
    .channel-area {
        display: flex;
        flex-direction: column;
        height: 53px;
        background-color: var(--hole-light);
        border-bottom: 2px solid var(--panel-stroke);

    }
    .channel-row {
        display: flex;
        align-items: center;
        padding-left: 4px;
        height: 26px;
        font-size: 11px;
    }
    .channel-all-button {
        display: flex;
        align-items: center;
        padding-left: 4px;
        margin-left: 2px;
        height: 18px;
        width: 40px;
        font-size: 11px;
        border: 1px solid var(--button-stroke);
        border-radius: 3px;
        background-image: linear-gradient(var(--button-gradient), var(--button-background));
    }
    .channel-on-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 1px;
        padding-left: 6px;
        margin-left: 5px;
        height: 22px;
        width: 102px;
        font-size: 11px;
        border-radius: 3px;
        color: black;
        overflow: hidden;
    }
    .channel-on-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        padding-left: 6px;
        margin-left: 5px;
        width: 100%;
        height: 100%;
        font-size: 11px;
        background-color: var(--display-background);
        overflow: hidden;
    }
    .arrow-right {
        margin-left: 3px;
        margin-right: 2px;
    }
    .bend-row {
        display: flex;
        align-items: center;
        padding-left: 4px;
        height: 26px;
        font-size: 11px;
    }
    .device-area {
        display: flex;
        flex-direction: column;
        height: 153px;
        border-bottom: 2px solid var(--panel-stroke);
    }
    .device-nav {
        display: flex;
        width: 100%;
        height: 26px;
        background-color: var(--hole-light);
        border-bottom: 2px solid var(--hole-medium);
    }
    .device-in {
        display: flex;
        height: 100%;
        background-color: var(--hole-medium);
    }
    .device-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25%;
        height: 26px;
        background-color: var(--hole-medium);
        border-bottom: 2px solid var(--hole-medium);
    }
    .device-button-r {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25%;
        height: 26px;
        background-color: var(--hole-light);
        border-bottom: 2px solid var(--hole-medium);
    }
    .send-area {
        display: flex;
        flex-direction: column;
        height: 51px;
        background-color: var(--hole-light);
        border-bottom: 2px solid var(--panel-stroke);
    }
    .send-button {
        display: flex;
        align-items: center;
        height: 20px;
        width: 148px;
        margin-top: 2px;
        margin-left: 3px;
        background-image: linear-gradient(var(--button-gradient), var(--button-background));
        border: 1px solid var(--button-stroke);
        border-radius: 5px;
        font-size: 11px;
    }
    .mixer-area {
        display: flex;
        flex-direction: row;
        height: 155px;
        background-color: var(--panel-body);
    }
    .mixer-half {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-right: 2px;
        width: 78px;
        height: 100%;
        font-size: 12px;
    }
    .mixer-button {
        display: flex;
        width: 76px;
        height: 20px;
        margin-left: 2px;
        border: 1px solid var(--button-stroke);
        border-radius: 3px;
        overflow: hidden;
    }
    .mixer-button-n {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        font-weight: bolder;
        background-image: linear-gradient(var(--button-gradient), var(--button-background));
        border-left: 1px solid var(--button-stroke);
    }
    .mixer-button-r {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        font-weight: bolder;
        background-color: var(--rec);
    }
    .mixer-volume {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 78px;
        height: 24px;
        margin-top: 3px;
        margin-left: 2px;
        background-color: var(--hole-medium);
        border-radius: 3px;
        overflow: hidden;
    }
    .mixer-limiter {
        display: flex;
        align-items: end;
        justify-content: flex-end;
        width: 78px;
        height: 118px;
        margin-top: 3px;
        margin-left: 2px;
        background-color: var(--hole-medium);
        border-radius: 3px;
        overflow: hidden;
    }
</style>