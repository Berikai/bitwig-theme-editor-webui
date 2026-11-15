<script>
    import { onMount } from "svelte";
    import Content from "./lib/Content.svelte";
    import Sidebar from "./lib/SideBar/SideBar.svelte";
    import SharedColorPicker from "./lib/SideBar/SharedColorPicker.svelte";
    import Topbar from "./lib/TopBar/TopBar.svelte";
    import {
        redoColorChange,
        toastMessage,
        undoColorChange,
    } from "./lib/Scripts/Theme";

    let topbarRef;
    let isDraggingFile = false;

    onMount(() => {
        document.getElementById("loading")?.remove();
    });

    function handleGlobalKeydown(e) {
        const tag = e.target?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;

        const mod = e.metaKey || e.ctrlKey;
        if (!mod) return;

        if (e.key.toLowerCase() === "z" && !e.shiftKey) {
            e.preventDefault();
            undoColorChange();
        } else if (
            (e.key.toLowerCase() === "z" && e.shiftKey) ||
            e.key.toLowerCase() === "y"
        ) {
            e.preventDefault();
            redoColorChange();
        }
    }

    function handleDragOver(e) {
        if (e.dataTransfer?.types?.includes("Files")) {
            e.preventDefault();
            isDraggingFile = true;
        }
    }

    function handleDragLeave(e) {
        if (e.relatedTarget === null) {
            isDraggingFile = false;
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        isDraggingFile = false;
        const file = e.dataTransfer?.files?.[0];
        if (file && topbarRef?.importFile) {
            topbarRef.importFile(file);
        }
    }
</script>

<svelte:window
    on:keydown={handleGlobalKeydown}
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
    on:drop={handleDrop}
/>

<main>
    <Topbar bind:this={topbarRef} />
    <div class="workspace">
        <Sidebar />
        <Content />
    </div>
</main>

<SharedColorPicker />

{#if isDraggingFile}
    <div class="drop-overlay" aria-hidden="true">
        <div class="drop-box">
            <strong>Drop .bte or .json theme file</strong>
            <span>Release to load into Bitwig Theme Editor WebUI</span>
        </div>
    </div>
{/if}

{#if $toastMessage}
    <div class="toast {$toastMessage.type}" role="status" aria-live="polite">
        {$toastMessage.text}
    </div>
{/if}

<div class="smallscreen">
    <h2>Bitwig Theme Editor WebUI</h2>
    <p>Your screen resolution is too low.</p>
    <p>Try rotating your mobile device.</p>
</div>

<style>
    main {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
    }
    .workspace {
        position: relative;
        display: flex;
        flex-direction: row;
        height: calc(100% - var(--topbar-height));
        min-height: 0;
    }
    .drop-overlay {
        position: fixed;
        inset: 0;
        z-index: 2000;
        background-color: rgba(24, 24, 24, 0.8);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }
    .drop-box {
        padding: 32px 44px;
        border: 2px dashed var(--color-accent);
        border-radius: var(--radius-lg);
        background-color: var(--color-bg-secondary);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        color: var(--color-text-primary);
        font-size: 16px;
    }
    .drop-box span {
        font-size: 13px;
        color: var(--color-text-secondary);
    }
    .toast {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 1500;
        padding: 10px 16px;
        border-radius: var(--radius-md);
        background-color: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        color: var(--color-text-primary);
        font-size: 13px;
        font-weight: 500;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
    }
    .toast.success {
        border-left: 4px solid var(--color-success);
    }
    .toast.error {
        border-left: 4px solid var(--color-error);
    }
    .toast.info {
        border-left: 4px solid var(--color-accent);
    }
    @media only screen and (max-width: 349px) {
        .smallscreen {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            height: calc(100vh - 20px);
            width: calc(100vw - 20px);
            flex-direction: column;
            padding: 10px;
            justify-content: center;
            align-items: center;
            text-align: center;
            opacity: 0.92;
            background-color: #242424;
            z-index: 3000;
        }
    }
    @media only screen and (min-width: 350px) {
        .smallscreen {
            display: none;
        }
    }
</style>
