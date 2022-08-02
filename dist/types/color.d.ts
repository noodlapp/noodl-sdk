/** Provides typings for Typescript. */
export declare type ColorTypes = {
    purple: "component";
    green: "data";
    blue: "visual";
    default: "default";
    grey: "default";
};
/**
 * Allows to define a color property by either color or type.
 */
export declare type Color = keyof ColorTypes | ColorTypes[keyof ColorTypes];
/**
 * Parse either Color key or Color value to a color.
 *
 * @param value Either the color or the type.
 * @returns
 */
export declare function parseColor(value: string): Color;
