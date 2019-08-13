interface InitialState {
    [name: string]: string;
}

export interface ModelConfig {
    namespace: string;
    initialState: InitialState;
}

export default class Model {

    effects: string[] = []
    namespace: string = ''
    initialState: InitialState = {}

    constructor(config: ModelConfig) {
        this.namespace = config.namespace;
        this.initialState = config.initialState;
    }

    addEffect(effectCode: string) {
        this.effects.push(effectCode);
    }

    getStateCode() {
        let stateCode = [];
        for (let stateKey in this.initialState) {
            stateCode.push(`${stateKey}: ${this.initialState[stateKey]}`);
        }
        return stateCode.join(',\n');
    }

    getEffectsCode() {
        return this.effects.join(',\n');
    }

    toCode() {
        const stateCode = this.getStateCode();
        const effectsCode = this.getEffectsCode();
        return `
import { message } from 'antd';
import { stringify } from 'qs';
import request from 'Src/utils/request';
import { API } from 'Src/api/api';

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