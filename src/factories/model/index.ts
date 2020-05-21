import { Effect } from './effect';
import { getImportsCode } from 'Src/utils/getImportsCode';
import { Import } from 'Src/factories/page/types';
import { BasicElement } from 'Src/factories/basicElement';

interface InitialState {
    [stateName: string]: {
        [name: string]: string;
    };
}

export interface ModelConfig {
    namespace: string; // model的namespace
    initialState: InitialState; // model的initialState
}

export default class Model extends BasicElement {

    effects: {
        [effectName: string]: Effect;
    } = {} // model中的effect
    namespace: string = '' // model的namespace
    initialState: InitialState = {} // model的initalState

    /**
     * 构造函数
     * @param config model的配置
     */
    constructor(config: ModelConfig) {
        super();
        this.namespace = config.namespace;
        this.initialState = config.initialState;
    }

    /**
     * 添加 initialState
     * @param stateName state的名称
     * @param key 属性的key
     * @param value 属性的value
     */
    addInitialState(stateName: string, key: string, value: string) {
        const state = this.initialState[stateName] || {};
        state[key] = value;
        this.initialState[stateName] = state;
    }

    /**
     * 添加effect
     * @param effect effect对象
     */
    addEffect(effect: Effect) {
        this.effects[effect.name] = effect;
    }

    /**
     * 根据effect的名称获取effect
     * @param effectName effect的名称
     */
    getEffect(effectName: string) {
        return this.effects[effectName];
    }

    /**
     * 获取state的代码
     */
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

    /**
     * 获取effect代码
     */
    getEffectsCode() {
        return Object.values(this.effects).map((effect) => effect.toCode()).join(',\n');
    }

    /**
     * 获取需要import的对象数组
     */
    getImports() {
        let effectImports: Import[] = [];
        Object.values(this.effects).map((effect) => {
            effectImports = effectImports.concat(effect.getImports());
        });

        return effectImports;
    }

    /**
     * 生成代码
     */
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

    initialState: { ...STATE },

    effects: {
        ${effectsCode}
    }
}
        `;
    }
}
