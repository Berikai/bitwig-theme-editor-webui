<script>
    import Reference from '../../assets/reference.png'
    import TopBar from './TopBar/TopBar.svelte';
    import WindowBar from './WindowBar/WindowBar.svelte';

    import { ThemeStore } from "../Scripts/Theme";
    import { scaling } from "../Scripts/Scaling";
    import Bottom from './BottomBar/BottomBar.svelte';
    import Inspector from './Panel/Inspector/Inspector.svelte';
    import Middle from './Panel/Middle/Middle.svelte';
    import Right from './Panel/Right/Right.svelte';
    
    import { onMount } from 'svelte';
    import { bindValues } from '../Scripts/BindValues';

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });

    let scale = 100;

    scaling.subscribe((value) => {
        scale = value;
    });

    const showReference = 0; // Development only, set to 0 in production

    onMount(() => {
        bindValues();
    });
</script>

<div class="scaler" style="transform: scale({scale/100}); {scale > 100 ? "transform-origin: 0 0;" : ""}">
    <div id="bitwig" style="{showReference ? `background-image: url(${Reference});` : ""} background-color: {theme["window"]["Window background"]};"> <!--  zoom: {scale}%;" -->
        <TopBar />
        <WindowBar />
        <span>
            <Inspector />
            <Middle />
            <Right />
        </span>
        <Bottom />
    </div>
</div>

<style>
    .scaler {
        --content-padding: 50px;
        padding: var(--content-padding);
    }

    #bitwig {
        box-shadow: #202020 0px 0px 15px;
    }

    div {
        --width: 1228px;
        --height: 768px;
        --top-margin: 50px;

        display: flex;
        flex-direction: column;
        min-width: var(--width);
        margin: auto;
        /*margin-top: max(var(--top-margin), calc(var(--top-margin) + (100vh - var(--height)) / 6)); /* Center vertically */
        width: var(--width);
        height: var(--height);
        cursor: pointer;
    }
    span {
        --side-margin: 5px;
        width: calc(100% - calc(2 * var(--side-margin)));
        height: 655px;
        display: flex;
        flex-direction: row;

        margin-top: 3px;
        margin-bottom: 2px;
        margin-left: 5px;

        opacity: 1; /*Development only, set to 1 in production */
    }
</style>