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
        ThemeStore.set(structuredClone(default_theme));
    };

    const changeTheme = () => {
        document.getElementById("theme").click();
    };

    let files;

    $: if (files) {
        files[0].text().then((text) => {
            const theme = structuredClone(default_theme);
            const loaded_json = structuredClone(JSON.parse(text));

            for (const key in loaded_json) {
                if (Object.prototype.hasOwnProperty.call(theme, key)) {
                    for (const in_key in loaded_json[key]) {
                        if (
                            Object.prototype.hasOwnProperty.call(
                                theme[key],
                                in_key,
                            )
                        ) {
                            theme[key][in_key] = loaded_json[key][in_key];
                        }
                    }
                }
            }

            ThemeStore.set(theme);
        });
    }

    function downloadJSON() {
        const theme_lowercase = structuredClone(theme);

        for (const key in theme_lowercase) {
            for (const in_key in theme_lowercase[key]) {
                theme_lowercase[key][in_key] =
                    theme_lowercase[key][in_key].toLowerCase();
            }
        }

        const dataStr = JSON.stringify(theme_lowercase, null, 2);

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

<nav class:modal-open={modalState}>
    <span>
        <button on:click={setDefault}><New />New</button>
        <input bind:files id="theme" type="file" hidden />
        <button on:click={changeTheme}><Load />Load</button>
        <button on:click={downloadJSON}><Save />Download</button>
    </span>
    <span>
        <a
            id="main-title"
            target="”_blank”"
            href="https://github.com/berikai/bitwig-theme-editor-webui"
            style="white-space: nowrap;">Bitwig Theme Editor WebUI</a
        >
    </span>
    <span id="how-to">
        <button class="small-text" on:click={() => (modalState = true)}
            >How to apply themes to Bitwig Studio?</button
        >
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="modal"
            style={modalState ? "display: flex;" : "display:none;"}
            on:click={() => (modalState = false)}
        >
            <div class="modal-box">
                <h1>How to apply themes to Bitwig Studio?</h1>
                <p>You can use Bitwig Theme Editor to apply themes.</p>
                <a
                    target="”_blank”"
                    href="https://github.com/Berikai/bitwig-theme-editor"
                    >Go to Bitwig Theme Editor Repository</a
                >
                <p class="note">
                    Note: Please don't confuse it with <code
                        >Bitwig Theme Editor WebUI</code
                    >.
                </p>
            </div>
        </div>
    </span>
</nav>

<style>
    @media only screen and (max-width: 719px) {
        #how-to {
            display: none;
        }
    }
    @media only screen and (min-width: 720px) {
        #how-to {
            display: flex;
        }
    }
    @media only screen and (max-width: 539px) {
        #main-title {
            display: none;
        }
    }
    @media only screen and (min-width: 540px) {
        #main-title {
            display: flex;
        }
    }
    nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: var(--topbar-height);
        background-color: var(--color-bg-secondary);
        z-index: 3;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
        border-bottom: 1px solid var(--color-border);
        padding: 0 var(--spacing-md);
    }
    nav.modal-open {
        z-index: 1000;
    }
    span {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-sm);
    }
    button {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: transparent;
        border: 1px solid transparent;
        color: var(--color-text-primary);
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all var(--transition-fast);
        gap: var(--spacing-sm);
    }
    button:hover {
        background-color: var(--color-bg-tertiary);
        color: var(--color-accent);
    }
    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: none;
        color: var(--color-text-primary);
        text-decoration: none;
        font-size: 18px;
        font-family: var(--font-display);
        font-weight: 700;
        padding: var(--spacing-sm);
        cursor: pointer;
        transition: color var(--transition-fast);
    }
    a:hover {
        color: var(--color-accent);
    }
    h1 {
        margin: 0;
        color: var(--color-bg-primary);
        font-family: var(--font-display);
        font-size: 20px;
        border-bottom: 1px solid #eee;
        padding-bottom: var(--spacing-sm);
    }
    code {
        font-style: normal;
        font-size: medium;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.1);
        padding: 2px 4px;
        border-radius: 4px;
    }
    .note {
        font-style: italic;
        font-size: smaller;
        color: #666;
    }
    .modal {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        /* Removed centering to allow manual positioning */
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 100;
    }
    .modal-box {
        --topbar-height: 56px;
        --modal-box-width: 460px;
        position: absolute; /* Changed back to absolute for manual placement */
        top: calc(var(--topbar-height) + 20px);
        right: 60px; /* Positioned to the right */
        width: var(--modal-box-width);
        height: auto;
        padding: var(--spacing-lg);
        background-color: #ffffff;
        color: var(--color-bg-primary);
        border-radius: var(--radius-lg);
        box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }
    .modal-box p {
        margin: 0;
        line-height: 1.4;
    }
    .modal-box a {
        color: var(--color-accent);
        font-size: 16px;
        font-family: var(--font-primary);
        justify-content: flex-start;
        padding: 0;
    }
    .modal-box a:hover {
        text-decoration: underline;
    }
    .small-text {
        font-size: 12px;
        color: var(--color-text-secondary);
    }
    .small-text:hover {
        color: var(--color-text-primary);
    }
</style>
