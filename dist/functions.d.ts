import { InternalNodeDefinition } from "./internal/common";
import { NodeDefinition, ReactNodeDefinition, NodeCtor } from "./types/node";
import { ModuleDefinition } from "./types/module";
import { TSFixme } from "./global";
/**
 * Create a new logic node.
 *
 * @param def
 * @returns
 */
export declare function defineNode<TInstance = {}>(def: NodeDefinition<TInstance>): NodeCtor;
/**
 *
 * @param def
 * @returns
 */
export declare function defineCollectionNode<TInstance = {}>(def: TSFixme): NodeCtor;
/**
 *
 * @param def
 * @returns
 */
export declare function defineModelNode<TInstance = {}>(def: TSFixme): NodeCtor;
/**
 * Create a new React node.
 *
 * @param def
 * @returns
 */
export declare function defineReactNode<TInstance = {}>(def: ReactNodeDefinition<TInstance>): InternalNodeDefinition;
export declare function defineModule(def: ModuleDefinition): void;
export declare function getProjectSettings(): {
    [key: string]: unknown;
};
export declare function runDeployed(): boolean;
