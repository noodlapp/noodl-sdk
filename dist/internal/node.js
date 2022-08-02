"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodeDefinition = void 0;
const color_1 = require("../types/color");
function nodeMapInputs(def) {
    const inputs = {};
    for (const key in def.inputs) {
        const value = def.inputs[key];
        if (typeof value === "object") {
            inputs[key] = {
                type: value.type,
                displayName: value.displayName,
                group: value.group,
                default: value.default,
                set: (function () {
                    const _key = key;
                    return function (value) {
                        // @ts-ignore
                        const oldValue = this.inputs[_key];
                        // @ts-ignore
                        this.inputs[_key] = value;
                        if (def.changed && typeof def.changed[_key] === "function") {
                            def.changed[_key].apply(this, [value, oldValue]);
                        }
                    };
                })(),
            };
        }
        else if (typeof value === "string") {
            inputs[key] = {
                type: value,
                displayName: undefined,
                group: undefined,
                default: undefined,
                set: (function () {
                    const _key = key;
                    return function (value) {
                        // @ts-ignore
                        const oldValue = this.inputs[_key];
                        // @ts-ignore
                        this.inputs[_key] = value;
                        if (def.changed && typeof def.changed[_key] === "function") {
                            def.changed[_key].apply(this, [value, oldValue]);
                        }
                    };
                })(),
            };
        }
        else {
            throw new Error("Unknown input type.");
        }
    }
    if (def.signals) {
        for (const key in def.signals) {
            const value = def.signals[key];
            if (typeof value === "object") {
                inputs[key] = {
                    type: "signal",
                    displayName: value.displayName,
                    group: value.group,
                    default: undefined,
                    valueChangedToTrue: (function () {
                        const _value = value;
                        return function () {
                            if (typeof _value.signal === "function") {
                                // @ts-ignore
                                this.scheduleAfterInputsHaveUpdated(() => {
                                    _value.signal.apply(this);
                                });
                            }
                        };
                    })(),
                };
            }
            else {
                inputs[key] = {
                    type: "signal",
                    displayName: undefined,
                    group: undefined,
                    default: undefined,
                    valueChangedToTrue: (function () {
                        const _value = value;
                        return function () {
                            if (typeof _value === "function") {
                                // @ts-ignore
                                this.scheduleAfterInputsHaveUpdated(() => {
                                    _value.apply(this);
                                });
                            }
                        };
                    })(),
                };
            }
        }
    }
    return inputs;
}
function nodeMapOutputs(def) {
    const outputs = {};
    for (const key in def.outputs) {
        const value = def.outputs[key];
        if (value === "signal") {
            outputs[key] = {
                type: "signal",
                displayName: undefined,
                group: undefined,
                getter: undefined,
            };
        }
        else if (typeof value === "object") {
            outputs[key] = {
                type: value.type,
                displayName: value.displayName,
                group: value.group,
                getter: (function () {
                    const _key = key;
                    return function () {
                        return this.outputs[_key];
                    };
                })(),
            };
        }
        else if (typeof value === "string") {
            outputs[key] = {
                type: value,
                displayName: undefined,
                group: undefined,
                getter: (function () {
                    const _key = key;
                    return function () {
                        return this.outputs[_key];
                    };
                })(),
            };
        }
        else {
            throw new Error("Unknown output type.");
        }
    }
    return outputs;
}
function nodeMapMethods(def) {
    const methods = {};
    for (const key in def.methods) {
        methods[key] = def.methods[key];
    }
    // Override the onNodeDeleted if required
    if (methods.onNodeDeleted) {
        methods._onNodeDeleted = function () {
            this.__proto__.__proto__._onNodeDeleted.call(this);
            methods.onNodeDeleted.value.call(this);
        };
    }
    return methods;
}
function createNodeDefinition(def) {
    const color = def.color || "default";
    const _def = {
        name: def.name,
        displayNodeName: def.displayName,
        usePortAsLabel: def.useInputAsLabel,
        color: (0, color_1.parseColor)(color),
        category: def.category || "Modules",
        allowChildren: def.allowChildren,
        allowChildrenWithCategory: def.allowChildrenWithCategory,
        getInspectInfo: def.getInspectInfo,
        docs: def.docs,
        initialize() {
            this.inputs = {};
            var _outputs = (this.outputs = {});
            var _this = this;
            // Function for quickly setting outputs
            this.setOutputs = function (o) {
                for (var key in o) {
                    // @ts-expect-error
                    _outputs[key] = o[key];
                    _this.flagOutputDirty(key);
                }
            };
            // Sending warnings
            this.clearWarnings = function () {
                if (this.context.editorConnection &&
                    this.nodeScope &&
                    this.nodeScope.componentOwner) {
                    this.context.editorConnection.clearWarnings(this.nodeScope.componentOwner.name, this.id);
                }
            }.bind(this);
            this.sendWarning = function (name, message) {
                if (this.context.editorConnection &&
                    this.nodeScope &&
                    this.nodeScope.componentOwner) {
                    this.context.editorConnection.sendWarning(this.nodeScope.componentOwner.name, this.id, name, {
                        message: message,
                    });
                }
            }.bind(this);
            if (typeof def.initialize === "function") {
                def.initialize.apply(this);
            }
        },
        inputs: nodeMapInputs(def),
        outputs: nodeMapOutputs(def),
        methods: nodeMapMethods(def),
    };
    return _def;
}
exports.createNodeDefinition = createNodeDefinition;
//# sourceMappingURL=node.js.map