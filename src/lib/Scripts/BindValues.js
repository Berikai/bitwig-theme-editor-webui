import { scrollToValue } from "./ScrollToValue";
import { writable } from "svelte/store";

export const selectedValue = writable("window");

const bindWindowBar = () => {
    Array.from(document.getElementsByClassName("panel-body")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Panel body")
        });
    });
    
    Array.from(document.getElementsByClassName("button-background")).forEach((element) => {
        if (element.id == "rec") {
            element.addEventListener("mousedown", (e) => {
                selectedValue.set("window")
                scrollToValue(e, "Record button color")
            });
            return;
        }

        if (element.id == "play") {
            element.addEventListener("mousedown", (e) => {
                selectedValue.set("window")
                scrollToValue(e, "On")
            });
            return;
        }
    
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Button background")
        });
    });

    Array.from(document.getElementsByClassName("hitech-group")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Hitech on")
        });
    });
}

const bindTopBar = () => {
    document.getElementById("top_bar").addEventListener("mousedown", (e) => {
        selectedValue.set("window")
        scrollToValue(e, "Window background")
    });
}

const bindRight = () => {
    document.getElementById("browser-panel").addEventListener("mousedown", (e) => {
        selectedValue.set("window")
        scrollToValue(e, "Hole (medium)")
    });

    Array.from(document.getElementsByClassName("hole-dark")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Hole (dark)")
        });
    });
}

const bindDevice = () => {
    document.getElementById("device-bg").addEventListener("mousedown", (e) => {
        selectedValue.set("window")
        scrollToValue(e, "Hole (dark)")
    });

    Array.from(document.getElementsByClassName("column")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Device Header")
        });
    });
}

const bindInspector = () => {
    document.getElementById("insp_title").addEventListener("mousedown", (e) => {
        selectedValue.set("window")
        scrollToValue(e, "Panel body")
    });

    document.getElementById("cpu_svg").addEventListener("mousedown", (e) => {
        selectedValue.set("window")
        scrollToValue(e, "On")
    });

    Array.from(document.getElementsByClassName("display-background")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Display Background")
        });
    });

    Array.from(document.getElementsByClassName("hole-light")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Hole (light)")
        });
    });

    Array.from(document.getElementsByClassName("hole-medium")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Hole (medium)")
        });
    });

    Array.from(document.getElementsByClassName("on")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "On")
        });
    });

    Array.from(document.getElementsByClassName("rec")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Record button color")
        });
    });
}

const bindBottomBar = () => {
    document.getElementById("bottom_bar").addEventListener("mousedown", (e) => {
        selectedValue.set("window")
        scrollToValue(e, "Window background")
    });
}

const bindArranger = () => {
    Array.from(document.getElementsByClassName("top-level-timeline-header-background")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("arranger")
            scrollToValue(e, "Top Level Timeline Header Background")
        });
    });

    Array.from(document.getElementsByClassName("light-timeline-background")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("arranger")
            scrollToValue(e, "Light Timeline Background")
        });
    });

    Array.from(document.getElementsByClassName("dark-timeline-background")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("arranger")
            scrollToValue(e, "Dark Timeline Background")
        });
    });

    Array.from(document.getElementsByClassName("button-in-tree-background")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Button in tree background")
        });
    });
}

const bindInstruments = () => {
    Array.from(document.getElementsByClassName("selected-inst")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Selected Panel body")
        });
    });

    Array.from(document.getElementsByClassName("unselected-inst")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Panel body")
        });
    });
}

const bindTexts = () => {
    Array.from(document.getElementsByClassName("light-text")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Light Text")
        });
    });

    Array.from(document.getElementsByClassName("dark-text")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Dark Text")
        });
    });

    Array.from(document.getElementsByClassName("normal-toggle-icon")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            selectedValue.set("window")
            scrollToValue(e, "Normal Toggle Icon")
        });
    });
}

export const bindValues = () => {
    bindWindowBar();
    bindTopBar();
    bindRight();
    bindDevice();
    bindInspector();
    bindBottomBar();
    bindArranger();
    bindInstruments();
    bindTexts();
}