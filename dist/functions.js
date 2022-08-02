"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDeployed = exports.getProjectSettings = exports.defineModule = exports.defineReactNode = exports.defineModelNode = exports.defineCollectionNode = exports.defineNode = void 0;
const node_1 = require("./internal/node");
/**
 * Create a new logic node.
 *
 * @param def
 * @returns
 */
function defineNode(def) {
    const internalDefinition = (0, node_1.createNodeDefinition)(def);
    return {
        node: internalDefinition,
        setup: def.setup,
    };
}
exports.defineNode = defineNode;
/**
 *
 * @param def
 * @returns
 */
function defineCollectionNode(def) {
    const _def = {
        name: def.name,
        category: def.category,
        color: "data",
        inputs: def.inputs,
        outputs: Object.assign({
            Items: "array",
            "Fetch Started": "signal",
            "Fetch Completed": "signal",
        }, def.outputs || {}),
        signals: Object.assign({
            Fetch() {
                var _this = this;
                this.sendSignalOnOutput("Fetch Started");
                var a = def.fetch.call(this, function () {
                    _this.sendSignalOnOutput("Fetch Completed");
                });
                this.setOutputs({
                    Items: a,
                });
            },
        }, def.signals || {}),
    };
    return defineNode(_def);
}
exports.defineCollectionNode = defineCollectionNode;
/**
 *
 * @param def
 * @returns
 */
function defineModelNode(def) {
    const definition = {
        name: def.name,
        category: def.category,
        color: "data",
        inputs: {
            Id: "string",
        },
        outputs: {
            Fetched: "signal",
        },
        changed: {
            Id(value) {
                if (this._object && this._changeListener)
                    this._object.off("change", this._changeListener);
                // @ts-expect-error
                this._object = Noodl.Object.get(value);
                this._changeListener = (name, value) => {
                    const outputs = {};
                    outputs[name] = value;
                    this.setOutputs(outputs);
                };
                this._object.on("change", this._changeListener);
                this.setOutputs(this._object.data);
                this.sendSignalOnOutput("Fetched");
            },
        },
        initialize() { },
    };
    for (var key in def.properties) {
        definition.inputs[key] = def.properties[key];
        definition.outputs[key] = def.properties[key];
        definition.changed[key] = (function () {
            const _key = key;
            return function (value) {
                if (!this._object)
                    return;
                this._object.set(_key, value);
            };
        })();
    }
    return defineNode(definition);
}
exports.defineModelNode = defineModelNode;
/**
 * Create a new React node.
 *
 * @param def
 * @returns
 */
function defineReactNode(def) {
    const internalDefinition = (0, node_1.createNodeDefinition)(def);
    internalDefinition.getReactComponent = def.getReactComponent;
    internalDefinition.inputProps = def.inputProps;
    internalDefinition.inputCss = def.inputCss;
    internalDefinition.outputProps = def.outputProps;
    internalDefinition.setup = def.setup;
    internalDefinition.frame = def.frame;
    // @ts-expect-error
    internalDefinition.dynamicports = def.dynamicports;
    // @ts-expect-error
    internalDefinition.visualStates = def.visualStates;
    return internalDefinition;
}
exports.defineReactNode = defineReactNode;
function defineModule(def) {
    // HACK: Making webpack think that the method is in here.
    // @ts-ignore
    return Noodl.defineModule(def);
}
exports.defineModule = defineModule;
function getProjectSettings() {
    // HACK: Making webpack think that the method is in here.
    // @ts-ignore
    return Noodl.getProjectSettings();
}
exports.getProjectSettings = getProjectSettings;
function runDeployed() {
    // HACK: Making webpack think that the method is in here.
    // @ts-ignore
    return Noodl.runDeployed;
}
exports.runDeployed = runDeployed;
//# sourceMappingURL=functions.js.map