<script>
    import { tick } from "svelte";
    import Value from "./Value.svelte";
    import {
        activeKey,
        default_theme,
        modifiedCounts,
        targetVersion,
        ThemeStore,
    } from "../Scripts/Theme";
    import { BW5_TO_BW6 } from "../Scripts/BteFormat";
    import ThemeInfo from "../Scripts/ThemeInfo";
    import Contributors from "../Scripts/Contributors";
    import { selectedValue } from "../Scripts/BindValues";

    export let display = "flex";

    const categories = [
        { id: "window", label: "Window" },
        { id: "arranger", label: "Arranger" },
        { id: "advanced", label: "Advanced" },
        { id: "patched", label: "Devices" },
    ];

    let modalState = false;
    let searchValue = "";
    let showModifiedOnly = false;
    let listEl;

    $: currentCategory = $selectedValue || "window";
    $: query = searchValue.trim().toLowerCase();

    $: filteredKeys = (() => {
        const group = $ThemeStore[currentCategory] || {};
        return Object.keys(group).filter((key) => {
            if (showModifiedOnly) {
                const cur = (group[key] || "").toLowerCase();
                const def = (default_theme[currentCategory]?.[key] || "").toLowerCase();
                if (cur === def) return false;
            }
            if (!query) return true;
            const desc = (ThemeInfo[currentCategory]?.[key] || "").toLowerCase();
            const hex = (group[key] || "").toLowerCase();
            const alias = ($targetVersion === "bw6" ? BW5_TO_BW6[key] || "" : "").toLowerCase();
            return (
                key.toLowerCase().includes(query) ||
                desc.includes(query) ||
                hex.includes(query) ||
                alias.includes(query)
            );
        });
    })();

    // Scroll to activeKey when clicked from preview canvas or undo/redo
    $: if ($activeKey && listEl) {
        scrollActiveIntoView($activeKey);
    }

    async function scrollActiveIntoView(target) {
        if (!target) return;
        if ($selectedValue !== target.category) {
            selectedValue.set(target.category);
        }
        // Clear filters if the target key would be hidden
        if (searchValue) searchValue = "";
        if (showModifiedOnly) showModifiedOnly = false;
        await tick();
        const escaped =
            typeof CSS !== "undefined" && CSS.escape
                ? CSS.escape(target.key)
                : target.key.replace(/"/g, '\\"');
        const el = listEl?.querySelector(`[data-color-key="${escaped}"]`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    function handleWindowKeydown(e) {
        if (e.key === "Escape" && modalState) {
            modalState = false;
        }
    }
</script>

<svelte:window on:keydown={handleWindowKeydown} />

<aside style="--display-aside:{display};" class:modal-open={modalState}>
    <nav class="tabs" aria-label="Theme color categories">
        {#each categories as cat}
            <button
                type="button"
                class:active-tab={currentCategory === cat.id}
                style={currentCategory === cat.id
                    ? `border-bottom-color: ${$ThemeStore.window?.On || "var(--color-accent)"};`
                    : ""}
                on:click={() => selectedValue.set(cat.id)}
            >
                <span>{cat.label}</span>
                {#if $modifiedCounts[cat.id] > 0}
                    <span class="badge">{$modifiedCounts[cat.id]}</span>
                {/if}
            </button>
        {/each}
    </nav>

    <div class="toolbar">
        <div class="search-wrap">
            <input
                id="search_bar"
                type="text"
                placeholder="Filter colors, hex, or notes..."
                bind:value={searchValue}
                aria-label="Filter color values"
            />
            {#if searchValue}
                <button
                    type="button"
                    class="clear-btn"
                    aria-label="Clear search"
                    on:click={() => (searchValue = "")}
                >
                    ×
                </button>
            {/if}
        </div>
        <button
            type="button"
            class="filter-pill"
            class:active={showModifiedOnly}
            aria-pressed={showModifiedOnly}
            on:click={() => (showModifiedOnly = !showModifiedOnly)}
            title="Show only colors modified from default"
        >
            Modified ({$modifiedCounts.total})
        </button>
    </div>

    <div class="count-bar">
        <span>Showing {filteredKeys.length} of {Object.keys($ThemeStore[currentCategory] || {}).length}</span>
    </div>

    <section bind:this={listEl} class="values-list">
        {#if filteredKeys.length === 0}
            <div class="empty-state">
                <p>No matching color values.</p>
                {#if searchValue || showModifiedOnly}
                    <button
                        type="button"
                        class="reset-filter-btn"
                        on:click={() => {
                            searchValue = "";
                            showModifiedOnly = false;
                        }}
                    >
                        Clear filters
                    </button>
                {/if}
            </div>
        {:else}
            {#each filteredKeys as value (`${currentCategory}:${value}`)}
                <Value {value} selected={currentCategory} />
            {/each}
        {/if}
    </section>

    <nav class="footer-nav">
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/spreadsheets/d/1iDRYxo2RMPbe8ldjIJqW2GKF_mb1Ldy4Fg6RKudc5jI/edit?gid=1944421253#gid=1944421253"
        >
            Spreadsheet
        </a>
        <button type="button" on:click={() => (modalState = true)}>Credits</button>
    </nav>

    {#if modalState}
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="credits-title"
            on:click|self={() => (modalState = false)}
        >
            <div class="modal-box">
                <div class="modal-header">
                    <h1 id="credits-title">Credits</h1>
                    <button
                        type="button"
                        class="modal-close"
                        aria-label="Close credits"
                        on:click={() => (modalState = false)}
                    >
                        ×
                    </button>
                </div>
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
    {/if}
</aside>

<style>
    aside {
        display: var(--display-aside);
        flex-direction: column;
        height: 100%;
        width: 100%;
        background-color: var(--color-bg-secondary);
        z-index: 2;
        min-width: 0;
    }
    aside.modal-open {
        z-index: 10;
    }
    nav.tabs {
        display: flex;
        flex-direction: row;
        width: 100%;
        border-bottom: 1px solid var(--color-border);
        background-color: var(--color-bg-secondary);
    }
    nav.tabs button {
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        flex: 1;
        height: 42px;
        color: var(--color-text-secondary);
        background-color: transparent;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--transition-fast);
        border-bottom: 3px solid transparent;
        padding: 0 4px;
    }
    nav.tabs button:hover {
        background-color: var(--color-bg-tertiary);
        color: var(--color-text-primary);
    }
    nav.tabs button.active-tab {
        color: var(--color-text-primary);
    }
    .badge {
        background-color: rgba(255, 135, 19, 0.2);
        color: var(--color-accent);
        font-size: 10px;
        font-weight: 700;
        padding: 1px 5px;
        border-radius: 10px;
    }
    .toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        background-color: var(--color-bg-secondary);
        border-bottom: 1px solid var(--color-border);
    }
    .search-wrap {
        position: relative;
        flex: 1;
        display: flex;
        align-items: center;
    }
    .search-wrap input {
        width: 100%;
        height: 32px;
        padding: 0 26px 0 10px;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        color: var(--color-text-primary);
        background-color: var(--color-bg-primary);
        font-size: 12px;
    }
    .search-wrap input:focus {
        outline: none;
        border-color: var(--color-accent);
    }
    .clear-btn {
        position: absolute;
        right: 4px;
        background: transparent;
        border: none;
        color: var(--color-text-secondary);
        font-size: 16px;
        cursor: pointer;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }
    .clear-btn:hover {
        color: var(--color-text-primary);
    }
    .filter-pill {
        height: 32px;
        padding: 0 10px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-border);
        background-color: var(--color-bg-primary);
        color: var(--color-text-secondary);
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        transition: all var(--transition-fast);
    }
    .filter-pill:hover {
        color: var(--color-text-primary);
        border-color: var(--color-text-secondary);
    }
    .filter-pill.active {
        background-color: rgba(255, 135, 19, 0.16);
        border-color: var(--color-accent);
        color: var(--color-accent);
    }
    .count-bar {
        padding: 4px 12px;
        font-size: 11px;
        color: var(--color-text-secondary);
        background-color: var(--color-bg-tertiary);
        border-bottom: 1px solid var(--color-border);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        font-weight: 600;
    }
    section.values-list {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: var(--color-bg-primary);
    }
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 32px 16px;
        text-align: center;
        color: var(--color-text-secondary);
        gap: 10px;
        font-size: 13px;
    }
    .reset-filter-btn {
        background-color: var(--color-bg-tertiary);
        color: var(--color-text-primary);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        padding: 6px 12px;
        font-size: 12px;
        cursor: pointer;
    }
    .reset-filter-btn:hover {
        border-color: var(--color-accent);
    }
    nav.footer-nav {
        display: flex;
        flex-direction: row;
        width: 100%;
        border-top: 1px solid var(--color-border);
        background-color: var(--color-bg-secondary);
    }
    nav.footer-nav a,
    nav.footer-nav button {
        border: none;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 40px;
        background-color: transparent;
        font-size: 13px;
        font-weight: 600;
        color: var(--color-text-secondary);
        cursor: pointer;
        transition: all var(--transition-fast);
    }
    nav.footer-nav a:hover,
    nav.footer-nav button:hover {
        background-color: var(--color-bg-tertiary);
        color: var(--color-text-primary);
    }
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(4px);
        z-index: 100;
    }
    .modal-box {
        width: min(460px, 92vw);
        max-height: 80vh;
        padding: var(--spacing-lg);
        background-color: var(--color-bg-secondary);
        color: var(--color-text-primary);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        overflow-y: auto;
    }
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--color-border);
        padding-bottom: var(--spacing-sm);
    }
    .modal-header h1 {
        font-size: 18px;
        margin: 0;
        font-family: var(--font-display);
    }
    .modal-close {
        background: transparent;
        border: none;
        color: var(--color-text-secondary);
        font-size: 22px;
        cursor: pointer;
        line-height: 1;
        padding: 2px 6px;
    }
    .modal-close:hover {
        color: var(--color-text-primary);
    }
    .modal-box p {
        margin: 0;
        line-height: 1.45;
        font-size: 13px;
        color: var(--color-text-secondary);
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
        font-size: 13px;
        color: var(--color-text-primary);
    }
</style>
