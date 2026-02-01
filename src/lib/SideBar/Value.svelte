<script>
    export let value;
    export let selected;

    import { ThemeStore } from "../Scripts/Theme";
    import ThemeInfo from "../Scripts/ThemeInfo";
    import ColorPicker from "./ColorPicker.svelte";

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });

    const getThemeInfo = () => {
        let theme_info;
        try {
            theme_info = ThemeInfo[selected][value];
        } catch (e) {
            theme_info = "";
        }
        return theme_info;
    };
</script>

<div>
    <section>
        <span id={value}>{value}</span>
        <span class="info">{getThemeInfo()}</span>
    </section>
    <code style={`background-color: ${theme[selected][value]};`} hidden></code>
    <i><ColorPicker {value} {selected} /></i>
</div>

<style>
    div {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        min-height: 48px;
        color: var(--color-text-primary);
        background-color: var(--color-bg-secondary);
        border-bottom: 1px solid var(--color-border);
        padding: var(--spacing-sm) var(--spacing-md);
        transition: background-color var(--transition-fast);
    }
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        gap: 2px;
    }
    div:hover {
        cursor: pointer;
        background-color: var(--color-bg-tertiary);
    }
    span {
        font-size: 14px;
        font-weight: 500;
    }
    span.info {
        font-size: 12px;
        color: var(--color-text-secondary);
    }
    code {
        margin-right: 30px;
        width: 20px;
        height: 20px;
        border: 1px solid var(--color-border);
        border-radius: 50%;
    }
    i {
        margin-right: 10px;
    }
</style>
