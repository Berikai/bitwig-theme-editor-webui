import { scrollToValue } from "./ScrollToValue";

const bindWindowBar = () => {
    Array.from(document.getElementsByClassName("panel-body")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            scrollToValue(e, "Panel body")
        });
    });
    
    Array.from(document.getElementsByClassName("button-background")).forEach((element) => {
        if (element.id == "rec") {
            element.addEventListener("mousedown", (e) => {
                scrollToValue(e, "Record button color")
            });
            return;
        }

        if (element.id == "play") {
            element.addEventListener("mousedown", (e) => {
                scrollToValue(e, "On")
            });
            return;
        }

        element.addEventListener("mousedown", (e) => {
            scrollToValue(e, "Button background")
        });
    });

    Array.from(document.getElementsByClassName("hitech-group")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            scrollToValue(e, "Hitech on")
        });
    });
}

const bindTopBar = () => {
    document.getElementById("top_bar").addEventListener("mousedown", (e) => {
        scrollToValue(e, "Window background")
    });
}

const bindRight = () => {
    document.getElementById("browser-panel").addEventListener("mousedown", (e) => {
        scrollToValue(e, "Hole (medium)")
    });

    Array.from(document.getElementsByClassName("hole-dark")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            scrollToValue(e, "Hole (dark)")
        });
    });
}

const bindDevice = () => {
    document.getElementById("device-bg").addEventListener("mousedown", (e) => {
        scrollToValue(e, "Hole (dark)")
    });

    Array.from(document.getElementsByClassName("column")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            scrollToValue(e, "Device Header")
        });
    });
}

const bindInspector = () => {
    document.getElementById("insp_title").addEventListener("mousedown", (e) => {
        scrollToValue(e, "Panel body")
    });

    document.getElementById("cpu_svg").addEventListener("mousedown", (e) => {
        scrollToValue(e, "On")
    });

    Array.from(document.getElementsByClassName("display-background")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            scrollToValue(e, "Display Background")
        });
    });

    Array.from(document.getElementsByClassName("hole-light")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            scrollToValue(e, "Hole (light)")
        });
    });

    Array.from(document.getElementsByClassName("hole-medium")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            scrollToValue(e, "Hole (medium)")
        });
    });

    Array.from(document.getElementsByClassName("on")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            scrollToValue(e, "On")
        });
    });

    Array.from(document.getElementsByClassName("button-background")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            scrollToValue(e, "Button background")
        });
    });

    Array.from(document.getElementsByClassName("rec")).forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            scrollToValue(e, "Record button color")
        });
    });
}

const bindBottomBar = () => {
    document.getElementById("bottom_bar").addEventListener("mousedown", (e) => {
        scrollToValue(e, "Window background")
    });
}

export const bindValues = () => {
    bindWindowBar();
    bindTopBar();
    bindRight();
    bindDevice();
    bindInspector();
    bindBottomBar();
}