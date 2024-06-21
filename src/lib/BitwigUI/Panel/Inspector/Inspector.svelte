<script>
    import { ThemeStore } from "../../../Theme";

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<div style="--rec: {theme["window"]["Record button color"]}; --display-background: {theme["window"]["Display Background"]}; --hole-light: {theme["window"]["Hole (light)"]}; --hole-medium: {theme["window"]["Hole (medium)"]}; --hole-light: {theme["window"]["Hole (light)"]}; --button-stroke: {theme["window"]["Button stroke"]}; --panel-body: {theme["window"]["Panel body"]}; --button-background: {theme["window"]["Button background"]}; --button-gradient: {(theme["window"]["Button background"].length == 9 ? theme["window"]["Button background"].substring(0, 7) + "D0" : "#767676")};">
    <span class="title">INSTRUMENT TRACK</span>
    <span class="sub-title">Inst 1</span>
    <span class="color-palette">
        <span class="color" style="background-color: #2c2c2c;"/><span class="color" style="background-color: #7a7a7a;"/><span class="color" style="background-color: #c9c9c9;"/><span class="color" style="background-color: #8689ac;"/><span class="color" style="background-color: #a37943;"/><span class="color" style="background-color: #c69f70;"/><span class="color" style="background-color: #5761c6;"/><span class="color" style="background-color: #848ae0;"/><span class="color" style="background-color: #9549cb;"/>
        <span class="color" style="background-color: #d93871;"/><span class="color" style="background-color: #d92e24;"/><span class="color" style="background-color: #ff5706;"/><span class="color" style="background-color: #d99d10;"/><span class="color" style="background-color: #739814;"/><span class="color" style="background-color: #009d17;"/><span class="color" style="background-color: #00a694;"/><span class="color" style="background-color: #0099d9;"/><span class="color" style="background-color: #bc76b0;"/>
        <span class="color" style="background-color: #e16691;"/><span class="color" style="background-color: #ec6157;"/><span class="color" style="background-color: #ff833e;"/><span class="color" style="background-color: #e4b74e;"/><span class="color" style="background-color: #a0c04c;"/><span class="color" style="background-color: #3ebb62;"/><span class="color" style="background-color: #43d2b9;"/><span class="color" style="background-color: #44c8ff;"/><span class="color" style="background-color: #d1b9db;"/>
    </span>
    <span class="comment">Comment</span>
    <span class="active-area">
        <svg width="25px" height="25px">
            <circle cx="11" cy="11" r="8" fill="{theme["window"]["On"]}" />
        </svg>
        Active
    </span>
    <span class="channel-area">
        <span class="channel-row">
            Channel
            <span class="channel-all-button">All</span>
            <svg class="arrow-right" width="6px" height="6px" viewBox="0 0 12 12">
                <polygon points="0,0 10,5 0,10" fill="white" />
            </svg>
            <span class="channel-all-button">1</span>
        </span>
        <span class="bend-row">
            P. Bend
            <span class="channel-on-button" style="background-color: {theme["window"]["On"]};">
                →Expr.
                <span class="channel-on-right" style="color: {theme["window"]["On"]};"> <code>2</code><code>2</code></span>
            </span>
        </span>
    </span>
    <span class="device-area">
        <span class="device-nav">
            <span class="device-button"></span>
        </span>
        <span class="device-in"></span>
    </span>
    <span class="send-area">
        <span class="send-button">All ins</span>
        <span class="send-button">Master</span>
    </span>
    <span class="mixer-area">
        <span class="mixer-half" style="background-color: var(--hole-light);"></span>
        <span class="mixer-half">
            <span class="mixer-button">
                <span class="mixer-button-r">
                    <svg class="circle" width="10px" height="10px">
                        <circle cx="5" cy="5" r="5" fill="black" />
                    </svg>
                </span>
                <span class="mixer-button-n">S</span>
                <span class="mixer-button-n">M</span>
            </span>
            <span class="mixer-volume">
                <svg width="2px" height="100%">
                    <line x1="1" y1="2px" x2="1" y2="20px" stroke="{theme["window"]["On"]}" />
                </svg>
            </span>
            <span class="mixer-limiter">

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
        border: 2px solid var(--panel-body);
        overflow: hidden;
        background-color: var(--panel-body);
    }
    span {
        width: 100%;
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
        border-bottom: 2px solid var(--panel-body);
    }
    .color-palette {
        display: flex;
        flex-wrap: wrap;
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 2px;
        height: 52px;
        width: 156px;
        border-bottom: 2px solid var(--panel-body);
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
        border-bottom: 2px solid var(--panel-body);
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
        border-bottom: 2px solid var(--panel-body);
    }
    .channel-area {
        display: flex;
        flex-direction: column;
        height: 53px;
        background-color: var(--hole-light);
        border-bottom: 2px solid var(--panel-body);

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
        background-color: rgb(39, 39, 39);
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
        border-bottom: 2px solid var(--panel-body);
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
        width: 25%;
        height: 26px;
        background-color: var(--hole-medium);
        border-bottom: 2px solid var(--hole-medium);
    }
    .send-area {
        display: flex;
        flex-direction: column;
        height: 51px;
        background-color: var(--hole-light);
        border-bottom: 2px solid var(--panel-body);
    }
    .send-button {
        display: flex;
        align-items: center;
        height: 20px;
        width: 128px;
        margin-top: 2px;
        margin-left: 3px;
        padding-left: 20px;
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
        align-items: center;
        justify-content: center;
        width: 78px;
        height: 118px;
        margin-top: 3px;
        margin-left: 2px;
        background-color: var(--hole-medium);
        border-radius: 3px;
        overflow: hidden;
    }
</style>