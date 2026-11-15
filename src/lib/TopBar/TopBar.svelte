<script>
    import New from "./NewIcon.svelte";
    import Load from "./LoadIcon.svelte";
    import Save from "./SaveIcon.svelte";

    import {
        canRedo,
        canUndo,
        clearHistory,
        default_theme,
        gradientEnabled,
        modifiedCounts,
        redoColorChange,
        resetAllColors,
        showToast,
        targetVersion,
        themeComments,
        themeFileName,
        ThemeStore,
        undoColorChange,
    } from "../Scripts/Theme";
    import {
        parseThemeFile,
        serializeToBte,
        serializeToJson,
    } from "../Scripts/BteFormat";

    let fileInput;
    let modalState = false;
    let exportMenuOpen = false;
    let minimizeExport = false;
    let includeAliases = true;

    function handleNew() {
        if (
            $modifiedCounts.total > 0 &&
            !window.confirm(
                `Reset ${$modifiedCounts.total} modified color(s) back to default?`
            )
        ) {
            return;
        }
        resetAllColors();
        showToast("Theme reset to defaults", "info");
    }

    export async function importFile(file) {
        if (!file) return;
        try {
            const text = await file.text();
            const result = parseThemeFile(text, default_theme);
            ThemeStore.set(result.theme);
            gradientEnabled.set(result.gradientEnabled);
            themeComments.set(result.comments);
            clearHistory();

            const baseName = file.name.replace(/\.(bte|json)$/i, "") || "theme";
            themeFileName.set(`${baseName}.bte`);

            showToast(
                `Loaded ${file.name} (${result.stats.matched} colors, ${result.stats.format.toUpperCase()})`,
                "success"
            );
        } catch (err) {
            console.error(err);
            showToast(`Failed to parse ${file.name}`, "error");
        }
    }

    function handleFileChange(e) {
        const file = e.currentTarget.files?.[0];
        if (file) importFile(file);
        e.currentTarget.value = "";
    }

    function triggerDownload(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function downloadBte() {
        const content = serializeToBte($ThemeStore, default_theme, {
            gradientEnabled: $gradientEnabled,
            minimize: minimizeExport,
            includeCrossVersionAliases: includeAliases,
            targetVersion: $targetVersion,
            comments: $themeComments,
        });
        const filename = ($themeFileName || "theme.bte").endsWith(".bte")
            ? $themeFileName
            : `${$themeFileName}.bte`;
        triggerDownload(content, filename, "text/plain;charset=utf-8");
        exportMenuOpen = false;
        showToast(`Exported ${filename}`, "success");
    }

    function downloadJson() {
        const content = serializeToJson($ThemeStore);
        const baseName = ($themeFileName || "theme").replace(/\.(bte|json)$/i, "");
        const filename = `${baseName}.json`;
        triggerDownload(content, filename, "application/json");
        exportMenuOpen = false;
        showToast(`Exported ${filename}`, "success");
    }

    function handleWindowKeydown(e) {
        if (e.key === "Escape") {
            modalState = false;
            exportMenuOpen = false;
        }
    }
</script>

<svelte:window on:keydown={handleWindowKeydown} />

<nav class:modal-open={modalState || exportMenuOpen}>
    <span class="left-group">
        <button type="button" on:click={handleNew} title="Reset to default theme">
            <New />
            <span class="btn-label">New</span>
        </button>

        <input
            bind:this={fileInput}
            id="theme"
            type="file"
            accept=".bte,.json"
            hidden
            on:change={handleFileChange}
        />
        <button
            type="button"
            on:click={() => fileInput?.click()}
            title="Import .bte or .json theme file"
        >
            <Load />
            <span class="btn-label">Load</span>
        </button>

        <div class="export-group">
            <button
                type="button"
                class="primary-export"
                on:click={downloadBte}
                title="Download as .bte theme file"
            >
                <Save />
                <span class="btn-label">Export .bte</span>
            </button>
            <button
                type="button"
                class="export-chevron"
                aria-label="Export options"
                aria-expanded={exportMenuOpen}
                on:click={() => (exportMenuOpen = !exportMenuOpen)}
            >
                ▾
            </button>

            {#if exportMenuOpen}
                <button
                    type="button"
                    class="popover-backdrop"
                    aria-label="Close export options"
                    on:click={() => (exportMenuOpen = false)}
                ></button>
                <div class="export-popover" role="dialog" aria-label="Export and theme options">
                    <div class="popover-section">
                        <span class="popover-title">Target Bitwig Version</span>
                        <div class="segmented">
                            <button
                                type="button"
                                class:selected={$targetVersion === "bw5"}
                                on:click={() => targetVersion.set("bw5")}
                            >
                                Bitwig 4 / 5
                            </button>
                            <button
                                type="button"
                                class:selected={$targetVersion === "bw6"}
                                on:click={() => targetVersion.set("bw6")}
                            >
                                Bitwig 6+
                            </button>
                        </div>
                    </div>

                    <label class="toggle-row">
                        <input type="checkbox" bind:checked={$gradientEnabled} />
                        <span>Enable UI Gradients (<code>Gradient</code>)</span>
                    </label>

                    <label class="toggle-row">
                        <input type="checkbox" bind:checked={minimizeExport} />
                        <span>Minimize .bte (modified colors only)</span>
                    </label>

                    <label class="toggle-row">
                        <input type="checkbox" bind:checked={includeAliases} />
                        <span>Include cross-version aliases (BW5 ↔ BW6)</span>
                    </label>

                    <div class="popover-actions">
                        <button type="button" class="action-bte" on:click={downloadBte}>
                            Download .bte
                        </button>
                        <button type="button" class="action-json" on:click={downloadJson}>
                            Download .json (Legacy)
                        </button>
                    </div>
                </div>
            {/if}
        </div>

        <div class="divider" aria-hidden="true"></div>

        <button
            type="button"
            class="icon-btn"
            disabled={!$canUndo}
            on:click={undoColorChange}
            title="Undo (Ctrl/Cmd+Z)"
            aria-label="Undo"
        >
            ↶
        </button>
        <button
            type="button"
            class="icon-btn"
            disabled={!$canRedo}
            on:click={redoColorChange}
            title="Redo (Ctrl/Cmd+Shift+Z)"
            aria-label="Redo"
        >
            ↷
        </button>
    </span>

    <span class="center-group">
        <a
            id="main-title"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/berikai/bitwig-theme-editor-webui"
        >
            Bitwig Theme Editor WebUI
        </a>
    </span>

    <span id="how-to">
        <div class="version-switch" role="group" aria-label="Target Bitwig Version">
            <button
                type="button"
                class:active={$targetVersion === "bw5"}
                on:click={() => targetVersion.set("bw5")}
                title="Show Bitwig Studio 4.x / 5.x key names"
            >
                BW 4/5
            </button>
            <button
                type="button"
                class:active={$targetVersion === "bw6"}
                on:click={() => targetVersion.set("bw6")}
                title="Show Bitwig Studio 6+ key names"
            >
                BW 6+
            </button>
        </div>
        <button type="button" class="small-text" on:click={() => (modalState = true)}>
            How to apply themes?
        </button>

        {#if modalState}
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="howto-title"
                on:click|self={() => (modalState = false)}
            >
                <div class="modal-box">
                    <div class="modal-header">
                        <h1 id="howto-title">How to apply themes to Bitwig Studio?</h1>
                        <button
                            type="button"
                            class="modal-close"
                            aria-label="Close"
                            on:click={() => (modalState = false)}
                        >
                            ×
                        </button>
                    </div>
                    <p>
                        Export your theme as a <code>.bte</code> file and load it in
                        <strong>Bitwig Theme Editor</strong> (or save it as <code>theme.bte</code> in your Bitwig Theme Editor config directory).
                    </p>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/Berikai/bitwig-theme-editor"
                    >
                        Go to Bitwig Theme Editor Repository →
                    </a>
                    <p class="note">
                        Tip: You can also drag &amp; drop any <code>.bte</code> or <code>.json</code> file anywhere onto this page to load it.
                    </p>
                </div>
            </div>
        {/if}
    </span>
</nav>

<style>
    @media only screen and (max-width: 780px) {
        #how-to {
            display: none;
        }
    }
    @media only screen and (max-width: 620px) {
        #main-title {
            display: none;
        }
    }
    @media only screen and (max-width: 480px) {
        .btn-label {
            display: none;
        }
    }
    nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: var(--topbar-height);
        background-color: var(--color-bg-secondary);
        z-index: 3;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
        border-bottom: 1px solid var(--color-border);
        padding: 0 var(--spacing-md);
        gap: var(--spacing-sm);
    }
    nav.modal-open {
        z-index: 1000;
    }
    .left-group,
    .center-group,
    #how-to {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
    }
    button {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 34px;
        box-sizing: border-box;
        background-color: transparent;
        border: 1px solid transparent;
        color: var(--color-text-primary);
        font-size: 13px;
        font-weight: 500;
        padding: 0 10px;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all var(--transition-fast);
        gap: 6px;
        white-space: nowrap;
    }
    button:hover:not(:disabled) {
        background-color: var(--color-bg-tertiary);
        color: var(--color-accent);
    }
    button:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }
    .divider {
        width: 1px;
        height: 22px;
        background-color: var(--color-border);
        margin: 0 2px;
    }
    .icon-btn {
        font-size: 16px;
        padding: 0 8px;
    }
    .export-group {
        position: relative;
        display: inline-flex;
        align-items: stretch;
        border-radius: var(--radius-md);
        border: 1px solid rgba(255, 135, 19, 0.45);
        background-color: rgba(255, 135, 19, 0.12);
    }
    .primary-export {
        height: 32px;
        border: none;
        border-radius: calc(var(--radius-md) - 1px) 0 0 calc(var(--radius-md) - 1px);
        background-color: transparent;
        color: var(--color-text-primary);
    }
    .export-chevron {
        height: 32px;
        border: none;
        border-left: 1px solid rgba(255, 135, 19, 0.35);
        border-radius: 0 calc(var(--radius-md) - 1px) calc(var(--radius-md) - 1px) 0;
        padding: 0 8px;
        background-color: transparent;
        color: var(--color-text-primary);
        font-size: 11px;
    }
    .primary-export:hover:not(:disabled),
    .export-chevron:hover:not(:disabled) {
        background-color: rgba(255, 135, 19, 0.22);
        color: var(--color-accent-hover);
    }
    .popover-backdrop {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        z-index: 90;
        background: transparent;
        border: none;
        padding: 0;
        border-radius: 0;
        cursor: default;
    }
    .popover-backdrop:hover:not(:disabled) {
        background-color: transparent;
        color: inherit;
    }
    .export-popover {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        width: 300px;
        padding: 14px;
        background-color: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.55);
        z-index: 100;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .popover-section {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .popover-title {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-text-secondary);
    }
    .segmented {
        display: flex;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        overflow: hidden;
    }
    .segmented button {
        flex: 1;
        justify-content: center;
        border-radius: 0;
        font-size: 12px;
        padding: 6px 8px;
        background-color: var(--color-bg-primary);
        color: var(--color-text-secondary);
    }
    .segmented button.selected,
    .segmented button.selected:hover:not(:disabled) {
        background-color: var(--color-accent);
        color: var(--color-bg-primary);
        font-weight: 600;
    }
    .toggle-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: var(--color-text-primary);
        cursor: pointer;
    }
    .toggle-row input {
        accent-color: var(--color-accent);
        cursor: pointer;
    }
    .popover-actions {
        display: flex;
        flex-direction: column;
        gap: 6px;
        border-top: 1px solid var(--color-border);
        padding-top: 10px;
    }
    .action-bte {
        justify-content: center;
        background-color: var(--color-accent);
        color: var(--color-bg-primary);
        font-weight: 600;
    }
    .action-bte:hover {
        background-color: var(--color-accent-hover);
        color: var(--color-bg-primary);
    }
    .action-json {
        justify-content: center;
        border: 1px solid var(--color-border);
        font-size: 12px;
        color: var(--color-text-secondary);
    }
    #main-title {
        display: flex;
        align-items: center;
        color: var(--color-text-primary);
        text-decoration: none;
        font-size: 17px;
        font-family: var(--font-display);
        font-weight: 700;
        padding: 4px 8px;
        white-space: nowrap;
        transition: color var(--transition-fast);
    }
    #main-title:hover {
        color: var(--color-accent);
    }
    .version-switch {
        display: inline-flex;
        align-items: center;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        overflow: hidden;
        background-color: var(--color-bg-primary);
    }
    .version-switch button {
        height: 26px;
        padding: 0 8px;
        font-size: 11px;
        font-weight: 600;
        border: none;
        border-radius: 0;
        color: var(--color-text-secondary);
        background-color: transparent;
    }
    .version-switch button.active,
    .version-switch button.active:hover:not(:disabled) {
        background-color: var(--color-accent);
        color: var(--color-bg-primary);
    }
    .small-text {
        font-size: 12px;
        color: var(--color-text-secondary);
    }
    .small-text:hover {
        color: var(--color-text-primary);
    }
    .modal {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(4px);
        z-index: 100;
    }
    .modal-box {
        width: min(460px, 92vw);
        padding: var(--spacing-lg);
        background-color: var(--color-bg-secondary);
        color: var(--color-text-primary);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--color-border);
        padding-bottom: var(--spacing-sm);
    }
    .modal-header h1 {
        margin: 0;
        font-family: var(--font-display);
        font-size: 18px;
    }
    .modal-close {
        font-size: 20px;
        padding: 2px 6px;
        color: var(--color-text-secondary);
    }
    .modal-box p {
        margin: 0;
        line-height: 1.45;
        font-size: 13px;
        color: var(--color-text-secondary);
    }
    .modal-box a {
        color: var(--color-accent);
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
    }
    .modal-box a:hover {
        text-decoration: underline;
    }
    code {
        font-size: 12px;
        background-color: var(--color-bg-primary);
        padding: 2px 5px;
        border-radius: 4px;
        color: var(--color-text-primary);
    }
    .note {
        font-size: 12px;
        color: var(--color-text-secondary);
    }
</style>
