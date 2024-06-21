<script>
    import { ThemeStore } from "../../../Theme";

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<div style="--hole-dark: {theme["window"]["Hole (dark)"]}; --panel-body: {theme["window"]["Panel body"]}; --hole-medium: {theme["window"]["Hole (medium)"]};">
    <span class="top-nav"></span>
    <span class="everything-bar">
        <i>Everything</i>
        <span class="search-bar"><i class="text">Search</i></span>
        <span class="locations">
            <span class="location-side">
                <i>Location</i>
                <i>Category</i>
                <i>Device</i>
            </span>
            <span class="location-side">
                <i>File Kind</i>
                <i>Creator</i>
                <i>Tags</i>
            </span>
        </span>
    </span>
    <span class="files"></span>
    <span class="bottom-bar"></span>
</div>

<style>
    div {
        --border-width: 2px;
        width: calc(222px - 2 * var(--border-width));
        height: calc(100% - 2 * var(--border-width));
        background-color: var(--hole-medium);
        border-radius: 3px;
        border: 2px solid var(--panel-body);
        overflow: hidden;
    }
    .text {
        margin-left: 20px;
    }
    .top-nav {
        display: flex;
        width: 100%;
        height: 40px;
        border-bottom: 2px solid var(--panel-body);
    }
    .everything-bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 11px;
        padding-top: 7px;
        width: 100%;
        height: 123px;
    }
    .search-bar {
        display: flex;
        align-items: center;
        font-size: 11px;
        margin-top: 6px;
        width: 204px;
        height: 21px;
        background-color: var(--hole-dark);
        border-radius: 3px;
    }
    .locations {
        display: flex;
        flex-direction: row;
        width: 200px;
        height: 70px;
        margin-top: 4px;
        color: whitesmoke;
    }
    .location-side {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100px;
        height: 70px;
        padding-left: 24px;
    }
    .files {
        display: flex;
        width: 100%;
        height: 413px;
        background-color: var(--hole-dark);
    }
    .bottom-bar {
        display: flex;
        width: 100%;
        height: 100%;
        box-shadow: #202020 0px 0px 10px;
    }
</style>