"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getImportsCode_1 = require("Src/utils/getImportsCode");
const baseElement_1 = require("Src/factories/component/baseElement");
class Model extends baseElement_1.BaseElement {
    constructor(config) {
        super();
        this.effects = {};
        this.namespace = '';
        this.initialState = {};
        this.namespace = config.namespace;
        this.initialState = config.initialState;
    }
    addInitialState(stateName, key, value) {
        const state = this.initialState[stateName] || {};
        state[key] = value;
        this.initialState[stateName] = state;
    }
    addEffect(effect) {
        this.effects[effect.name] = effect;
    }
    getEffect(effectName) {
        return this.effects[effectName];
    }
    getStateCode() {
        let stateCode = [];
        for (let stateKey in this.initialState) {
            const innerStateCode = Object.entries(this.initialState[stateKey]).map((stateObject) => {
                const [key, value] = stateObject;
                return `${key}: ${value}`;
            }).join(',\n');
            stateCode.push(`${stateKey}: {
                ${innerStateCode}
            }`);
        }
        return stateCode.join(',\n');
    }
    getEffectsCode() {
        return Object.values(this.effects).map((effect) => effect.toCode()).join(',\n');
    }
    getImports() {
        let effectImports = [];
        Object.values(this.effects).map((effect) => {
            effectImports = effectImports.concat(effect.getImports());
        });
        return effectImports;
    }
    toCode() {
        const importCode = getImportsCode_1.getImportsCode(this.getImports());
        const stateCode = this.getStateCode();
        const effectsCode = this.getEffectsCode();
        return `
${importCode}
export const STATE = {
    ${stateCode}
};

export default {
    namespace: '${this.namespace}',

    state: { ...STATE },

    effects: {
        ${effectsCode}
    }
}        
        `;
    }
}
exports.default = Model;
//# sourceMappingURL=index.js.map