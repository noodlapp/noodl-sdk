interface BuiltInType {
  name: string;
  allowEditOnly?: boolean;
}

export interface ObjectType extends BuiltInType {
  name: "object";
}

export interface ArrayType extends BuiltInType {
  name: "array";
}

export interface StringType extends BuiltInType {
  name: "string";
}

export interface StringListType extends BuiltInType {
  name: "stringlist";
}

export interface NumberType extends BuiltInType {
  name: "number";
  units?: string[];
  defaultUnit?: string;
  marginPaddingComp?: string;
}

export interface BooleanType extends BuiltInType {
  name: "boolean";
}

export interface SignalType extends BuiltInType {
  name: "signal";
}

export type EnumListItem = {
  label: string;
  value: string;
};

export interface EnumType extends BuiltInType {
  name: "enum";
  enums: EnumListItem[];
}

export interface ColorType extends BuiltInType {
  name: "color";
}

export interface ImageType extends BuiltInType {
  name: "image";
}

export interface IconType extends BuiltInType {
  name: "icon";
}

export interface FontType extends BuiltInType {
  name: "font";
}

export interface TextStyleType extends BuiltInType {
  name: "textStyle";
}

export interface ComponentType extends BuiltInType {
  name: "component";
}

export interface DimensionType extends BuiltInType {
  name: "dimension";
}

export interface SourceType extends BuiltInType {
  name: "source";
}

export interface ResizingType extends BuiltInType {
  name: "resizing";
}

export interface VariableType extends BuiltInType {
  name: "variable";
}

export interface CurveType extends BuiltInType {
  name: "curve";
}

export interface QueryFilterType extends BuiltInType {
  name: "query-filter";
}

export interface QuerySortingType extends BuiltInType {
  name: "query-sorting";
}

export interface PagesType extends BuiltInType {
  name: "pages";
}

export interface ProplistType extends BuiltInType {
  name: "proplist";
}

/** List of all the built in types */
export type Type =
  | ObjectType
  | ArrayType
  | StringType
  | StringListType
  | NumberType
  | BooleanType
  | SignalType
  | EnumType
  | ColorType
  | ImageType
  | IconType
  | FontType
  | TextStyleType
  | ComponentType
  | DimensionType
  | SourceType
  | ResizingType
  | VariableType
  | CurveType
  | QueryFilterType
  | QuerySortingType
  | PagesType
  | ProplistType;

/**
 * List of all the type names, including any (*) and custom types (string).
 */
export type TypeNames = Type["name"] | "*" | string;

export type TypeEditor = "javascript" | "graphql" | "css" | "html";

export type TypeWithEditor = Type & {
  codeeditor?: TypeEditor;
  allowEditOnly?: boolean;
};

export type TypeProperty = TypeNames | Type | TypeWithEditor;
