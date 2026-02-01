<script>
    import { scaling } from "./Scripts/Scaling";

    let scale;

    scaling.subscribe((value) => {
        scale = value;
        const scaleEl = document.getElementById("scale");
        if (scaleEl != undefined) scaleEl.innerText = `${scale}%`;
    });

    const increase = () => {
        if (scale >= 300) {
            scale = 300;
            scaling.set(scale);
            return;
        }

        if (scale < 100) {
            scale += 10;
            scaling.set(scale);
            return;
        }

        scale += 25;
        scaling.set(scale);
    };

    const decrease = () => {
        if (scale <= 50) {
            scale = 50;
            scaling.set(scale);
            return;
        }

        if (scale <= 100) {
            scale -= 10;
            scaling.set(scale);
            return;
        }

        scale -= 25;
        scaling.set(scale);
    };
</script>

<div>
    <button id="decrease" on:click={decrease}>-</button>
    <i id="scale">{scale}%</i>
    <button id="increase" on:click={increase}>+</button>
</div>

<style>
    div {
        display: flex;
        justify-content: space-between;
        position: absolute;
        width: 80px;
        top: 12px;
        right: -104px;
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
        width: 24px;
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
    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 12px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.05);
        color: var(--color-text-secondary);
        cursor: default;
    }
</style>
