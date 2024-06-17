<script>
    import Value from "./Value.svelte";
    import { theme } from "../Theme";
    import ColorPicker from "./ColorPicker.svelte";

    let themeValue;

    theme.subscribe((value) => {
        themeValue = value;
    });

    let selected = "window";
</script>

<aside>
    <nav>
        <button on:click={() => selected = "window"} style={selected == "window" ? `border-bottom: 3px solid ${themeValue["window"]["On"]};` : ""}>Window</button>
        <button on:click={() => selected = "arranger"} style={selected == "arranger" ? `border-bottom: 3px solid ${themeValue["window"]["On"]};` : ""}>Arranger</button>
    </nav>
    <span>Values</span>
    <section id="window" style={selected != "window" ? "display: none;" : ""}>
        {#each Object.keys(themeValue["window"]) as value (value)}
            <Value value={value} selected={"window"}/>
        {/each}
    </section>
    <section id="arranger" style={selected != "arranger" ? "display: none;" : ""}>
        {#each Object.keys(themeValue["arranger"]) as value (value)}
            <Value value={value} selected={"arranger"}/>
        {/each}
    </section>
</aside>

<style>
    aside {
        display: flex;  
        flex-direction: column;
        height: 100%;
        background-color: gray;
        z-index: 2;
    }
    nav {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    section {
        --topbar-height: 40px;
        --button-height: 40px;
        --span-height: 30px;
        /*height: calc(50% - (var(--topbar-height) + var(--button-height) + var(--span-height)));*/
        height: 100%;
        overflow-y: auto;
    }
    span {
        --span-height: 30px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: large;
        font-weight: 700;
        height: var(--span-height);
        background-color: #8f8f8f;
    }
    button {
        --button-height: 40px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: var(--button-height);
        background-color: #4f4f4f;
        font-size: larger;
        font-weight: 900;
    }
    button:hover {
        background-color: #6f6f6f;
        cursor: pointer;
    }
</style>