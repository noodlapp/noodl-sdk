import { TypeNames, Type, TypeProperty } from "./types";
import { Color } from "./color";
import { TSFixme } from "../global";
import { NodeInstance, ReactNodeInstance } from "./node-instance";
import { InternalNodeDefinition } from "../internal/common";

/**
 * @privateRemarks
 * When the type is for example "enum".
 *
 * Then we can pass an object with the enum keys,
 * right now I don't see a good use for this.
 *
 * ```js
 * {
 *    enumKey1: Tooltip,
 *    enumKey2: Tooltip
 * }
 * ```
 */
export interface Tooltip {
  /** Plain text description */
  standard?: string;

  /**
   * HTML description as string.
   *
   * @example
   * ```html
   * <div class="popup-layer-image-row">
   *   <h3>My Tooltip</h3>
   *   <div class="popup-layer-image-item">
   *     <img src="./path-to-image.png" />
   *     <h3>My Image</h3>
   *   </div>
   * </div>
   * ```
   */
  extended?: string;
}

/** Defines a input defined on a node. */
export type NodeInput =
  | TypeNames
  | {
      type: TypeProperty;
      displayName?: string;
      group?: string;
      default?: unknown;

      /** Tooltip. */
      tooltip?: Tooltip;

      set?: (this: NodeInstance, value: unknown) => void;
    };

/** Defines a output defined on a node. */
export type NodeOutput =
  | TypeNames
  | {
      type: TypeProperty;
      displayName?: string;
      group?: string;

      /** Tooltip. */
      tooltip?: Tooltip;
    };

/** Defines a signal defined on a node. */
export type NodeSignal =
  | {
      (this: NodeInstance): void;
    }
  | {
      displayName?: string;
      group?: string;
      signal: (this: NodeInstance) => void;
    };

/** Defines a method defined on a node. */
export type NodeMethod<TInstance> = {
  (this: TInstance & NodeInstance, ...args: any): unknown;
};

export type InspectInfoFunc = () =>
  | { type: "text" | "color"; value: string }[]
  | string
  | undefined;

export type NodeDefinition<TInstance = {}> = {
  /**
   * Sets the name.
   *
   * IMPORTANT:
   * This name will be a identifier for this node,
   * so changing the name will make all the projects using it lose reference.
   */
  name: string;

  /**
   * Sets a name that will be displayed instead of 'name'.
   */
  displayName?: string;

  displayNodeName?: string;
  usePortAsLabel?: string;

  /** Use the port value as label */
  useInputAsLabel?: string;

  /**
   * Sets the color.
   *
   * Default: 'default'
   */
  color?: Color;

  /** Sets the category. */
  category?: "Visual" | "Data" | "Utilities" | "Logic" | string;

  allowChildren?: boolean;
  allowChildrenWithCategory?: string[];

  getInspectInfo?: InspectInfoFunc;

  /** URL to the docs page. */
  docs?: string;

  setup?: () => void;
  initialize?: (this: NodeInstance & TInstance) => void;

  inputs?: {
    [key: string]: NodeInput;
  };

  outputs?: {
    [key: string]: NodeOutput;
  };

  changed?: {
    [key: string]: (
      this: NodeInstance & TInstance,
      newValue: unknown,
      oldValue: unknown
    ) => void;
  };

  signals?: {
    [key: string]: NodeSignal;
  };

  methods?: {
    [key: string]: NodeMethod<TInstance>;

    /** Occurs when a node is deleted. */
    onNodeDeleted?: NodeMethod<TInstance>;

    /** Don't override this */
    update?: any;
  };
};

export type ReactNodeDefinition<TInstance = {}> = NodeDefinition<TInstance> & {
  getReactComponent: () => (...args: any) => JSX.Element;

  visualStates?: {
    name: string;
    label: string;
  }[];

  dynamicports?: {
    name?: string;
    condition: string;
    inputs: string[];
  }[];

  inputProps?: {
    /**
     *
     */
    [key: string]: {
      /** The order the property will be listed in the property panel. */
      index?: number;

      /** Display name of the property. */
      displayName: string;
      group: string;

      type: TypeProperty;
      default?: unknown;

      /** Tooltip. */
      tooltip?: Tooltip;

      /**
       * default: false
       */
      allowVisualStates?: boolean;
    };
  };

  inputCss?: {
    [key: string]: {
      /** The order the property will be listed in the property panel. */
      index?: number;

      /** Display name of the property. */
      displayName: string;

      type: TypeProperty;
      group: string;
      default?: unknown;
      applyDefault?: boolean;

      /** Tooltip. */
      tooltip?: Tooltip;

      /**
       * default: false
       */
      allowVisualStates?: boolean;

      onChange?: (value: unknown) => void;
    };
  };

  outputProps?: {
    [key: string]: {
      displayName: string;
      type: TypeProperty;
      group: string;
    };
  };

  setup?: TSFixme;
  frame?: TSFixme;
};

export type NodeCtor = {
  node: InternalNodeDefinition;
  setup: () => void;
};
