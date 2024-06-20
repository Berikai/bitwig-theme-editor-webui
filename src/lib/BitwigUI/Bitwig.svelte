<script>
    import Reference from '../../assets/reference.png'
    import TopBar from './TopBar/TopBar.svelte';
    import WindowBar from './WindowBar/WindowBar.svelte';

    import { theme } from "../Theme";
    import Bottom from './Bottom/Bottom.svelte';

    let themeValue;

    theme.subscribe((_value) => {
        themeValue = _value;
    });

    const showReference = 0; // Development only, set to 0 in production
</script>

<div id="bitwig" style="{showReference ? `background-image: url(${Reference});` : ""} background-color: {themeValue["window"]["Window background"]};">
    <TopBar />
    <WindowBar />
    <span>
        <slot></slot>
    </span>
    <Bottom />
</div>

<style>
    div {
        --width: 1228px;
        --height: 768px;
        --top-margin: 50px;

        cursor: default;

        display: flex;
        flex-direction: column;
        min-width: var(--width);
        margin: auto;
        /*margin-top: max(var(--top-margin), calc(var(--top-margin) + (100vh - var(--height)) / 6)); /* Center vertically */
        width: var(--width);
        height: var(--height);
        box-shadow: #202020 0px 0px 15px;
    }
    span {
        --side-margin: 5px;
        width: calc(100% - calc(2 * var(--side-margin)));
        height: 656px;
        display: flex;
        flex-direction: row;
        background-color: #00ff00;

        margin-top: 2px;
        margin-bottom: 2px;
        margin-left: 5px;

        opacity: 0.5; /*Development only, set to 1 in production */
    }
</style>