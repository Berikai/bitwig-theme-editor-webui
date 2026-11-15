import { derived, get, writable } from 'svelte/store';

export const default_theme = {
    "advanced": {
        "Timeline Playhead": "#000000ff"
    },
    "patched": {
        "Note FX Chain 1": "#808080",
        "Note FX Chain 2": "#406a80",
        "Note FX Chain 3": "#40804a",
        "Note FX Chain 4": "#808040",
        "Note FX Chain 5": "#80404a",
        "Note FX Chain 6": "#6a4080",
        "Note FX Chain 7": "#406080",
        "Note FX Chain 8": "#408055",
        "Piano Roll Black Key": "#1a1a1a",
        "Piano Roll White Key": "#b3b3b3",
        "EQ Band 1": "#6a0f0f",
        "EQ Band 2": "#a51818",
        "EQ Band 3": "#e23b22",
        "EQ Band 4": "#c9ff26",
        "EQ Band 5": "#26ff84",
        "EQ Band 6": "#a4c3ff",
        "EQ Band 7": "#b7b7b7",
        "EQ Band 8": "#808080",
        "EQ Curve Line": "#ffffff",
        "Sampler White Key (Active)": "#b3b3b3",
        "Sampler White Key (Inactive)": "#808080",
        "Sampler White Key (Pressed)": "#ccffcc",
        "Sampler Black Key (Active)": "#1a1a1a",
        "Sampler Black Key (Inactive)": "#4d4d4d",
        "Sampler Black Key (Pressed)": "#8cb38c",
        "Sampler Octave Text": "#1a1a1a",
        "Dynamics Background": "#333333",
        "Deactivated Overlay": "#26262680"
    },
    "window": {
        "Abstract Button Pressed Background": "#3b3b3b",
        "Abstract Button Selected Background": "#474747",
        "Abstract Button Stroke": "#323232",
        "Abstract Button Unselected Background": "#545454",
        "Activation Green": "#29e17c",
        "Activation Red": "#ff4021",
        "Activation Yellow": "#e3d538",
        "Active Inverted Toggle Icon (Playing)": "#dedede",
        "Active Panel stroke": "#787878",
        "Active Toggle Icon (Playing)": "#dedede",
        "Analyzed Beat Color": "#3cb2e9",
        "Audio Event Boundary": "#0000007b",
        "Automation Color": "#8fa4ff",
        "Beat Marker Color": "#e36315",
        "Bitwig 16-Track": "#0076c7",
        "Bitwig 8-Track": "#29ccb9",
        "Bitwig CI": "#ff5a00",
        "Bitwig Essentials": "#2e9ce6",
        "Bitwig Mint": "#04a1a8",
        "Bitwig Producer": "#ffc933",
        "Bitwig Red": "#e41f38",
        "Button background": "#76767680",
        "Button in tree background": "#505050",
        "Button stroke": "#323232",
        "Checkbox background": "#62626280",
        "Close button mouse over background": "#0000005a",
        "Close button pressed background": "#000000a6",
        "Comp fill": "#005eb478",
        "Content Background": "#e2e2e2",
        "Dark Panel Sub-frame Fill": "#434343",
        "Dark Panel Sub-frame Stroke": "#383838",
        "Dark Separator Line": "#989898",
        "Dark Text": "#141414",
        "Dark tree background (selected)": "#387097",
        "Dark tree background (standby selected)": "#2c3b45",
        "Dark tree hover background change": "#ffffff0a",
        "Dark tree separator": "#565656",
        "Dark tree text": "#ffffff",
        "Dark tree text (selected)": "#ffffff",
        "Default text": "#000000",
        "Device Header": "#3c3c3c",
        "Device Header (selected)": "#646464",
        "Device Locked Overlay": "#0e5ca180",
        "Device Tint Future": "#58859564",
        "Device Tint Military": "#305d0247",
        "Device Tint Retro": "#c07b4c52",
        "Display Background": "#1d1d1d",
        "Display Background (error)": "#521226",
        "Display Loop Markers": "#00ffbe",
        "Display Start/End Markers": "#d8d900",
        "Display Waveform": "#ffffff",
        "Drop Indicator": "#ffffff",
        "Emboss Highlight": "#ffffff19",
        "Emboss Shadow": "#0000003c",
        "Error Text": "#ff3232c8",
        "Field background": "#d1d1d1",
        "Grey Display Background": "#1d1d1d64",
        "Grid Line (Primary)": "#ffffffa0",
        "Grid Line (Secondary)": "#ffffff50",
        "Hitcount background": "#8181817f",
        "Hitcount text color": "#ffffff7f",
        "Hitech background": "#2b3236",
        "Hitech on": "#3ebaff",
        "Hole (dark)": "#0d0d0d",
        "Hole (light)": "#414141",
        "Hole (medium)": "#2e2e2e",
        "Implicit On (subtle)": "#e47611",
        "Inspector Section Frame": "#424242",
        "Inverted Selected Borderless Button background": "#767676",
        "Knob Body Darkest": "#1e1e1e",
        "Knob Body Lighter": "#969696",
        "Knob Body Lightest": "#c4c4c4",
        "Knob Emboss Highlight": "#ffffff00",
        "Knob Emboss Shadow": "#00000000",
        "Knob Line": "#f2f2f2",
        "Knob Line Dark": "#0a0a0a",
        "Knob Stroke": "#282828",
        "Knob Value Color": "#ff7d0f",
        "Launcher Mapping Indication": "#6c6c6c",
        "Led Off": "#545454",
        "Led On": "#ff0000",
        "Light Separator Line": "#aaaaaa",
        "Light Text": "#ffffff",
        "Light Tooltip Background": "#d7d7d7",
        "Lighter Text": "#ffffff",
        "Link Text": "#e41f38ff",
        "List Item Background": "#d1d1d1",
        "List Separator": "#9c9c9c",
        "Mapping": "#3effba",
        "Mapping indication 1": "#f41b3e",
        "Mapping indication 2": "#ff7f17",
        "Mapping indication 3": "#fceb23",
        "Mapping indication 4": "#5bc515",
        "Mapping indication 5": "#65ce92",
        "Mapping indication 6": "#5ca8ee",
        "Mapping indication 7": "#c36eff",
        "Mapping indication 8": "#ff54b0",
        "Medium Light Text": "#ffffffb4",
        "Menu Icon": "#c3c3c3",
        "Menu background": "#353535",
        "Menu description text": "#8c8c8c",
        "Menu separator": "#8c8c8c",
        "Menu stroke": "#272727",
        "Menu text": "#ffffff",
        "Meter Clipping": "#ff0000",
        "Meter Gain Reduction": "#5386b6",
        "Meter Hitech": "#23d1d4",
        "Meter Hitech Background": "#23343e",
        "Meter Muted": "#979797",
        "Meter Normal": "#8ccb2a",
        "Meter Red": "#ff8b00",
        "Meter Yellow": "#ffde42",
        "Modern Dark Scrollbar Handle (active)": "#000000ff",
        "Modern Dark Scrollbar Handle (inactive)": "#000000aa",
        "Modern Scrollbar Background (active)": "#78787834",
        "Modern Scrollbar Handle (active)": "#787878ff",
        "Modern Scrollbar Handle (inactive)": "#82828264",
        "Modulation Mapping Background (polyphonic)": "#3aff9e32",
        "Modulation Mapping Background Color": "#3dd9ff32",
        "Modulation Mapping Color": "#3dd9ff",
        "Modulation Mapping Color (polyphonic)": "#3aff9e",
        "Modulation Mapping Color (subtractive)": "#5a8291",
        "Monitoring buttons color": "#cfc500",
        "Mouse Over Inverted Toggle Icon": "#000000a0",
        "Mouse Over Toggle Icon": "#bababa",
        "Normal Inverted Toggle Icon": "#00000050",
        "Normal Toggle Icon": "#9e9e9e",
        "Notification Background": "#d1d1d1",
        "Notification Error": "#e5102b",
        "Notification Normal": "#00888c",
        "Number field bar background": "#e57e0e",
        "On": "#ff8713",
        "On (subtle)": "#f07f1180",
        "On (subtler)": "#f07f1140",
        "Onset Marker Color": "#4c70c0",
        "Panel Blue": "#5ca8ee",
        "Panel Green": "#4abc00",
        "Panel Lime": "#bbdd21",
        "Panel Mint": "#26d098",
        "Panel Orange": "#ff7f17",
        "Panel Purple": "#c36eff",
        "Panel Red": "#ff1c40",
        "Panel Turquoise": "#1be3e5",
        "Panel Yellow": "#ffde42",
        "Panel body": "#535353",
        "Panel stroke": "#535353",
        "Popup Notification Background": "#000000b4",
        "Popup insert": "#747474",
        "Popup overlay background color": "#171717b4",
        "Pressed Inverted Toggle Icon": "#000000",
        "Pressed On": "#ca6a10",
        "Pressed Toggle Icon": "#858585",
        "Pressed button background": "#62626280",
        "Pressed view button background": "#373737",
        "Progress background": "#39495ebb",
        "Progress bar": "#5cbcff",
        "Record button color": "#ec0808",
        "Rubber button stroke": "#7a7a7a",
        "Rubber highlight button stroke": "#ff8d0050",
        "Scrollbar": "#787878",
        "Scrollbar background": "#2e2e2e00",
        "Selected Dashboard Tree": "#383838",
        "Selected Panel body": "#9c9c9c",
        "Selected Panel stroke": "#a1a1a1",
        "Selected Panel stroke (standby)": "#818181",
        "Selection": "#ffffff",
        "Shadow": "#0000004d",
        "Standby selection": "#e5e5e5",
        "Subtle Dark Text": "#444444",
        "Subtle Light Text": "#ffffff78",
        "Subtler Light Text": "#ffffff3c",
        "The Grid (background)": "#0d0d0d",
        "The Grid (stroke)": "#181818",
        "Timeline edit tool chooser background": "#323232",
        "Tooltip Background": "#3c3c3c",
        "Tooltip Stroke": "#a4a4a4",
        "Tree Item Background": "#d1d1d1",
        "Tree Separator": "#00000000",
        "User Automation Override Color": "#27d927",
        "View button background": "#2e2e2e00",
        "Warning": "#ed1b1b",
        "Window background": "#2e2e2e"
    },
    "arranger": {
        "Add Modulation Button Color": "#bb33b1",
        "Audio connection in modular environment": "#c14524",
        "Audio64 connection in modular environment": "#d281f4",
        "Automation button glow color": "#93ff9240",
        "Background color of the modular environment.": "#000000",
        "Clip Automation Button Color": "#d93232",
        "Clip Automation Color": "#8d0a0a",
        "Clip Modulation Color": "#881390",
        "Compressed Audio Port in modular environment": "#ff8000",
        "Current Atom Value Color": "#005270",
        "Dark Timeline Background": "#797979",
        "Dark Timeline Header Background": "#323232",
        "Event connection in modular environment": "#3c7399",
        "Header Loop Region Background": "#00000032",
        "Header Time Selection Across All Lanes Fill": "#7e9898c8",
        "Header Time Selection Across All Lanes Stroke": "#dedede",
        "Header Time Selection Cursor Stroke": "#dedede",
        "Header Time Selection Fill": "#a7939dc8",
        "Header Time Selection Standby Cursor Stroke": "#b0b0b0",
        "Header Time Selection Standby Fill": "#ffffff06",
        "Header Time Selection Standby Stroke": "#a7a7a7",
        "Header Time Selection Stroke": "#f7f7f7",
        "Insert preview time": "#d2d2d2d2",
        "Irrelevant Timeline Background": "#858585",
        "Irrelevant Timeline Header Background": "#323232",
        "Irrelevant Timeline Header Overlay": "#ffffff0a",
        "Irrelevant Timeline Overlay": "#0000000a",
        "Light Timeline Background": "#8f8f8f",
        "Light Timeline Header Background": "#353535",
        "Loop Region Background": "#ffffff32",
        "Multiply Modulation Button Color": "#bb33b1",
        "Note Expression Color": "#055988",
        "Polyphonic Desktop Object": "#3c7399",
        "Record button color implicit": "#b02929",
        "Record button glow color": "#ff000040",
        "Selected matrix slot color": "#676767",
        "Send (post) value color": "#ffe019",
        "Send (pre) value color": "#4df4ff",
        "Time Selection Across All Lanes Fill": "#5e9898c8",
        "Time Selection Across All Lanes Stroke": "#f7f7f7",
        "Time Selection Cursor Stroke": "#ffffff",
        "Time Selection Fill": "#7dc3d05d",
        "Time Selection Inactive Fill": "#ffffff1e",
        "Time Selection Inactive Stroke": "#cecece",
        "Time Selection Not Selected Fill": "#00000000",
        "Time Selection Not Selected Stroke": "#cecece",
        "Time Selection Standby Cursor Stroke": "#f7f7f7",
        "Time Selection Standby Fill": "#ffffff46",
        "Time Selection Standby Stroke": "#cecece",
        "Time Selection Stroke": "#f7f7f7",
        "Timeline Background Pattern": "#00000014",
        "Timeline Cue Marker": "#535353",
        "Timeline Header Background Pattern": "#ffffff0a",
        "Timeline Header Cue Marker": "#545454",
        "Timeline Header Primary Grid": "#828282",
        "Timeline Header Secondary Grid": "#565656",
        "Timeline Header Tooltip Background": "#484848c8",
        "Timeline Header Tooltip Text": "#aaaaaa",
        "Timeline Primary Grid": "#00000064",
        "Timeline Secondary Grid": "#00000014",
        "Timeline Tooltip Background": "#998e8ec8",
        "Timeline Tooltip Text": "#2a2a2a",
        "Top Level Timeline Background": "#a6a6a6",
        "Top Level Timeline Header Background": "#323232",
        "Track Automation Button Color": "#4f9ddb",
        "Track Automation Color": "#055988"
    }
}

const STORAGE_KEY = "bitwig-theme-editor-webui:session";
const MAX_HISTORY = 50;

function loadSavedSession() {
    if (typeof window === "undefined" || !window.localStorage) return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function mergeWithDefault(savedTheme) {
    const base = structuredClone(default_theme);
    if (!savedTheme || typeof savedTheme !== "object") return base;
    for (const cat of Object.keys(base)) {
        if (savedTheme[cat] && typeof savedTheme[cat] === "object") {
            for (const key of Object.keys(base[cat])) {
                if (typeof savedTheme[cat][key] === "string") {
                    base[cat][key] = savedTheme[cat][key];
                }
            }
        }
    }
    return base;
}

const savedSession = loadSavedSession();

export const ThemeStore = writable(mergeWithDefault(savedSession?.theme));
export const gradientEnabled = writable(
    typeof savedSession?.gradientEnabled === "boolean" ? savedSession.gradientEnabled : true
);
export const targetVersion = writable(
    savedSession?.targetVersion === "bw6" ? "bw6" : "bw5"
);
export const themeComments = writable(
    savedSession?.comments && typeof savedSession.comments === "object" ? savedSession.comments : {}
);
export const themeFileName = writable(savedSession?.fileName || "theme.bte");

// Active / hovered selection for preview <-> sidebar sync
export const activeKey = writable(null); // { category, key } | null
export const hoveredPreviewKey = writable(null); // { category, key, x, y } | null

// Toast notifications
export const toastMessage = writable(null);
let toastTimer = null;
export function showToast(text, type = "info", duration = 2800) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.set({ text, type });
    toastTimer = setTimeout(() => {
        toastMessage.set(null);
    }, duration);
}

// Modified color counts (total and per category)
export const modifiedCounts = derived(ThemeStore, ($theme) => {
    const counts = { total: 0, window: 0, arranger: 0, advanced: 0, patched: 0 };
    for (const cat of Object.keys(default_theme)) {
        let catCount = 0;
        for (const key of Object.keys(default_theme[cat])) {
            const cur = ($theme[cat]?.[key] || "").toLowerCase();
            const def = default_theme[cat][key].toLowerCase();
            if (cur !== def) catCount++;
        }
        counts[cat] = catCount;
        counts.total += catCount;
    }
    return counts;
});

// 50-step Undo / Redo history
const undoStack = writable([]);
const redoStack = writable([]);

export const canUndo = derived(undoStack, ($s) => $s.length > 0);
export const canRedo = derived(redoStack, ($s) => $s.length > 0);

export function clearHistory() {
    undoStack.set([]);
    redoStack.set([]);
}

export function setColorValue(category, key, newValue, recordHistory = true) {
    const normalized = newValue.toLowerCase();
    ThemeStore.update(($theme) => {
        const oldValue = ($theme[category]?.[key] || "").toLowerCase();
        if (oldValue === normalized) return $theme;
        if (recordHistory) {
            undoStack.update((stack) => {
                const next = [...stack, { category, key, oldValue, newValue: normalized }];
                return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
            });
            redoStack.set([]);
        }
        return {
            ...$theme,
            [category]: {
                ...$theme[category],
                [key]: normalized,
            },
        };
    });
}

export function resetColorValue(category, key) {
    const def = default_theme[category]?.[key];
    if (def) {
        setColorValue(category, key, def, true);
    }
}

export function resetAllColors() {
    ThemeStore.set(structuredClone(default_theme));
    gradientEnabled.set(true);
    themeComments.set({});
    themeFileName.set("theme.bte");
    clearHistory();
}

export function undoColorChange() {
    const stack = get(undoStack);
    if (stack.length === 0) return;
    const action = stack[stack.length - 1];
    undoStack.set(stack.slice(0, -1));
    redoStack.update((r) => [...r, action]);
    setColorValue(action.category, action.key, action.oldValue, false);
    activeKey.set({ category: action.category, key: action.key });
}

export function redoColorChange() {
    const stack = get(redoStack);
    if (stack.length === 0) return;
    const action = stack[stack.length - 1];
    redoStack.set(stack.slice(0, -1));
    undoStack.update((u) => [...u, action]);
    setColorValue(action.category, action.key, action.newValue, false);
    activeKey.set({ category: action.category, key: action.key });
}

// Debounced localStorage persistence
if (typeof window !== "undefined" && window.localStorage) {
    let saveTimer = null;
    const scheduleSave = () => {
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
            try {
                const payload = {
                    theme: get(ThemeStore),
                    gradientEnabled: get(gradientEnabled),
                    targetVersion: get(targetVersion),
                    comments: get(themeComments),
                    fileName: get(themeFileName),
                };
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
            } catch {
                // Ignore storage quota errors
            }
        }, 250);
    };
    ThemeStore.subscribe(scheduleSave);
    gradientEnabled.subscribe(scheduleSave);
    targetVersion.subscribe(scheduleSave);
    themeComments.subscribe(scheduleSave);
    themeFileName.subscribe(scheduleSave);
}
