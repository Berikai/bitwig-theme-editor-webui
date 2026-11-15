import test from "node:test";
import assert from "node:assert/strict";
import { default_theme } from "../src/lib/Scripts/Theme.js";
import {
    isDefunctColorKey,
    normalizeHexColor,
    parseThemeFile,
    serializeToBte,
    serializeToJson,
} from "../src/lib/Scripts/BteFormat.js";

test("normalizeHexColor handles shorthand, 0x, 6/8-digit hex, and invalid inputs", () => {
    assert.equal(normalizeHexColor("#ABC"), "#aabbcc");
    assert.equal(normalizeHexColor("#1234"), "#11223344");
    assert.equal(normalizeHexColor("0xFF8713"), "#ff8713");
    assert.equal(normalizeHexColor("  #00ff0080 "), "#00ff0080");
    assert.equal(normalizeHexColor("not-a-color"), null);
    assert.equal(normalizeHexColor("#12345"), null);
});

test("isDefunctColorKey identifies defunct keys", () => {
    assert.equal(isDefunctColorKey("Irrelevant Timeline Overlay"), true);
    assert.equal(isDefunctColorKey("Transparent"), true);
    assert.equal(isDefunctColorKey("On"), false);
});

test("parseThemeFile parses .bte with comments, Gradient, BW6 aliases, and patched keys", () => {
    const bte = [
        "// Comment header",
        "Gradient: false",
        "Accent (default): #112233 // Main accent",
        "Grey 0: #050505",
        "EQ Band 1: #ff00aa",
        "Piano Roll White Key: #ffffff1a",
        "Irrelevant Timeline Overlay: #000000",
    ].join("\n");

    const result = parseThemeFile(bte, default_theme);
    assert.equal(result.stats.format, "bte");
    assert.equal(result.gradientEnabled, false);
    assert.equal(result.theme.window["On"], "#112233");
    assert.equal(result.theme.window["Hole (dark)"], "#050505");
    assert.equal(result.theme.patched["EQ Band 1"], "#ff00aa");
    assert.equal(result.theme.patched["Piano Roll White Key"], "#b3b3b3");
    assert.equal(result.comments["On"], "Main accent");
});

test("parseThemeFile parses legacy .json format", () => {
    const json = JSON.stringify({
        window: { On: "#123456" },
        arranger: { "Dark Timeline Background": "#222222" },
    });
    const result = parseThemeFile(json, default_theme);
    assert.equal(result.stats.format, "json");
    assert.equal(result.theme.window["On"], "#123456");
    assert.equal(result.theme.arranger["Dark Timeline Background"], "#222222");
});

test("serializeToBte supports minimize, targetVersion=bw6, and cross-version aliases", () => {
    const modified = structuredClone(default_theme);
    modified.window["On"] = "#00ffaa";

    const minimized = serializeToBte(modified, default_theme, {
        gradientEnabled: false,
        minimize: true,
        includeCrossVersionAliases: true,
        targetVersion: "bw6",
        comments: { On: "Custom accent" },
    });

    assert.match(minimized, /^Gradient: false$/m);
    assert.match(minimized, /^Accent \(default\): #00ffaa \/\/ Custom accent$/m);
    assert.match(minimized, /^On: #00ffaa$/m);
    // Unmodified keys should not be present in minimized export
    assert.doesNotMatch(minimized, /^Button background:/m);
});

test("serializeToJson produces valid lowercase JSON", () => {
    const modified = structuredClone(default_theme);
    modified.window["On"] = "#AABBCC";
    const parsed = JSON.parse(serializeToJson(modified));
    assert.equal(parsed.window["On"], "#aabbcc");
});
