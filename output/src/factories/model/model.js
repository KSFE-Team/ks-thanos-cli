"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    constructor(config) {
        this.effects = [];
        this.namespace = '';
        this.initialState = {};
        this.namespace = config.namespace;
        this.initialState = config.initialState;
    }
    addEffect(effectCode) {
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
exports.default = Model;
//# sourceMappingURL=model.js.map