/** Provides typings for Typescript. */
export type ColorTypes = {
  purple: "component";
  green: "data";
  blue: "visual";
  default: "default";
  grey: "default";
};

/** Provides the runtime values. */
const ColorTypesRuntime: ColorTypes = {
  purple: "component",
  green: "data",
  blue: "visual",
  default: "default",
  grey: "default",
};

/**
 * Allows to define a color property by either color or type.
 */
export type Color = keyof ColorTypes | ColorTypes[keyof ColorTypes];

/**
 * Parse either Color key or Color value to a color.
 *
 * @param value Either the color or the type.
 * @returns
 */
export function parseColor(value: string): Color {
  const keys: string[] = Object.keys(ColorTypesRuntime);

  // @ts-expect-error
  const hitKey = keys.find(x => ColorTypesRuntime[x] === value);
  if (hitKey) {
    return hitKey as keyof ColorTypes;
  }

  if (keys.includes(value)) {
    return ColorTypesRuntime[value as keyof ColorTypes];
  }

  return ColorTypesRuntime["default"];
}
