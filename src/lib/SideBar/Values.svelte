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

    function search (searchValue, selected) {
        const values = document.querySelector(`#${selected}`);

        if(values == null) {
            return;
        } 

        const allElements = values.querySelectorAll('*');
        // Convert NodeList to array
        const allElementsArray = Array.from(allElements);
        // TODO: Search by sorting!

        let isAccurateFound = false;
        for (let i = allElementsArray.length-1; i >= 0; i--) {
            const element = allElementsArray[i];

            if(searchValue == "" && element.tagName == "DIV") {
                // @ts-ignore
                element.style.backgroundColor = 'whitesmoke';
                continue;
            }

            if (element.id.toLowerCase() === searchValue.toLowerCase() && !isAccurateFound) {
                // @ts-ignore
                element.parentElement.parentElement.style.backgroundColor = 'lime';
                element.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                isAccurateFound = true;
                continue;
            }
            
            if (element.textContent.toLowerCase().includes(searchValue.toLowerCase()) && element.tagName == "DIV") {
                if (!isAccurateFound) {
                    // @ts-ignore
                    element.style.backgroundColor = 'yellow';
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else if (element.tagName == "DIV") {
                // @ts-ignore
                element.style.backgroundColor = 'whitesmoke';
            }
        }
    }

    $: search(searchValue, selected);

</script>

<aside style="--display-aside:{display};">
    <nav>
        <button on:click={() => selectedValue.set("window")} style={selected == "window" ? `border-bottom: 3px solid ${theme["window"]["On"]};` : ""}>Window</button>
        <button on:click={() => selectedValue.set("arranger")} style={selected == "arranger" ? `border-bottom: 3px solid ${theme["window"]["On"]};` : ""}>Arranger</button>
        <button on:click={() => selectedValue.set("advanced")} style={selected == "advanced" ? `border-bottom: 3px solid ${theme["window"]["On"]};` : ""}>Advanced</button>
    </nav>
    <span>Values</span>
    <input id="search_bar" type="text" placeholder="Search color values" bind:value={searchValue} />
    <section id="window" style={selected != "window" ? "display: none;" : ""}>
        {#each Object.keys(theme["window"]) as value (value)}
        <Value value={value} selected={"window"}/>
        {/each}
    </section>
    <section id="arranger" style={selected != "arranger" ? "display: none;" : ""}>
        {#each Object.keys(theme["arranger"]) as value (value)}
        <Value value={value} selected={"arranger"}/>
        {/each}
    </section>
    <section id="advanced" style={selected != "advanced" ? "display: none;" : ""}>
        {#each Object.keys(theme["advanced"]) as value (value)}
        <Value value={value} selected={"advanced"}/>
        {/each}
    </section>
    <nav>
        <a target=”_blank” href="https://docs.google.com/spreadsheets/d/1iDRYxo2RMPbe8ldjIJqW2GKF_mb1Ldy4Fg6RKudc5jI/edit?gid=1944421253#gid=1944421253">Spreadsheet</a>
        <button on:click={() => modalState = true}>Credits</button>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="modal" style={modalState ? "display: flex;" : "display:none;"} on:click={() => modalState = false}>
            <div class="modal-box">
                <h1>Credits</h1>
                <p>This theme editor wouldn't have been possible without the incredible efforts and support from the Bitwig community.</p>
                <p>A special big thank you to the ones who contributed in finding which color values influence various UI elements.</p>
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
    input {
        height: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 10px;
        padding-right: 10px;
        border: none;
        color: whitesmoke;
        background-color: #6f6f6f;
        font-weight: 600;
    }
    input:focus {
        outline: none;
    }
    ::placeholder {
        color: lightgray;
        opacity: 1; /* Firefox */
    }
    button {
        --button-height: 40px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: var(--button-height);
        color: whitesmoke;
        background-color: #4f4f4f;
        font-size: larger;
        font-weight: 700;
    }
    button:hover {
        background-color: #6f6f6f;
        cursor: pointer;
    }
    a {
        --button-height: 40px;
        text-decoration: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: var(--button-height);
        background-color: #4f4f4f;
        font-size: larger;
        font-weight: 700;
        color: whitesmoke;
    }
    a:hover {
        background-color: #6f6f6f;
        cursor: pointer;
    }
    h1 {
        font-size: 22px;
        margin: auto;
        color: #010101;
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
        --modal-box-height: 320px;
        --modal-box-width: 460px;
        position: relative;
        top: calc(100vh - var(--modal-box-height) - var(--topbar-height) - 4*22px);
        left: min(calc(max(var(--sidebar-width), var(--sidebar-min-width)) + 60px), calc(60vw - var(--modal-box-width)/1.7));
        width: var(--modal-box-width);
        height: var(--modal-box-height);
        padding: 20px;
        background-color: whitesmoke;
        color: #020202;
        border-top-right-radius: 25px;
        border: 2px solid #020202;
        box-shadow: #010101 0px 10px 25px;
    }
</style>