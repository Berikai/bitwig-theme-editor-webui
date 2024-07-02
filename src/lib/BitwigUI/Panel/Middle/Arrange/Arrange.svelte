<script>
    import { ThemeStore } from "../../../../Scripts/Theme";
    
    import Instrument from "./Instrument.svelte";

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });

    let count = 66;
    let rows = Array.from({ length: count }, (_, i) => i);
</script>

<div style="--dark-timeline-background: {theme["arranger"]["Dark Timeline Background"]};--top-level-timeline-header-background: {theme["arranger"]["Top Level Timeline Header Background"]};--hole-dark: {theme["window"]["Hole (dark)"]}; --hole-light: {theme["window"]["Hole (light)"]}; --panel-body: {theme["window"]["Panel body"]}; --active-panel-stroke: {theme["window"]["Active Panel stroke"]};">
    <span class="arrange-row">
        <span class="channels hole-dark">
            <span class="upper-channels">
                <span class="channels-row hole-light" style="display:flex;justify-content:space-between;background-color:{theme["window"]["Hole (light)"]};">
                    <span style="display:flex;">
                        <span class="hole-medium" style="display:flex;justify-content:center;align-items:center;width:38px;height:100%;background-color:{theme["window"]["Hole (medium)"]};">
                            <svg width="19px" height="19px" fill={theme["window"]["On"]} style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                                <g>
                                    <rect x="4" y="6" width="3" height="3"/>
                                    <rect x="4" y="10" width="3" height="3"/>
                                    <rect x="8" y="6" width="3" height="3"/>
                                    <rect x="8" y="10" width="3" height="3"/>
                                    <rect x="12" y="6" width="3" height="3"/>
                                    <rect x="12" y="10" width="3" height="3"/>
                                </g>
                            </svg>
                        </span>
                        <span class="hole-medium" style="display:flex;justify-content:center;align-items:center;width:38px;height:100%;background-color:{theme["window"]["Hole (medium)"]};">
                            <svg x="0px" y="0px" width="19px" height="19px" fill={theme["window"]["On"]} >
                                <rect x="4" y="6" width="11" height="3"/>
                                <rect x="4" y="10" width="11" height="3"/>
                            </svg>
                        </span>
                    </span>
                    <span style="display:flex;">
                        <span class="panel-body" style="display:flex;justify-content:center;align-items:center;width:41px;height:37px;border-top:1px solid {theme["window"]["Button stroke"]};border-left:1px solid {theme["window"]["Button stroke"]};background-color:{theme["window"]["Panel body"]};">
                            <svg x="0px" y="0px" width="19px" height="19px" viewBox="0 0 19 19" fill="#ffffff">
                                <polygon points="12.772,14.632 11.317,11.176 14.373,10.703 7,3.5 7,13.808 9.474,11.952 10.93,15.408 " transform="matrix(1.2614421,0,0,1.2614421,-3.8300949,-2.4150474)" />
                            </svg>
                        </span>
                        <span class="panel-body" style="display:flex;justify-content:center;align-items:center;width:25px;height:37px;border-top:1px solid {theme["window"]["Hole (dark)"]};border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Panel body"]};">
                            <svg x="0px" y="0px" width="23px" height="19px" fill={theme["window"]["Normal Toggle Icon"]}>
                                <rect x="7" y="5" width="9" height="9"/>
                            </svg>
                        </span>
                        <span class="button-in-tree-background" style="display:flex;justify-content:flex-start;align-items:center;width:85px;height:37px;border-top:1px solid {theme["window"]["Hole (dark)"]};border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Button in tree background"]};">
                            <svg x="0px" y="0px" width="23px" height="19px" viewBox="0 0 23 19" fill={theme["window"]["Normal Toggle Icon"]}>
                                <polygon points="17,9.5 7,15 7,4 "/>
                            </svg>
                            <i>Scene 1</i>
                        </span>
                        <span class="button-in-tree-background" style="display:flex;justify-content:flex-start;align-items:center;width:84px;height:37px;border-top:1px solid {theme["window"]["Hole (dark)"]};border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Button in tree background"]};box-shadow: inset #202020 -10px 0px 12px -10px;">
                            <svg x="0px" y="0px" width="23px" height="19px" viewBox="0 0 23 19" fill={theme["window"]["Normal Toggle Icon"]}>
                                <polygon points="17,9.5 7,15 7,4 "/>
                            </svg>
                            <i>Scene 2</i>
                        </span>
                        <span class="button-in-tree-background" style="display:flex;justify-content:center;align-items:center;width:23px;height:37px;border-top:1px solid {theme["window"]["Hole (dark)"]};border-left:1px solid {theme["window"]["Hole (dark)"]};background-color:{theme["window"]["Button in tree background"]};">
                            <svg x="0px" y="0px" width="15px" height="15px" fill={"#696969"}>
                                <rect x="2" y="2" width="11" height="3"/>
                                <rect x="2" y="6" width="11" height="3"/>
                                <rect x="2" y="10" width="7" height="3"/>
                                <svg viewBox="0 0 15 15">
                                    <polygon points="15,12.5 10,15 10,10 "/>
                                </svg>
                            </svg>
                        </span>
                    </span>
                </span>
                <Instrument name="Inst 1" type="i" color="#FF5706" isSelected={true} isRec={true}/>
                <Instrument name="Audio 2" type="a" color="#D99D10"/>
                <span class="channels-row hole-dark" style="display:flex;justify-content:space-between;border-top:1px solid {theme["window"]["Hole (dark)"]};">
                    <svg width="13px" height="13px" viewBox="0 0 13 13" fill="#8f8f8f" style="margin-top: 4px;margin-left: 94px;fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
                        <path d="M5.5,2l0,3.5l-3.5,0l0,2l3.5,0l0,3.5l2,0l0,-3.5l3.5,0l0,-2l-3.5,0l0,-3.5l-2,0Z" style="fill-rule:nonzero;"/>
                    </svg>
                </span>
            </span>
            <span class="bottom-channels">
                <Instrument name="FX 1" type="f"/>
                <Instrument name="Master" type="m"/>
            </span>
        </span>
        <span style="display:flex;width:10px;height:100%;background-color:{theme["window"]["Hole (light)"]};"></span>
        <span class="arranger dark-timeline-background">
            <span class="top-level-timeline-header-background" style="display: flex;width:100%;height:39px;background-color:{theme["arranger"]["Top Level Timeline Header Background"]};"></span>
            <span style="display: flex;justify-content:space-between;flex-direction:column;height:calc(100% - 39px);">
                <span style="display: flex;flex-direction:column;">
                    <span class="light-timeline-background" style="display: flex;width:100%;height:43px;background-color:{theme["arranger"]["Light Timeline Background"]};border-bottom:1px solid #00000060;">
                        {#each rows as row}
                        <span style="height:100%;margin-left:16px;border-right:{row % 4 == 0 ? "1px solid #00000080" : "0.5px solid #00000040"};"></span>
                        {/each}
                    </span>
                    <span class="light-timeline-background" style="display: flex;width:100%;height:43px;background-color:{theme["arranger"]["Light Timeline Background"]};">
                        {#each rows as row}
                        <span style="height:100%;margin-left:16px;border-right:{row % 4 == 0 ? "1px solid #00000080" : "0.5px solid #00000040"};"></span>
                        {/each}
                    </span>
                </span>
                <span style="display:flex;height:100%">
                    {#each rows as row}
                    <span style="height:100%;margin-left:16px;border-right:{row % 4 == 0 ? "1px solid #00000080" : "0.5px solid #00000040"};"></span>
                    {/each}
                </span>
                <span style="display: flex;flex-direction:column;">
                    <span class="light-timeline-background" style="display: flex;width:100%;height:43px;background-color:{theme["arranger"]["Light Timeline Background"]};border-bottom:1px solid #00000060;">
                        {#each rows as row}
                        <span style="height:100%;margin-left:16px;border-right:{row % 4 == 0 ? "1px solid #00000080" : "0.5px solid #00000040"};"></span>
                        {/each}
                    </span>
                    <span class="light-timeline-background" style="display: flex;width:100%;height:43px;background-color:{theme["arranger"]["Light Timeline Background"]};">
                        {#each rows as row}
                        <span style="height:100%;margin-left:16px;border-right:{row % 4 == 0 ? "1px solid #00000080" : "0.5px solid #00000040"};"></span>
                        {/each}
                    </span>
                </span>
            </span>
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
    i {
        font-size: 11px;
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
</style>