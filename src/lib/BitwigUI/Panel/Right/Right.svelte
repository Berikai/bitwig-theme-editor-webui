<script>
    import { onMount } from "svelte";
    import { ThemeStore } from "../../../Theme";
    import { scrollToValue } from '../../../scrollToValue';
    
    import Any from "./Icons/Any.svelte";
    import Locations from "./Icons/Locations.svelte";

    onMount(() => {
        document.getElementById("browser-panel").addEventListener("mousedown", (e) => {
            scrollToValue(e, "Hole (medium)")
        });

        Array.from(document.getElementsByClassName("hole-dark")).forEach((element) => {
            element.addEventListener("mousedown", (e) => {
                scrollToValue(e, "Hole (dark)")
            });
        });
    });

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<div id="browser-panel" style="--hole-dark: {theme["window"]["Hole (dark)"]}; --panel-body: {theme["window"]["Panel body"]}; --panel-stroke: {theme["window"]["Panel stroke"]}; --hole-medium: {theme["window"]["Hole (medium)"]};">
    <span class="top-nav">
        <Locations />
    </span>
    <span class="everything-bar">
        <i>Everything</i>
        <span class="search-bar hole-dark">
            <span style="display: flex;align-items:center;">
                <svg x="0px" y="0px" width="17" height="11" fill={"#cfcfcf"} viewBox="0 0 17 11" style="margin-left:5px;"><path d="M 10.643,9.49 8.265,7.112 C 8.664,6.486 8.881,5.76 8.881,5 8.881,3.947 8.471,2.958 7.727,2.213 6.982,1.469 5.993,1.06 4.94,1.06 3.887,1.06 2.898,1.47 2.154,2.214 1.41,2.958 1,3.947 1,5 1,6.053 1.41,7.042 2.154,7.786 2.898,8.53 3.888,8.939 4.94,8.939 5.701,8.939 6.426,8.722 7.052,8.324 L 9.431,10.702 10.643,9.49 z M 3.002,6.938 C 2.484,6.42 2.199,5.732 2.199,5 2.199,4.268 2.484,3.58 3.002,3.062 3.52,2.544 4.208,2.259 4.94,2.259 5.671,2.259 6.36,2.544 6.878,3.062 7.396,3.58 7.682,4.268 7.682,5 7.682,5.732 7.397,6.42 6.879,6.938 6.36,7.456 5.672,7.74 4.94,7.74 4.208,7.74 3.52,7.456 3.002,6.938 z"/><path style="fill-opacity:1;stroke:none" d="M 9.5580583,6 15.370019,6 12.464038,9.3535534 z"/></svg>
                <i class="text">Search</i>
            </span>
            <svg width="7" height="7" viewBox="0 0 7 7" style="margin-right: 10px;"><line x1="0" y1="0" x2="7" y2="7" stroke="#c3c3c3" /><line x1="0" y1="7" x2="7" y2="0" stroke="#c3c3c3" /></svg>
        </span>
        <span class="locations">
            <span class="location-side">
                <i><Any />Location</i>
                <i><Any />Category</i>
                <i><Any />Device</i>
            </span>
            <span class="location-side">
                <i><Any />File Kind</i>
                <i><Any />Creator</i>
                <i><Any />Tags</i>
            </span>
        </span>
    </span>
    <span class="files hole-dark">
        <span style="display:flex;margin-left:3px;margin-top:3px;height:23px;width:100%;opacity:0.5;">
            <!--TODO: Highlighter-->
        </span>
    </span>
    <span class="bottom-bar">
        
    </span>
</div>

<style>
    div {
        --border-width: 2px;
        width: calc(222px - 2 * var(--border-width));
        height: calc(100% - 2 * var(--border-width));
        background-color: var(--hole-medium);
        border-radius: 3px;
        border: 2px solid var(--panel-stroke);
        overflow: hidden;

        opacity: 1; /*Development only, set to 1 in production */
    }
    i {
        display: flex;
        align-items: center;

    }
    .text {
        margin-left: 2px;
    }
    .top-nav {
        display: flex;
        width: 100%;
        height: 40px;
        border-bottom: 2px solid var(--panel-stroke);
    }
    .everything-bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 11px;
        padding-top: 7px;
        width: 100%;
        height: 123px;
    }
    .search-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 11px;
        margin-top: 6px;
        width: 204px;
        height: 21px;
        background-color: var(--hole-dark);
        border-radius: 3px;
    }
    .locations {
        display: flex;
        flex-direction: row;
        width: 200px;
        height: 70px;
        margin-top: 4px;
        color: whitesmoke;
    }
    .location-side {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100px;
        height: 70px;
        padding-left: 0px; /* 24px; */
    }
    .files {
        display: flex;
        width: 100%;
        height: 413px;
        background-color: var(--hole-dark);
    }
    .bottom-bar {
        display: flex;
        width: 100%;
        height: 100%;
        box-shadow: #202020 0px 0px 10px;
    }
</style>