<script>
    import Reference from '../../assets/reference.png'
    import TopBar from './TopBar/TopBar.svelte';
    import WindowBar from './WindowBar/WindowBar.svelte';

    import { theme } from "../Theme";

    let themeValue;

    theme.subscribe((_value) => {
        themeValue = _value;
    });

    const showReference = 0;
</script>

<div id="bitwig" style="{showReference ? `background-image: url(${Reference});` : ""} background-color: {themeValue["window"]["Window background"]};">
    <TopBar />
    <WindowBar />
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
    }
</style>