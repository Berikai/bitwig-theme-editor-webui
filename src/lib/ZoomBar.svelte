<script>
    import { scaling } from "./Scripts/Scaling";

    const increase = () => {
        scaling.update((s) => {
            if (s >= 300) return 300;
            if (s < 100) return s + 10;
            return s + 25;
        });
    };

    const decrease = () => {
        scaling.update((s) => {
            if (s <= 50) return 50;
            if (s <= 100) return s - 10;
            return s - 25;
        });
    };

    const resetZoom = () => scaling.set(100);
</script>

<div class="zoom-bar">
    <button type="button" id="decrease" aria-label="Zoom out" on:click={decrease}>-</button>
    <button
        type="button"
        id="scale"
        class="scale-readout"
        title="Reset zoom to 100%"
        on:click={resetZoom}
    >
        {$scaling}%
    </button>
    <button type="button" id="increase" aria-label="Zoom in" on:click={increase}>+</button>
</div>

<style>
    .zoom-bar {
        display: flex;
        justify-content: space-between;
        position: absolute;
        width: 96px;
        top: 12px;
        right: -112px;
        height: 32px;
        background-color: var(--color-bg-tertiary);
        z-index: 2;
        border-radius: var(--radius-md);
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        border: 1px solid var(--color-border);
    }
    button {
        border: none;
        color: var(--color-text-primary);
        text-decoration: none;
        width: 26px;
        background-color: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        transition: background-color var(--transition-fast);
    }
    button:hover {
        background-color: var(--color-accent);
        color: var(--color-bg-primary);
    }
    .scale-readout {
        font-weight: 600;
        font-size: 11px;
        flex: 1;
        width: auto;
        background-color: rgba(255, 255, 255, 0.05);
        color: var(--color-text-secondary);
    }
    .scale-readout:hover {
        background-color: rgba(255, 255, 255, 0.12);
        color: var(--color-text-primary);
    }
</style>
