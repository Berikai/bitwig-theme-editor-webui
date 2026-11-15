<script>
    import Bitwig from "./BitwigUI/Bitwig.svelte";
    import { scaling } from "./Scripts/Scaling";
    import { hoveredPreviewKey, targetVersion, ThemeStore } from "./Scripts/Theme";
    import { BW5_TO_BW6 } from "./Scripts/BteFormat";

    function handleWheel(e) {
        if (!e.ctrlKey && !e.metaKey) return;
        e.preventDefault();
        scaling.update((s) => {
            const delta = e.deltaY < 0 ? 10 : -10;
            return Math.max(50, Math.min(300, s + delta));
        });
    }

    $: displayHoveredKey = $hoveredPreviewKey
        ? ($targetVersion === "bw6"
            ? BW5_TO_BW6[$hoveredPreviewKey.key] || $hoveredPreviewKey.key
            : $hoveredPreviewKey.key)
        : "";
    $: hoveredCategoryLabel =
        $hoveredPreviewKey?.category === "patched"
            ? "devices"
            : $hoveredPreviewKey?.category || "";
</script>

<div class="transparent-bg" on:wheel={handleWheel}>
    <Bitwig />
</div>

{#if $hoveredPreviewKey}
    <div
        class="preview-tooltip"
        style="left: {Math.min($hoveredPreviewKey.x + 14, (typeof window !== 'undefined' ? window.innerWidth - 260 : 900))}px; top: {$hoveredPreviewKey.y + 16}px;"
        role="status"
        aria-live="polite"
    >
        <span
            class="tooltip-swatch"
            style="background-color: {$ThemeStore[$hoveredPreviewKey.category]?.[$hoveredPreviewKey.key] || '#000000'};"
        ></span>
        <span class="tooltip-meta">
            <strong>{displayHoveredKey}</strong>
            <small>
                {hoveredCategoryLabel} · {$targetVersion === "bw6" ? "BW 6+" : "BW 4/5"} · {$ThemeStore[$hoveredPreviewKey.category]?.[$hoveredPreviewKey.key] || ""}
            </small>
        </span>
    </div>
{/if}

<style>
    .transparent-bg {
        background-image: url("../assets/transparent.png");
        background-size: 20px 20px;
        display: flex;
        flex: 1;
        min-width: 0;
        overflow: auto;
        scrollbar-color: #444 #333;
    }

    .preview-tooltip {
        position: fixed;
        z-index: 50;
        pointer-events: none;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        background-color: rgba(24, 24, 24, 0.94);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
        color: var(--color-text-primary);
        font-size: 12px;
        backdrop-filter: blur(6px);
    }

    .tooltip-swatch {
        width: 16px;
        height: 16px;
        border-radius: 3px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        flex-shrink: 0;
    }

    .tooltip-meta {
        display: flex;
        flex-direction: column;
        line-height: 1.25;
    }

    .tooltip-meta strong {
        font-size: 12px;
        font-weight: 600;
    }

    .tooltip-meta small {
        font-size: 11px;
        color: var(--color-text-secondary);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
</style>
