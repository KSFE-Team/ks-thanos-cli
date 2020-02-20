"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getImportsCode_1 = require("Src/utils/getImportsCode");
const basicElement_1 = require("Src/factories/basicElement");
const listEffect_1 = require("Src/factories/model/effect/listEffect");
class Model extends basicElement_1.BasicElement {
    constructor(config) {
        super();
        this.effects = {};
        this.namespace = '';
        this.initialState = {};
        this.listEffectRequestParams = [];
        this.namespace = config.namespace;
        this.initialState = config.initialState;
    }
    addInitialState(stateName, key, value) {
        const state = this.initialState[stateName] || {};
        if (value) {
            state[key] = value;
        }
        this.initialState[stateName] = state;
    }
    addListEffectRequestParams(params) {
        this.listEffectRequestParams.push(params);
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
        return Object
            .values(this.effects)
            .map((effect) => {
            if (effect instanceof listEffect_1.ListEffect) {
                return effect.toCode(this.listEffectRequestParams);
            }
            return effect.toCode();
        })
            .join(',\n');
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

    initialState: { ...STATE },

    effects: {
        ${effectsCode}
    }
}
        `;
    }
}
exports.default = Model;
//# sourceMappingURL=index.js.map