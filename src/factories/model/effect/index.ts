import Model from '../index';
import { upperFirst } from 'Src/utils/string';
import { BasicElement } from 'Src/factories/baseElement';

export interface EffectConfig {
    type: 'fetch' | 'dict'; // 数据来源类型
    api: string; // 接口地址
    responseType: 'list' | 'object'; // 接口返回类型
    method: 'POST' | 'GET'; // 接口类型
}

interface MAP {
    [name: string]: string;
}

const PREFIX_NAME_MAP: MAP = {
    'GET': 'load',
    'POST': 'set'
};
const SUFFIX_NAME_MAP: MAP = {
    'list': 'List',
    'object': 'Item'
};


export abstract class Effect extends BasicElement {

    name: string
    stateName: string
    model: Model
    type: string; // 数据来源类型
    api: string; // 接口地址
    responseType: string; // 接口返回类型
    method: string; // 接口类型

    config: EffectConfig;

    constructor(stateName: string, model: Model, config: EffectConfig) {
        super();
        this.model = model;
        this.config = config;
        this.stateName = stateName;

        const { method, api, type, responseType } = config;
        this.method = method;
        this.api = api;
        this.type = type;
        this.responseType = responseType;
        this.name = PREFIX_NAME_MAP[method] + upperFirst(stateName) + SUFFIX_NAME_MAP[responseType];
    }
}