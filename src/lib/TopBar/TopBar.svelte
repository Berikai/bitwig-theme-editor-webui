<script>
    import New from "./NewIcon.svelte";
    import Load from "./LoadIcon.svelte";
    import Save from "./SaveIcon.svelte";

    import { default_theme, ThemeStore } from "../Scripts/Theme";

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });

    const setDefault = () => {
        ThemeStore.set(structuredClone(default_theme))
    }

    const changeTheme = () => {
        document.getElementById("theme").click();
    }

    let files;

    $: if (files) {
        files[0].text().then((text) => {
            ThemeStore.set(structuredClone(JSON.parse(text)));
        });
    }

    function downloadJSON() {
        const dataStr = JSON.stringify(theme, null, 2);
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

    let modalState = false;
</script>

<nav>
    <span>
        <button on:click={setDefault}><New />New</button>
        <input bind:files id="theme" type="file" hidden/>
        <button on:click={changeTheme}><Load />Load</button>
        <button on:click={downloadJSON}><Save />Download</button>
    </span>
    <span>
        <a id="main-title" target=”_blank” href="https://github.com/berikai/bitwig-theme-editor-webui" style="white-space: nowrap;">Bitwig Theme Editor WebUI</a>
    </span>
    <span id="how-to">
        <button class="small-text" on:click={() => modalState = true}>How to apply themes to Bitwig Studio?</button>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="modal" style={modalState ? "display: flex;" : "display:none;"} on:click={() => modalState = false}>
            <div class="modal-box">
                <h1>How to apply themes to Bitwig Studio?</h1>
                <p>You can use Bitwig Theme Editor to apply themes.</p>
                <a target=”_blank” href="https://github.com/Berikai/bitwig-theme-editor">Go to Bitwig Theme Editor Repository</a>
                <p class="note">Note: Please don't confuse it with <code>Bitwig Theme Editor WebUI</code>.</p>
            </div>
        </div>
    </span>
</nav>

<style>
    @media only screen and (max-width: 719px) {
        #how-to { display: none; }
    }
    @media only screen and (min-width: 720px) {
        #how-to { display: flex; }
    }
    @media only screen and (max-width: 539px) {
        #main-title { display: none; }
    }
    @media only screen and (min-width: 540px) {
        #main-title { display: flex; }
    }
    nav {
        --topbar-height: 40px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: var(--topbar-height);
        background-color: #2f2f2f;
        z-index: 3;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
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
        font-weight: 500;
        margin: 4px 4px;
        cursor: pointer;
    }
    button:hover {
        background-color: #4f4f4f;
    }
    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: #2f2f2f;
        border: none;
        color: whitesmoke;
        text-decoration: none;
        font-size: 16px;
        font-weight: 600;
        margin: 4px 4px;
        padding: 4px;
        cursor: pointer;
        overflow: hidden;
    }
    h1 {
        margin: auto;
        color: #010101;
    }
    code {
        font-style: normal;
        font-size: medium;
        font-weight: bold;
    }
    .note {
        font-style: italic;
        font-size: smaller;
    }
    .modal {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
    }
    .modal-box {
        --topbar-height: 40px;
        --modal-box-width: 460px;
        position: relative;
        top: calc(var(--topbar-height) + 20px);
        left: calc(100vw - var(--modal-box-width) - 60px);
        width: var(--modal-box-width);
        height: 160px;
        padding: 20px;
        background-color: whitesmoke;
        color: #020202;
        border-bottom-left-radius: 25px;
        border: 2px solid #020202;
        box-shadow: #010101 0px 10px 25px;
    }
</style>