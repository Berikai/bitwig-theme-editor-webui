<script>
    import New from "./TopBar/NewIcon.svelte";
    import Load from "./TopBar/LoadIcon.svelte";
    import Save from "./TopBar/SaveIcon.svelte";

    import { default_theme, theme } from "./Theme";

    let themeValue;

    theme.subscribe((_value) => {
        themeValue = _value;
    });

    const setDefault = () => {
        theme.set(structuredClone(default_theme))
    }

    const changeTheme = () => {
        document.getElementById("theme").click();
    }

    let files;

    $: if (files) {
        files[0].text().then((text) => {
            theme.set(structuredClone(JSON.parse(text)));
        });
    }

    function downloadJSON() {
        const dataStr = JSON.stringify(themeValue, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "theme.json";
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
</script>

<nav>
    <span>
        <button on:click={setDefault}><New />New</button>
        <input bind:files id="theme" type="file" hidden/>
        <button on:click={changeTheme}><Load />Load</button>
        <button on:click={downloadJSON}><Save />Download</button>
    </span>
    <span>
        <button>Bitwig Theme Editor</button>
    </span>
</nav>

<style>
    nav {
        --topbar-height: 40px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: var(--topbar-height);
        background-color: #2f2f2f;
        z-index: 2;
    }
    span {
        display: flex;
        flex-direction: row;
        margin-left: 10px;
        margin-right: 10px;
    }
    button {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #2f2f2f;
        border: none;
        color: whitesmoke;
        text-decoration: none;
        font-size: 16px;
        font-weight: 600;
        margin: 4px 4px;
        cursor: pointer;
    }
    button:hover {
        background-color: #4f4f4f;
    }
</style>