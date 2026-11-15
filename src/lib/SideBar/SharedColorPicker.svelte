<script context="module">
    import { writable } from "svelte/store";

    export const pickerTarget = writable(null);

    export function openColorPicker(category, key, anchorEl) {
        if (!anchorEl) return;
        const rect = anchorEl.getBoundingClientRect();
        pickerTarget.set({ category, key, rect });
    }
</script>

<script>
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import Pickr from "@simonwep/pickr";
    import "@simonwep/pickr/dist/themes/monolith.min.css";
    import { default_theme, resetColorValue, setColorValue, ThemeStore } from "../Scripts/Theme";

    let anchorEl;
    let pickr = null;
    let currentTarget = null;
    let isSyncing = false;

    $: if (pickr && $pickerTarget) {
        currentTarget = $pickerTarget;
        const { rect, category, key } = currentTarget;
        if (anchorEl && rect) {
            anchorEl.style.left = `${rect.left}px`;
            anchorEl.style.top = `${rect.top}px`;
            anchorEl.style.width = `${rect.width}px`;
            anchorEl.style.height = `${rect.height}px`;
        }
        const currentTheme = get(ThemeStore);
        const colorVal = currentTheme?.[category]?.[key] || "#000000";
        isSyncing = true;
        pickr.setColor(colorVal, true);
        isSyncing = false;
        pickr.show();
    }

    onMount(() => {
        // @ts-ignore
        Pickr.I18N_DEFAULTS["btn:cancel"] = "Reset";

        pickr = Pickr.create({
            el: anchorEl,
            useAsButton: true,
            theme: "monolith",
            default: "#000000",
            components: {
                preview: true,
                opacity: true,
                hue: true,
                interaction: {
                    hex: false,
                    rgba: false,
                    hsla: false,
                    input: true,
                    save: false,
                    cancel: true,
                },
            },
        });

        pickr.on("change", (color) => {
            if (isSyncing || !currentTarget) return;
            const hex = color.toHEXA().toString().toLowerCase();
            setColorValue(currentTarget.category, currentTarget.key, hex, true);
        });

        pickr.on("cancel", () => {
            if (!currentTarget) return;
            const def = default_theme[currentTarget.category]?.[currentTarget.key];
            if (def) {
                isSyncing = true;
                pickr.setColor(def, true);
                isSyncing = false;
                resetColorValue(currentTarget.category, currentTarget.key);
            }
        });

        pickr.on("hide", () => {
            pickerTarget.set(null);
        });

        return () => {
            pickr?.destroyAndRemove();
        };
    });
</script>

<div bind:this={anchorEl} class="shared-picker-anchor" aria-hidden="true"></div>

<style>
    .shared-picker-anchor {
        position: fixed;
        pointer-events: none;
        opacity: 0;
        z-index: 1000;
    }
</style>
