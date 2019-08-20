import { Effect } from './effect';
import { getImportsCode } from 'Src/utils/getImportsCode';
import { Import } from 'Src/factories/page/types';
import { BaseElement } from 'Src/factories/baseElement';

interface InitialState {
    [stateName: string]: {
        [name: string]: string;
    };
}

export interface ModelConfig {
    namespace: string;
    initialState: InitialState;
}

export default class Model extends BaseElement {

    effects: {
        [effectName: string]: Effect;
    } = {}
    namespace: string = ''
    initialState: InitialState = {}

    constructor(config: ModelConfig) {
        super();
        this.namespace = config.namespace;
        this.initialState = config.initialState;
    }

    addInitialState(stateName: string, key: string, value: string) {
        const state = this.initialState[stateName] || {};
        state[key] = value;
        this.initialState[stateName] = state;
    }

    addEffect(effect: Effect) {
        this.effects[effect.name] = effect;
    }

    getEffect(effectName: string) {
        return this.effects[effectName];
    }

    getStateCode() {
        let stateCode = [];
        for (let stateKey in this.initialState) {
            const innerStateCode =  Object.entries(this.initialState[stateKey]).map((stateObject) => {
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
        let effectImports: Import[] = [];
        Object.values(this.effects).map((effect) => {
            effectImports = effectImports.concat(effect.getImports());
        });

        return effectImports;
    }

    toCode() {
        const importCode = getImportsCode(this.getImports());
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