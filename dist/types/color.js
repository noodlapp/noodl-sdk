"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseColor = void 0;
/** Provides the runtime values. */
const ColorTypesRuntime = {
    purple: "component",
    green: "data",
    blue: "visual",
    default: "default",
    grey: "default",
};
/**
 * Parse either Color key or Color value to a color.
 *
 * @param value Either the color or the type.
 * @returns
 */
function parseColor(value) {
    const keys = Object.keys(ColorTypesRuntime);
    // @ts-expect-error
    const hitKey = keys.find(x => ColorTypesRuntime[x] === value);
    if (hitKey) {
        return hitKey;
    }
    if (keys.includes(value)) {
        return ColorTypesRuntime[value];
    }
    return ColorTypesRuntime["default"];
}
exports.parseColor = parseColor;
//# sourceMappingURL=color.js.map