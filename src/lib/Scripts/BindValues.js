import { scrollToValue } from "./ScrollToValue";
import { hoveredPreviewKey } from "./Theme";
import { writable } from "svelte/store";

export const selectedValue = writable("window");

function bindElement(element, category, key, cleanups) {
    if (!element) return;

    const onMouseDown = (e) => {
        selectedValue.set(category);
        scrollToValue(e, key, category);
    };

    const onMouseMove = (e) => {
        e.stopPropagation();
        hoveredPreviewKey.set({
            category,
            key,
            x: e.clientX,
            y: e.clientY,
        });
    };

    const onMouseLeave = () => {
        hoveredPreviewKey.update((cur) => (cur && cur.key === key ? null : cur));
    };

    element.addEventListener("mousedown", onMouseDown);
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseleave", onMouseLeave);

    cleanups.push(() => {
        element.removeEventListener("mousedown", onMouseDown);
        element.removeEventListener("mousemove", onMouseMove);
        element.removeEventListener("mouseleave", onMouseLeave);
    });
}

function bindByClass(className, category, key, cleanups) {
    Array.from(document.getElementsByClassName(className)).forEach((el) => {
        bindElement(el, category, key, cleanups);
    });
}

function bindById(id, category, key, cleanups) {
    bindElement(document.getElementById(id), category, key, cleanups);
}

export const bindValues = () => {
    const cleanups = [];

    // WindowBar
    bindByClass("panel-body", "window", "Panel body", cleanups);
    Array.from(document.getElementsByClassName("button-background")).forEach((element) => {
        if (element.id === "rec") {
            bindElement(element, "window", "Record button color", cleanups);
        } else if (element.id === "play") {
            bindElement(element, "window", "On", cleanups);
        } else {
            bindElement(element, "window", "Button background", cleanups);
        }
    });
    bindByClass("hitech-group", "window", "Hitech on", cleanups);

    // TopBar & BottomBar
    bindById("top_bar", "window", "Window background", cleanups);
    bindById("bottom_bar", "window", "Window background", cleanups);

    // Right (Browser)
    bindById("browser-panel", "window", "Hole (medium)", cleanups);
    bindByClass("hole-dark", "window", "Hole (dark)", cleanups);

    // Device
    bindById("device-bg", "window", "Hole (dark)", cleanups);
    bindByClass("column", "window", "Device Header", cleanups);

    // Inspector
    bindById("insp_title", "window", "Panel body", cleanups);
    bindById("cpu_svg", "window", "On", cleanups);
    bindByClass("display-background", "window", "Display Background", cleanups);
    bindByClass("hole-light", "window", "Hole (light)", cleanups);
    bindByClass("hole-medium", "window", "Hole (medium)", cleanups);
    bindByClass("on", "window", "On", cleanups);
    bindByClass("rec", "window", "Record button color", cleanups);

    // Arranger
    bindByClass("dark-timeline-header-background", "arranger", "Dark Timeline Header Background", cleanups);
    bindByClass("light-timeline-header-background", "arranger", "Light Timeline Header Background", cleanups);
    bindByClass("light-timeline-background", "arranger", "Light Timeline Background", cleanups);
    bindByClass("dark-timeline-background", "arranger", "Dark Timeline Background", cleanups);
    bindByClass("irrelevant-timeline-background", "arranger", "Irrelevant Timeline Background", cleanups);
    bindByClass("button-in-tree-background", "window", "Button in tree background", cleanups);

    // Instruments
    bindByClass("selected-inst", "window", "Selected Panel body", cleanups);
    bindByClass("unselected-inst", "window", "Panel body", cleanups);

    // Text & Icons
    bindByClass("light-text", "window", "Light Text", cleanups);
    bindByClass("dark-text", "window", "Dark Text", cleanups);
    bindByClass("normal-toggle-icon", "window", "Normal Toggle Icon", cleanups);

    return () => {
        cleanups.forEach((fn) => fn());
    };
};
