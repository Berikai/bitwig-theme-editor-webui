<script>
    import { onMount } from "svelte";
    import Values from "./Values.svelte";
    import ZoomBar from "../ZoomBar.svelte";

    let buttonRotation = 180;

    onMount(() => {
        document
            .getElementById("sidebar-button")
            .addEventListener("click", () => {
                buttonRotation += 180;
                document.getElementById("sidebar-button-icon").style.transform =
                    `rotate(${buttonRotation}deg)`;

                if (buttonRotation % 360 === 0) {
                    document
                        .getElementsByTagName("main")[0]
                        .setAttribute(
                            "style",
                            "--sidebar-width: 0px;--sidebar-min-width: 0px;",
                        );
                } else {
                    document
                        .getElementsByTagName("main")[0]
                        .setAttribute(
                            "style",
                            "--sidebar-width: 20vw;--sidebar-min-width: 320px;",
                        );
                }
            });
    });
</script>

<div>
    <Values display={buttonRotation % 360 !== 0 ? "flex" : "none"} />
    <span id="sidebar-button">
        <svg
            id="sidebar-button-icon"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            style="transform: rotate({buttonRotation}deg);"
        >
            <path
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
        </svg>
    </span>
    <ZoomBar />
</div>

<style>
    div {
        position: relative;
        display: flex;
        border-right: 1px solid var(--color-border);
        box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.2);
        z-index: 3;
        height: 100%;
        width: max(var(--sidebar-width), var(--sidebar-min-width));
        background-color: var(--color-bg-secondary);
        transition: width var(--transition-normal);
    }
    span {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        right: -24px;
        top: 50%;
        transform: translateY(-50%);
        background-color: var(--color-bg-tertiary);
        width: 24px;
        height: 48px;
        border: 1px solid var(--color-border);
        border-left: none;
        border-top-right-radius: var(--radius-md);
        border-bottom-right-radius: var(--radius-md);
        color: var(--color-text-secondary);
        transition: all var(--transition-fast);
    }
    span:hover {
        background-color: var(--color-accent);
        color: var(--color-bg-primary);
        cursor: pointer;
    }
    /* Update SVG stroke color on hover handled by color property inheritance */
    :global(#sidebar-button-icon path) {
        stroke: currentColor;
    }
</style>
