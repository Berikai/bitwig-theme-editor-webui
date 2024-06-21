<script>
    import Value from "./Value.svelte";
    import { ThemeStore } from "../Theme";
    import Contributors from "../Contributors";

    let theme;

    ThemeStore.subscribe((value) => {
        theme = value;
    });

    let selected = "window";

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

        for (let i = allElementsArray.length-1; i > 0; i--) {
            const element = allElementsArray[i];

            if(searchValue == "" && element.tagName == "DIV") {
                // @ts-ignore
                element.style.backgroundColor = 'whitesmoke';
                continue;
            }
            
            if (element.textContent.includes(searchValue) && element.tagName == "DIV") {
                // @ts-ignore
                element.style.backgroundColor = 'yellow';
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (element.tagName == "DIV") {
                // @ts-ignore
                element.style.backgroundColor = 'whitesmoke';
            }
        }
    }

    $: search(searchValue, selected);

</script>

<aside>
    <nav>
        <button on:click={() => selected = "window"} style={selected == "window" ? `border-bottom: 3px solid ${theme["window"]["On"]};` : ""}>Window</button>
        <button on:click={() => selected = "arranger"} style={selected == "arranger" ? `border-bottom: 3px solid ${theme["window"]["On"]};` : ""}>Arranger</button>
    </nav>
    <span>Values</span>
    <input type="text" placeholder="Search color values" bind:value={searchValue} />
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
    input {
        height: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 10px;
        padding-right: 10px;
        border: none;
        background-color: #6f6f6f;
        font-weight: 700;
    }
    input:focus {
        outline: none;
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
    a {
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
        text-decoration: none;
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
        --sidebar-width: 350px;
        position: relative;
        top: calc(100vh - var(--modal-box-height) - var(--topbar-height) - 4*20px);
        left: calc(var(--sidebar-width) + 60px);
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