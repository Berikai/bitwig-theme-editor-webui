import { activeKey, default_theme } from "./Theme";

function findCategoryForKey(key) {
    for (const category of Object.keys(default_theme)) {
        if (Object.prototype.hasOwnProperty.call(default_theme[category], key)) {
            return category;
        }
    }
    return "window";
}

export const scrollToValue = (e, value_id, category = null) => {
    if (e && typeof e.stopPropagation === "function") {
        e.stopPropagation();
    }
    const resolvedCategory = category || findCategoryForKey(value_id);
    activeKey.set({ category: resolvedCategory, key: value_id });
};
