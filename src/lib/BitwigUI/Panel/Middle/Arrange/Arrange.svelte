<script>
    import { ThemeStore } from "../../../../Theme";
    
    import Instrument from "./Instrument.svelte";

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<div style="--dark-timeline-background: {theme["arranger"]["Dark Timeline Background"]};--top-level-timeline-header-background: {theme["arranger"]["Top Level Timeline Header Background"]};--hole-dark: {theme["window"]["Hole (dark)"]}; --hole-light: {theme["window"]["Hole (light)"]}; --panel-body: {theme["window"]["Panel body"]}; --active-panel-stroke: {theme["window"]["Active Panel stroke"]};">
    <span class="arrange-row">
        <span class="channels">
            <span class="upper-channels">
                <span class="channels-row" style="display:flex;justify-content:space-between;background-color:{theme["window"]["Hole (light)"]};">
                    <span style="display:flex;">
                        <span style="display:flex;justify-content:center;align-items:center;width:38px;height:100%;background-color:{theme["window"]["Hole (medium)"]};">a</span>
                        <span style="display:flex;justify-content:center;align-items:center;width:38px;height:100%;background-color:{theme["window"]["Hole (medium)"]};">a</span>
                    </span>
                    <span style="display:flex;">
                        <span style="display:flex;justify-content:center;align-items:center;width:41px;height:37px;border-top:1px solid {theme["window"]["Button stroke"]};border-left:1px solid {theme["window"]["Button stroke"]};background-color:{theme["window"]["Panel body"]};">b</span>
                        <span style="display:flex;justify-content:center;align-items:center;width:25px;height:37px;border-top:1px solid {theme["window"]["Hole (dark)"]};border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Panel body"]};">c</span>
                        <span style="display:flex;justify-content:center;align-items:center;width:85px;height:37px;border-top:1px solid {theme["window"]["Hole (dark)"]};border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Button in tree background"]};">d</span>
                        <span style="display:flex;justify-content:center;align-items:center;width:84px;height:37px;border-top:1px solid {theme["window"]["Hole (dark)"]};border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Button in tree background"]};box-shadow: inset #202020 -10px 0px 12px -10px;">d</span>
                        <span style="display:flex;justify-content:center;align-items:center;width:23px;height:37px;border-top:1px solid {theme["window"]["Hole (dark)"]};border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Button in tree background"]};">e</span>
                    </span>
                </span>
                <Instrument type="instrument" isSelected={true}/>
                <Instrument type="instrument"/>
                <span class="channels-row" style="display:flex;justify-content:space-between;border-top:1px solid {theme["window"]["Hole (dark)"]};">
                    <svg width="13px" height="13px" viewBox="0 0 13 13" fill="#8f8f8f" style="margin-top: 4px;margin-left: 94px;fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
                        <path d="M5.5,2l0,3.5l-3.5,0l0,2l3.5,0l0,3.5l2,0l0,-3.5l3.5,0l0,-2l-3.5,0l0,-3.5l-2,0Z" style="fill-rule:nonzero;"/>
                    </svg>
                </span>
            </span>
            <span class="bottom-channels">
                <Instrument type="instrument"/>
                <Instrument type="instrument"/>
            </span>
        </span>
        <span style="display:flex;width:10px;height:100%;background-color:{theme["window"]["Hole (light)"]};"></span>
        <span class="arranger">
            <span style="display: flex;width:100%;height:39px;background-color:{theme["arranger"]["Top Level Timeline Header Background"]};"></span>
        </span>
    </span>
    <span class="bottom-bar"></span>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 401px;
        border-radius: 3px;
        border: 2px solid var(--active-panel-stroke);
        background-color: #2f2f2f; /* DEVELOPMENT */
        overflow: hidden;

        opacity: 1; /*Development only, set to 1 in production */
    }
    .arrange-row {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }
    .arranger {
        background-color: var(--dark-timeline-background);
        width: 100%;
        height: calc(100% - 1px);
        border-left: 1px solid var(--top-level-timeline-header-background);
        border-bottom: 1px solid var(--top-level-timeline-header-background);
    }
    .channels {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 427px;
        height: 377px;
        border-right: 1px solid var(--hole-dark);
        border-bottom: 1px solid var(--hole-dark);
        background-color: var(--hole-dark);
    }
    .channels-row {
        display: flex;
        flex-direction: row;
    }
    .bottom-bar {
        width: 100%;
        height: 25px;
        background-color: var(--hole-light);
    }
    .instrument {
        display:flex;
        justify-content:center;
        align-items:center;
        width:199px;
        height:43px;
        background-color:red;
    }
</style>