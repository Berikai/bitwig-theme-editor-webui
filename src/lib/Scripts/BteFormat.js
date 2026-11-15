/**
 * Parser and serializer for Bitwig Theme Editor (.bte) and legacy (.json) files.
 * Aligned with Bitwig Theme Editor (Java) Editor.java & ColorPanel.java.
 */

export const DEFUNCT_KEYS = new Set([
    "Irrelevant Timeline Overlay",
    "Transparent",
    "Image Source",
    "Same as background",
    "Inherited",
]);

export const BW6_TO_BW5 = {
    "Accent (default)": "On",
    "Accent (hitech)": "Hitech on",
    "Grid Line (Primary)": "Timeline Primary Grid",
    "Grid Line (Secondary)": "Timeline Secondary Grid",
    "Grey 0": "Hole (dark)",
    "Grey 1": "Dark Timeline Background",
    "Grey 2": "Light Timeline Background",
    "Grey 3": "Hole (medium)",
    "Grey 5": "Panel body",
    "Grey 6": "Selected Panel body",
    "Panel Stroke (focused)": "Active Panel stroke",
    "White Selection": "Selection",
    "White Selection (standby)": "Standby selection",
};

export const BW5_TO_BW6 = {
    "On": "Accent (default)",
    "Hitech on": "Accent (hitech)",
    "Timeline Header Primary Grid": "Grid Line (Primary)",
    "Timeline Primary Grid": "Grid Line (Primary)",
    "Timeline Header Secondary Grid": "Grid Line (Secondary)",
    "Timeline Secondary Grid": "Grid Line (Secondary)",
    "Hole (dark)": "Grey 0",
    "Dark Timeline Background": "Grey 1",
    "Light Timeline Background": "Grey 2",
    "Hole (medium)": "Grey 3",
    "Hole (light)": "Grey 3",
    "Panel body": "Grey 5",
    "Content Background": "Grey 5",
    "Dialog background": "Grey 5",
    "Selected Panel body": "Grey 6",
    "Active Panel stroke": "Panel Stroke (focused)",
    "Selection": "White Selection",
    "Standby selection": "White Selection (standby)",
};

export const CROSS_VERSION_ALIASES = {
    "Grid Line (Primary)": ["Timeline Header Primary Grid", "Timeline Primary Grid"],
    "Timeline Header Primary Grid": ["Grid Line (Primary)"],
    "Timeline Primary Grid": ["Grid Line (Primary)"],
    "Grid Line (Secondary)": ["Timeline Header Secondary Grid", "Timeline Secondary Grid"],
    "Timeline Header Secondary Grid": ["Grid Line (Secondary)"],
    "Timeline Secondary Grid": ["Grid Line (Secondary)"],
    "Accent (hitech)": ["Hitech on"],
    "Hitech on": ["Accent (hitech)"],
    "Accent (default)": ["On"],
    "On": ["Accent (default)"],
    "Grey 0": ["Hole (dark)"],
    "Hole (dark)": ["Grey 0"],
    "Grey 1": ["Dark Timeline Background"],
    "Dark Timeline Background": ["Grey 1"],
    "Grey 2": ["Light Timeline Background"],
    "Light Timeline Background": ["Grey 2"],
    "Grey 3": ["Hole (medium)"],
    "Hole (medium)": ["Grey 3"],
    "Grey 5": ["Panel body"],
    "Panel body": ["Grey 5"],
    "Grey 6": ["Selected Panel body"],
    "Selected Panel body": ["Grey 6"],
    "Panel Stroke (focused)": ["Active Panel stroke"],
    "Active Panel stroke": ["Panel Stroke (focused)"],
    "White Selection": ["Selection"],
    "Selection": ["White Selection"],
    "White Selection (standby)": ["Standby selection"],
    "Standby selection": ["White Selection (standby)"],
};

/**
 * Normalize a hex color string (#RGB, #RGBA, #RRGGBB, #RRGGBBAA, 0x...).
 * Returns lowercase #rrggbb or #rrggbbaa, or null if invalid.
 */
export function normalizeHexColor(raw) {
    if (typeof raw !== "string") return null;
    let hex = raw.trim();
    if (hex.startsWith("#")) {
        hex = hex.slice(1);
    } else if (hex.startsWith("0x") || hex.startsWith("0X")) {
        hex = hex.slice(2);
    }

    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    } else if (hex.length === 4) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }

    if (hex.length !== 6 && hex.length !== 8) return null;
    if (!/^[0-9a-fA-F]+$/.test(hex)) return null;

    return `#${hex.toLowerCase()}`;
}

export function isDefunctColorKey(key) {
    return DEFUNCT_KEYS.has(key);
}

/**
 * Build a lookup map from color key -> category in defaultTheme.
 */
function buildKeyToCategoryMap(defaultTheme) {
    const map = new Map();
    for (const category of Object.keys(defaultTheme)) {
        for (const key of Object.keys(defaultTheme[category])) {
            map.set(key, category);
        }
    }
    return map;
}

/**
 * Apply a single key/value entry into the target theme object.
 */
function applyEntry(theme, keyMap, rawKey, rawValue, comment, commentsOut) {
    if (isDefunctColorKey(rawKey)) return false;

    let value = rawValue;
    if (rawKey === "Piano Roll White Key" && (value.toLowerCase() === "#ffffff1a" || value.length === 9)) {
        value = "#b3b3b3";
    }

    const normalizedHex = normalizeHexColor(value);
    if (!normalizedHex) return false;

    let targetKey = rawKey;
    if (!keyMap.has(targetKey) && BW6_TO_BW5[rawKey]) {
        targetKey = BW6_TO_BW5[rawKey];
    }

    const category = keyMap.get(targetKey);
    if (!category) return false;

    theme[category][targetKey] = normalizedHex;
    if (comment) {
        commentsOut[targetKey] = comment;
    }
    return true;
}

/**
 * Parse a .bte or .json theme string into a normalized theme state.
 */
export function parseThemeFile(text, defaultTheme) {
    const theme = structuredClone(defaultTheme);
    const keyMap = buildKeyToCategoryMap(defaultTheme);
    const comments = {};
    let gradientEnabled = true;
    let matched = 0;
    let skipped = 0;

    const trimmed = text.trim();
    if (trimmed.startsWith("{")) {
        const parsed = JSON.parse(trimmed);
        for (const [topKey, topVal] of Object.entries(parsed)) {
            if (topKey === "Gradient") {
                gradientEnabled = topVal === true || topVal === "true";
                continue;
            }
            if (topVal && typeof topVal === "object" && !Array.isArray(topVal)) {
                for (const [subKey, subVal] of Object.entries(topVal)) {
                    if (typeof subVal === "string") {
                        if (applyEntry(theme, keyMap, subKey, subVal, "", comments)) matched++;
                        else skipped++;
                    }
                }
            } else if (typeof topVal === "string") {
                if (applyEntry(theme, keyMap, topKey, topVal, "", comments)) matched++;
                else skipped++;
            }
        }
        return { theme, gradientEnabled, comments, stats: { matched, skipped, format: "json" } };
    }

    const lines = text.split(/\r?\n/);
    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line || line.startsWith("//")) continue;

        const colonIdx = line.indexOf(":");
        if (colonIdx === -1) {
            skipped++;
            continue;
        }

        const rawKey = line.slice(0, colonIdx).trim();
        const rest = line.slice(colonIdx + 1);

        const commentIdx = rest.indexOf("//");
        const rawValue = (commentIdx === -1 ? rest : rest.slice(0, commentIdx)).trim();
        const comment = commentIdx === -1 ? "" : rest.slice(commentIdx + 2).trim();

        if (rawKey === "Gradient") {
            gradientEnabled = rawValue.toLowerCase() !== "false";
            continue;
        }

        if (applyEntry(theme, keyMap, rawKey, rawValue, comment, comments)) {
            matched++;
        } else {
            skipped++;
        }
    }

    return { theme, gradientEnabled, comments, stats: { matched, skipped, format: "bte" } };
}

/**
 * Serialize a theme object to .bte format.
 */
export function serializeToBte(theme, defaultTheme, options = {}) {
    const {
        gradientEnabled = true,
        minimize = false,
        includeCrossVersionAliases = true,
        targetVersion = "bw5",
        comments = {},
    } = options;

    const lines = [
        "// Theme file generated by Bitwig Theme Editor WebUI",
        `// Target: ${targetVersion === "bw6" ? "Bitwig Studio 6.x" : "Bitwig Studio 4.x / 5.x"}`,
        `Gradient: ${Boolean(gradientEnabled)}`,
    ];

    const writtenKeys = new Set();
    const writtenEntries = [];
    const categoryOrder = ["window", "arranger", "advanced", "patched"];

    for (const category of categoryOrder) {
        const group = theme[category];
        if (!group) continue;
        for (const [key, val] of Object.entries(group)) {
            if (isDefunctColorKey(key)) continue;
            const normalizedVal = (val || "").toLowerCase();
            const defaultVal = (defaultTheme[category]?.[key] || "").toLowerCase();
            if (minimize && normalizedVal === defaultVal) continue;

            const outKey = targetVersion === "bw6" ? (BW5_TO_BW6[key] || key) : key;
            if (writtenKeys.has(outKey)) continue;
            writtenKeys.add(outKey);

            const comment = comments[key] ? ` // ${comments[key]}` : "";
            lines.push(`${outKey}: ${normalizedVal}${comment}`);
            writtenEntries.push({ key: outKey, val: normalizedVal });
        }
    }

    if (includeCrossVersionAliases) {
        for (const { key, val } of writtenEntries) {
            const aliases = CROSS_VERSION_ALIASES[key];
            if (!aliases) continue;
            for (const alias of aliases) {
                if (!writtenKeys.has(alias)) {
                    writtenKeys.add(alias);
                    lines.push(`${alias}: ${val}`);
                }
            }
        }
    }

    return lines.join("\n") + "\n";
}

/**
 * Serialize a theme object to legacy .json format.
 */
export function serializeToJson(theme) {
    const out = {};
    for (const [category, entries] of Object.entries(theme)) {
        out[category] = {};
        for (const [key, val] of Object.entries(entries)) {
            out[category][key] = (val || "").toLowerCase();
        }
    }
    return JSON.stringify(out, null, 2);
}
