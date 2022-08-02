import { Type } from "./types";
/** Defines a module setting. */
export declare type ModuleSettingDefinition = {
    name: string;
    type: Type;
    displayName?: string;
    group?: string;
    tooltip?: string;
};
export declare type ModuleDefinition = {
    reactNodes?: unknown[];
    nodes?: unknown[];
    settings?: ModuleSettingDefinition[];
    /** This is called once on startup */
    setup?: () => void;
};
