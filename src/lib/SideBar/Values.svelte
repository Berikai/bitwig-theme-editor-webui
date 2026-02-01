<script>
    import Value from "./Value.svelte";
    import { ThemeStore } from "../Scripts/Theme";
    import Contributors from "../Scripts/Contributors";
    import { selectedValue } from "../Scripts/BindValues";

    export let display = "flex";

    let theme;

    ThemeStore.subscribe((value) => {
        theme = value;
    });

    let selected;

    selectedValue.subscribe((value) => {
        selected = value;
    });

    let modalState = false;

    let searchValue = "";

    function search(searchValue, selected) {
        const values = document.querySelector(`#${selected}`);

        if (values == null) {
            return;
        }

        const allElements = values.querySelectorAll("*");
        // Convert NodeList to array
        const allElementsArray = Array.from(allElements);
        // TODO: Search by sorting!

        let isAccurateFound = false;
        for (let i = allElementsArray.length - 1; i >= 0; i--) {
            const element = allElementsArray[i];

            if (searchValue == "" && element.tagName == "DIV") {
                // @ts-ignore
                element.style.backgroundColor = "";
                continue;
            }

            if (
                element.id.toLowerCase() === searchValue.toLowerCase() &&
                !isAccurateFound
            ) {
                // @ts-ignore
                element.parentElement.parentElement.style.backgroundColor =
                    "var(--color-highlight-selection)"; // Use variable
                element.parentElement.parentElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
                isAccurateFound = true;
                continue;
            }

            if (
                element.textContent
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) &&
                element.tagName == "DIV"
            ) {
                if (!isAccurateFound) {
                    // @ts-ignore
                    element.style.backgroundColor =
                        "var(--color-highlight-search)"; // Use variable
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
            } else if (element.tagName == "DIV") {
                // @ts-ignore
                element.style.backgroundColor = "";
            }
        }
    }

    $: search(searchValue, selected);
</script>

<aside style="--display-aside:{display};" class:modal-open={modalState}>
    <nav>
        <button
            on:click={() => selectedValue.set("window")}
            style={selected == "window"
                ? `border-bottom: 3px solid ${theme["window"]["On"]};`
                : ""}>Window</button
        >
        <button
            on:click={() => selectedValue.set("arranger")}
            style={selected == "arranger"
                ? `border-bottom: 3px solid ${theme["window"]["On"]};`
                : ""}>Arranger</button
        >
        <button
            on:click={() => selectedValue.set("advanced")}
            style={selected == "advanced"
                ? `border-bottom: 3px solid ${theme["window"]["On"]};`
                : ""}>Advanced</button
        >
    </nav>
    <span>Values</span>
    <input
        id="search_bar"
        type="text"
        placeholder="Search color values"
        bind:value={searchValue}
    />
    <section id="window" style={selected != "window" ? "display: none;" : ""}>
        {#each Object.keys(theme["window"]) as value (value)}
            <Value {value} selected={"window"} />
        {/each}
    </section>
    <section
        id="arranger"
        style={selected != "arranger" ? "display: none;" : ""}
    >
        {#each Object.keys(theme["arranger"]) as value (value)}
            <Value {value} selected={"arranger"} />
        {/each}
    </section>
    <section
        id="advanced"
        style={selected != "advanced" ? "display: none;" : ""}
    >
        {#each Object.keys(theme["advanced"]) as value (value)}
            <Value {value} selected={"advanced"} />
        {/each}
    </section>
    <nav>
        <a
            target="”_blank”"
            href="https://docs.google.com/spreadsheets/d/1iDRYxo2RMPbe8ldjIJqW2GKF_mb1Ldy4Fg6RKudc5jI/edit?gid=1944421253#gid=1944421253"
            >Spreadsheet</a
        >
        <button on:click={() => (modalState = true)}>Credits</button>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="modal"
            style={modalState ? "display: flex;" : "display:none;"}
            on:click={() => (modalState = false)}
        >
            <div class="modal-box">
                <h1>Credits</h1>
                <p>
                    This theme editor wouldn't have been possible without the
                    incredible efforts and support from the Bitwig community.
                </p>
                <p>
                    A special big thank you to the ones who contributed in
                    finding which color values influence various UI elements.
                </p>
                <ul>
                    {#each Contributors["theme_elements"] as contributor}
                        <li>{contributor}</li>
                    {/each}
                </ul>
            </div>
        </div>
    </nav>
</aside>

<style>
    aside {
        display: var(--display-aside);
        flex-direction: column;
        height: 100%;
        width: 100%;
        background-color: var(--color-bg-secondary);
        z-index: 2;
    }
    aside.modal-open {
        z-index: 10;
    }
    nav {
        display: flex;
        flex-direction: row;
        width: 100%;
        border-bottom: 1px solid var(--color-border);
    }
    section {
        --button-height: 48px;
        --span-height: 40px;
        height: 100%;
        overflow-y: auto;
        background-color: var(--color-bg-primary);
        overflow-x: hidden;
    }
    span {
        --span-height: 40px;
        padding-left: var(--spacing-md);
        padding-right: var(--spacing-md);
        font-size: 14px;
        font-weight: 600;
        height: var(--span-height);
        background-color: var(--color-bg-tertiary);
        color: var(--color-text-secondary);
        display: flex;
        align-items: center;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    input {
        height: 40px;
        padding: 0 var(--spacing-md);
        border: none;
        color: var(--color-text-primary);
        background-color: var(--color-bg-secondary);
        font-weight: 400;
        font-size: 14px;
        border-bottom: 1px solid var(--color-border);
    }
    input:focus {
        outline: none;
        background-color: var(--color-bg-tertiary);
    }
    ::placeholder {
        color: var(--color-text-secondary);
        opacity: 1;
    }
    button {
        --button-height: 48px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: var(--button-height);
        color: var(--color-text-secondary);
        background-color: transparent;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--transition-fast);
        border-bottom: 2px solid transparent;
    }
    button:hover {
        background-color: var(--color-bg-tertiary);
        color: var(--color-text-primary);
    }
    a {
        --button-height: 48px;
        text-decoration: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: var(--button-height);
        background-color: transparent;
        font-size: 14px;
        font-weight: 600;
        color: var(--color-text-secondary);
        transition: all var(--transition-fast);
    }
    a:hover {
        background-color: var(--color-bg-tertiary);
        color: var(--color-text-primary);
        cursor: pointer;
    }
    h1 {
        font-size: 20px;
        margin: 0;
        color: var(--color-bg-primary);
        font-family: var(--font-display);
        border-bottom: 1px solid #eee;
        padding-bottom: var(--spacing-sm);
    }
    .modal {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center; /* Prevent stretching */
        justify-content: center; /* Center horizontally */
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 100;
    }
    .modal-box {
        --modal-box-height: auto;
        --modal-box-width: 460px;
        position: relative;
        /* top/left/transform removed as parent handles centering */
        width: var(--modal-box-width);
        height: auto;
        max-height: 80vh;
        padding: var(--spacing-lg);
        background-color: #ffffff;
        color: var(--color-bg-primary);
        border-radius: var(--radius-lg);
        box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        overflow-y: auto;
    }
    .modal-box p {
        margin: 0;
        line-height: 1.4;
    }
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-xs);
    }
    li {
        font-size: 14px;
        color: #444;
    }
</style>
