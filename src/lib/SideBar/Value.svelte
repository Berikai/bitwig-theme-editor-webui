<script>
    export let value;
    export let selected;

    import {
        activeKey,
        default_theme,
        resetColorValue,
        setColorValue,
        targetVersion,
        ThemeStore,
    } from "../Scripts/Theme";
    import { BW5_TO_BW6, normalizeHexColor } from "../Scripts/BteFormat";
    import ThemeInfo from "../Scripts/ThemeInfo";
    import { openColorPicker } from "./SharedColorPicker.svelte";

    let swatchBtn;
    let hexInput = "";
    let isEditingHex = false;

    $: currentColor = $ThemeStore[selected]?.[value] || "#000000";
    $: defaultColor = default_theme[selected]?.[value] || "#000000";
    $: isModified = currentColor.toLowerCase() !== defaultColor.toLowerCase();
    $: isActive = $activeKey?.category === selected && $activeKey?.key === value;
    $: description = ThemeInfo[selected]?.[value] || "";
    $: bw6Alias = BW5_TO_BW6[value] || null;
    $: displayKey = $targetVersion === "bw6" && bw6Alias ? bw6Alias : value;
    $: secondaryHint =
        $targetVersion === "bw6" && bw6Alias && bw6Alias !== value
            ? `BW4/5: ${value}`
            : null;

    $: if (!isEditingHex) {
        hexInput = currentColor.toLowerCase();
    }

    function handleSwatchClick() {
        activeKey.set({ category: selected, key: value });
        openColorPicker(selected, value, swatchBtn);
    }

    function commitHexInput() {
        isEditingHex = false;
        const normalized = normalizeHexColor(hexInput);
        if (normalized) {
            setColorValue(selected, value, normalized, true);
            hexInput = normalized;
        } else {
            hexInput = currentColor.toLowerCase();
        }
    }

    function handleHexKeydown(e) {
        if (e.key === "Enter") {
            e.currentTarget.blur();
        } else if (e.key === "Escape") {
            hexInput = currentColor.toLowerCase();
            isEditingHex = false;
            e.currentTarget.blur();
        }
    }
</script>

<div
    class="value-row"
    class:active={isActive}
    class:modified={isModified}
    data-color-key={value}
>
    <div class="info-col">
        <div class="title-line">
            <span class="key-name" title={displayKey}>{displayKey}</span>
            {#if isModified}
                <span class="modified-dot" title="Modified from default"></span>
            {/if}
        </div>
        {#if secondaryHint}
            <span class="alias-hint">{secondaryHint}</span>
        {/if}
        {#if description}
            <span class="info">{description}</span>
        {/if}
    </div>

    <div class="controls-col">
        {#if isModified}
            <button
                type="button"
                class="reset-btn"
                title="Reset to default ({defaultColor})"
                aria-label="Reset {value} to default"
                on:click|stopPropagation={() => resetColorValue(selected, value)}
            >
                ↺
            </button>
        {/if}

        <input
            type="text"
            class="hex-input"
            aria-label="{value} hex color"
            bind:value={hexInput}
            on:focus={() => (isEditingHex = true)}
            on:blur={commitHexInput}
            on:keydown={handleHexKeydown}
            spellcheck="false"
        />

        <button
            bind:this={swatchBtn}
            type="button"
            class="swatch-btn"
            aria-label="Pick color for {value}"
            title="Pick color ({currentColor})"
            on:click={handleSwatchClick}
        >
            <span class="swatch-fill" style="background-color: {currentColor};"></span>
        </button>
    </div>
</div>

<style>
    .value-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        min-height: 46px;
        color: var(--color-text-primary);
        background-color: var(--color-bg-secondary);
        border-bottom: 1px solid var(--color-border);
        border-left: 3px solid transparent;
        padding: 8px 12px;
        transition: background-color var(--transition-fast), border-color var(--transition-fast);
    }

    .value-row:hover {
        background-color: var(--color-bg-tertiary);
    }

    .value-row.modified {
        border-left-color: var(--color-accent);
    }

    .value-row.active {
        background-color: var(--color-highlight-selection);
        border-left-color: var(--color-success);
    }

    .info-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
        flex: 1;
        gap: 2px;
    }

    .title-line {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .key-name {
        font-size: 13px;
        font-weight: 500;
        line-height: 1.3;
        word-break: break-word;
        user-select: text;
    }

    .modified-dot {
        flex-shrink: 0;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: var(--color-accent);
    }

    .alias-hint {
        font-size: 11px;
        color: var(--color-accent);
        opacity: 0.9;
    }

    .info {
        font-size: 11px;
        line-height: 1.35;
        color: var(--color-text-secondary);
    }

    .controls-col {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
    }

    .reset-btn {
        background: transparent;
        border: 1px solid var(--color-border);
        color: var(--color-text-secondary);
        border-radius: var(--radius-sm);
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        cursor: pointer;
        padding: 0;
        transition: all var(--transition-fast);
    }

    .reset-btn:hover {
        background-color: var(--color-bg-primary);
        color: var(--color-text-primary);
        border-color: var(--color-text-secondary);
    }

    .hex-input {
        width: 72px;
        background-color: var(--color-bg-primary);
        color: var(--color-text-primary);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        padding: 3px 6px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 11px;
        text-align: center;
        user-select: text;
    }

    .hex-input:focus {
        outline: none;
        border-color: var(--color-accent);
    }

    .swatch-btn {
        position: relative;
        width: 26px;
        height: 26px;
        padding: 0;
        border-radius: var(--radius-sm);
        border: 1px solid rgba(255, 255, 255, 0.25);
        cursor: pointer;
        overflow: hidden;
        background-image:
            linear-gradient(45deg, #444 25%, transparent 25%),
            linear-gradient(-45deg, #444 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #444 75%),
            linear-gradient(-45deg, transparent 75%, #444 75%);
        background-size: 8px 8px;
        background-position: 0 0, 0 4px, 4px -4px, -4px 0;
        background-color: #222;
        transition: transform var(--transition-fast), border-color var(--transition-fast);
    }

    .swatch-btn:hover {
        transform: scale(1.06);
        border-color: var(--color-accent);
    }

    .swatch-fill {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
