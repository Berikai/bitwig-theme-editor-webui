<script>
    export let type;
    export let isSelected = false;
    export let isRec = false;
    export let color = "#808080";
    export let name;

    import { ThemeStore } from "../../../../Theme";

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<span class="channels-row" style="--button-gradient: {(theme["window"]["Button background"].length == 9 ? theme["window"]["Button background"].substring(0, 7) + "D0" : "#767676")};--button-background:{theme["window"]["Button background"]};--button-stroke:{theme["window"]["Button stroke"]};display:flex;justify-content:space-between;border-top:1px solid {theme["window"]["Hole (dark)"]};border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{isSelected ? theme["window"]["Selected Panel body"] : theme["window"]["Panel body"]};">
    <span style="display:flex;">
        <span class="instrument" style="display:flex;justify-content:flex-start;background-color:{isSelected ? theme["window"]["Selected Panel body"] : theme["window"]["Panel body"]};">
            <span style="height:100%;width:6px;background-color:{color};"></span>
            <span style="display:flex;flex-direction:column;width:100%;">
                <span style="display:flex;justify-content:space-between;width:100%;">
                    <i style="margin-left:6px;color:{isSelected ? "#000000" : "#ffffff"};">{name}</i>
                    <span style="display: flex;">
                        <span class="button rec" style={isRec ? "background-color:red;background-image:none;" : ""}>
                            <svg class="circle" width="9px" height="9px">
                                <circle cx="4.5" cy="4.5" r="4.5" fill={isRec ? "black" : "white"} />
                            </svg>
                        </span>
                        <span class="button">S</span>
                        <span class="button">M</span>
                    </span>
                </span>
                <span style="display:flex;justify-content:space-between;width:100%;">
                    {#if type === "a"}
                    <svg width="15px" height="15px" viewBox="0 0 15 15" stroke={"#cfcfcf"} style="margin-left:6px;margin-top:3px;fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
                        <g>
                            <path d="M2.5,12.276L2.5,2.724C3.005,5.988 3.817,8.774 5.045,10.908L5.045,4.085C5.65,6.628 6.47,8.551 7.602,9.577L7.602,5.476C8.152,7.234 9.044,8.211 10.211,8.565L10.105,6.115C11.22,7.809 11.76,8.164 12.874,7.5" style="fill:none;stroke-width:1px;"/>
                        </g>
                    </svg>
                    {/if}
                    {#if type === "i"}
                    <svg width="15px" height="15px" viewBox="0 0 15 15" fill={"#4a4a4a"} style="margin-left:6px;margin-top:4px;fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                        <g>
                            <path d="M13,2L13,13L9.669,13L9.669,8.609L10.184,8.609C10.406,8.609 10.585,8.429 10.585,8.207L10.585,2L13,2ZM8.342,2L8.342,8.207C8.342,8.429 8.522,8.609 8.743,8.609L9.258,8.609L9.258,13L5.742,13L5.742,8.609L6.257,8.609C6.478,8.609 6.658,8.429 6.658,8.207L6.658,2L8.342,2ZM4.415,2L4.415,8.207C4.415,8.429 4.594,8.609 4.816,8.609L5.331,8.609L5.331,13L2,13L2,2L4.415,2Z"/>
                        </g>
                    </svg>
                    {/if}
                    {#if type === "m"}
                    <svg width="15px" height="15px" fill={"#cfcfcf"} style="margin-left:6px;margin-top:3px;fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                        <g>
                            <svg viewBox="0 0 15 15">
                                <path d="M3,10.5L1.45,5.114C1.45,5.114 3.559,6.117 4.561,6.593C4.852,6.732 5.202,6.624 5.364,6.344C5.757,5.667 6.47,4.437 6.963,3.587C7.074,3.395 7.279,3.277 7.5,3.277C7.721,3.277 7.926,3.395 8.037,3.587C8.53,4.437 9.243,5.667 9.636,6.344C9.798,6.624 10.148,6.732 10.439,6.593C11.441,6.117 13.55,5.114 13.55,5.114L12,10.5L3,10.5" style="fill-rule:nonzero;"/>
                            </svg>
                            <rect x="3" y="11" width="9" height="1" style="fill-rule:nonzero;"/>
                        </g>
                    </svg>
                    {/if}
                    {#if type === "f"}
                    <svg width="15px" height="15px" viewBox="0 0 15 15" fill={"#cfcfcf"} style="margin-left:6px;margin-top:3px;fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                        <g>
                            <path d="M3.014,4.956L3.16,4.811C3.16,4.893 3.097,4.961 3.017,4.97C3.016,4.965 3.015,4.961 3.014,4.956ZM3.16,4.811C3.16,4.485 3.424,4.221 3.75,4.221L6.25,4.221C7.819,4.221 9.09,5.492 9.09,7.061L9.09,10C9.09,10.065 9.129,10.123 9.189,10.148C9.249,10.172 9.317,10.159 9.363,10.113L11.47,8.007L12.304,8.841L8.5,12.646L4.696,8.841L5.53,8.007C5.53,8.007 7.637,10.113 7.637,10.113C7.683,10.159 7.751,10.172 7.811,10.148C7.871,10.123 7.91,10.065 7.91,10L7.91,6.828C7.91,6.04 7.271,5.401 6.483,5.401L3.75,5.401C3.593,5.401 3.443,5.339 3.333,5.228C3.222,5.118 3.16,4.968 3.16,4.811Z" style="fill-rule:nonzero;"/>
                        </g>
                    </svg>
                    {/if}
                    <span style="align-items:center;margin-left:5px;margin-top:3px;display:flex;width:123px;height:13px;background-color:{theme["window"]["Display Background"]};border:2px solid {theme["window"]["Display Background"]};border-radius:3px;overflow:hidden;">
                        <span style="display:flex;width:52px;height:14px;background-color:{theme["window"]["On"]};opacity:0.3;"></span>
                        <span style="display:flex;width:1px;height:14px;background-color:{theme["window"]["On"]};opacity:0.7;"></span>
                    </span>
                    <span class="button" style="margin-top:3px;margin-left:6px;">
                        <svg width="15px" height="15px" fill={"#ffffff"} style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><rect x="3" y="3" width="9" height="2"/><rect x="3" y="6.5" width="9" height="1.989"/><rect x="3" y="10" width="9" height="2"/></svg>
                    </span>
                </span>
            </span>
            <span style="margin-right:4px;height:37px;width:8px;background-color:{theme["window"]["Display Background"]};"></span>
        </span>
    </span>
    <span style="display:flex;">
        <span style="display:flex;justify-content:center;align-items:center;width:25px;height:43px;border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Panel body"]};">
            <svg x="0px" y="0px" width="23px" height="19px" fill={theme["window"]["Normal Toggle Icon"]}>
                <rect x="7" y="5" width="9" height="9"/>
            </svg>
        </span>
        <span style="display:flex;justify-content:flex-start;align-items:center;width:85px;height:43px;border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Hole (medium)"]};">
            {#if isRec}
                <svg x="0px" y="0px" width="23px" height="19px" fill={theme["window"]["Normal Toggle Icon"]}>
                    <circle cx="11.5" cy="9.5" r="5"/>
                </svg>
            {:else}
                <svg x="0px" y="0px" width="23px" height="19px" fill={"#4f4f4f"}>
                    <rect x="7" y="5" width="9" height="9"/>
                </svg>
            {/if}
        </span>
        <span style="display:flex;justify-content:flex-start;align-items:center;width:84px;height:43px;border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Hole (medium)"]};box-shadow: inset #202020 -10px 0px 12px -10px;">
            {#if isRec}
                <svg x="0px" y="0px" width="23px" height="19px" fill={theme["window"]["Normal Toggle Icon"]}>
                    <circle cx="11.5" cy="9.5" r="5"/>
                </svg>
            {:else}
                <svg x="0px" y="0px" width="23px" height="19px" fill={"#4f4f4f"}>
                    <rect x="7" y="5" width="9" height="9"/>
                </svg>
            {/if}
        </span>
        <span style="display:flex;justify-content:center;align-items:center;width:23px;height:43px;border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Button in tree background"]};">
            <svg x="0px" y="0px" width="15px" height="15px" fill={"#696969"}>
                <rect x="2" y="2" width="11" height="3"/>
                <rect x="2" y="6" width="11" height="3"/>
                <rect x="2" y="10" width="7" height="3"/>
                <svg viewBox="0 0 15 15">
                    <polygon points="15,12.5 10,15 10,10 "/>
                </svg>
            </svg>
        </span>
    </span>
</span>

<style>
    .instrument {
        display:flex;
        justify-content:center;
        align-items:center;
        width:199px;
        height:43px;
        font-size: 11px;
    }
    .channels-row {
        display: flex;
        flex-direction: row;
    }
    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 3px;
        width: 19px;
        height: 14px;
        font-size: 15px;
        font-weight: bolder;
        background-image: linear-gradient(var(--button-gradient), var(--button-background));
        border: 1px solid var(--button-stroke);
        border-radius: 3px;
        overflow: hidden;
    }
</style>