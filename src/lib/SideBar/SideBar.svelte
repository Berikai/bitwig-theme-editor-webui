<script>
    import { onMount } from "svelte";
    import Values from "./Values.svelte";
    import ZoomBar from "../ZoomBar.svelte";

    let buttonRotation = 180;

    onMount(() => {
        document.getElementById("sidebar-button").addEventListener("click", () => {
            buttonRotation += 180;
            document.getElementById("sidebar-button-icon").style.transform = `rotate(${buttonRotation}deg)`;

            if (buttonRotation % 360 === 0) {
                document.getElementsByTagName("main")[0].setAttribute("style", "--sidebar-width: 0px;--sidebar-min-width: 0px;")
                
            } else {
                document.getElementsByTagName("main")[0].setAttribute("style", "--sidebar-width: 20vw;--sidebar-min-width: 320px;")
            }
        });
    });
</script>

<div>
    <Values display={buttonRotation % 360 !== 0 ? "flex" : "none"}/>
    <span id="sidebar-button">
        <svg id="sidebar-button-icon" width="24" height="24" fill="none" viewBox="0 0 24 24" style="transform: rotate({buttonRotation}deg);">
            <path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.75 8.75L14.25 12L10.75 15.25"></path>
          </svg>          
    </span>
    <ZoomBar />
</div>

<style>
    div {
        position: relative;
        display: flex;
        border-right: 1px solid #000000;
        box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.2);
        z-index: 3;
        height: 100%;
        width: max(var(--sidebar-width), var(--sidebar-min-width));
    }
    span {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        right: -22px;
        top: 30%;
        background-color: whitesmoke;
        width: 20px;
        height: 60px;
        border: 1px solid #000000;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    span:hover {
        background-color: lightgray;
        cursor: pointer;
    }
</style>