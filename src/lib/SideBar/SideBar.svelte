<script>
    import Values from "./Values.svelte";
    import ZoomBar from "../ZoomBar.svelte";

    export let isOpen = true;
    export let width = 360;

    let isResizing = false;

    function startResize(e) {
        if (!isOpen) return;
        isResizing = true;
        const startX = e.clientX;
        const startWidth = width;

        const onMouseMove = (moveEvent) => {
            const next = startWidth + (moveEvent.clientX - startX);
            width = Math.max(300, Math.min(620, next));
        };

        const onMouseUp = () => {
            isResizing = false;
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }
</script>

<div
    class="sidebar-shell"
    class:collapsed={!isOpen}
    class:resizing={isResizing}
    style="width: {isOpen ? `${width}px` : '0px'};"
>
    <Values display={isOpen ? "flex" : "none"} />

    {#if isOpen}
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <div
            class="resize-handle"
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize sidebar"
            on:mousedown={startResize}
        ></div>
    {/if}

    <button
        type="button"
        id="sidebar-button"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        on:click={() => (isOpen = !isOpen)}
    >
        <svg
            id="sidebar-button-icon"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            style="transform: rotate({isOpen ? 180 : 0}deg);"
        >
            <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.75"
                d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
        </svg>
    </button>

    <ZoomBar />
</div>

<style>
    .sidebar-shell {
        position: relative;
        display: flex;
        flex-shrink: 0;
        border-right: 1px solid var(--color-border);
        box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.2);
        z-index: 3;
        height: 100%;
        background-color: var(--color-bg-secondary);
        transition: width var(--transition-normal);
    }
    .sidebar-shell.resizing {
        transition: none;
        user-select: none;
    }
    .sidebar-shell.collapsed {
        border-right: none;
    }
    .resize-handle {
        position: absolute;
        top: 0;
        right: -3px;
        width: 6px;
        height: 100%;
        cursor: col-resize;
        z-index: 4;
    }
    .resize-handle:hover {
        background-color: rgba(255, 135, 19, 0.35);
    }
    #sidebar-button {
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
        padding: 0;
        border: 1px solid var(--color-border);
        border-left: none;
        border-top-right-radius: var(--radius-md);
        border-bottom-right-radius: var(--radius-md);
        color: var(--color-text-secondary);
        transition: all var(--transition-fast);
        cursor: pointer;
    }
    #sidebar-button:hover {
        background-color: var(--color-accent);
        color: var(--color-bg-primary);
    }
    #sidebar-button-icon {
        transition: transform var(--transition-fast);
    }
</style>
