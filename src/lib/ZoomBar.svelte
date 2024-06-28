<script>
    import { scaling } from "./Scripts/Scaling";

    let scale;

    scaling.subscribe((value) => {
        scale = value;
        const scaleEl = document.getElementById("scale");
        if (scaleEl != undefined)
            scaleEl.innerText = `${scale}%`;
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
        width: 75px;
        top: 12px;
        /*left: calc(max(var(--sidebar-width), var(--sidebar-min-width)) + 24px);*/
        right: -99px;
        height: 30px;
        background-color: lightgray;
        z-index: 2;
        border-radius: 5px;
        box-shadow: #2c2c2c 0px 0px 15px;
        background-color: #2f2f2f;
        border-radius: 5px;
        overflow: hidden;
    }
    button {
        border: none;
        color: whitesmoke;
        text-decoration: none;
        width: 25px;
        background-color: #2f2f2f;
    }
    button:hover {
        background-color: #4f4f4f;
    }
    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 12px;
        width: 100%;
        background-color: #6f6f6f;
    }
</style>