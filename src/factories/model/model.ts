import { Effect } from './effect';

interface InitialState {
    [stateName: string]: {
        [name: string]: string;
    };
}

export interface ModelConfig {
    namespace: string;
    initialState: InitialState;
}

export default class Model {

    effects: {
        [effectName: string]: Effect;
    } = {}
    namespace: string = ''
    initialState: InitialState = {}

    constructor(config: ModelConfig) {
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
        return Object.values(this.effects).map((effect) => effect.code).join(',\n');
    }

    toCode() {
        const stateCode = this.getStateCode();
        const effectsCode = this.getEffectsCode();
        return `
import { message } from 'antd';
import { stringify } from 'qs';
import request from 'Src/utils/request';

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