import Model from '../index';
import { upperFirst } from 'Src/utils/string';
import { BasicElement } from 'Src/factories/basicElement';
import path from 'path';
import fsExtra from 'fs-extra';

export interface EffectConfig {
    type: 'fetch' | 'dict'; // 数据来源类型
    api: {
        key: string;
        value: string;
        stageName: string;
    }; // 接口地址
    actionType: 'save' | 'delete' | 'update' | 'get';
    responseType: 'list' | 'object'; // 接口返回类型
    method: 'POST' | 'GET'; // 接口类型
    params?: {
        name: string;
        value: string;
        defaultValue: string;
    }[];
    showSelectedRows?: boolean;
}

export interface EffectRequestParams {
    name: string;
    value?: string;
    defaultValue?: string;
}

interface MAP {
    [name: string]: string;
}

const PREFIX_NAME_MAP: MAP = {
    'get': 'load',
    'save': 'create',
    'delete': 'delete',
    'update': 'update'
};

const SUFFIX_NAME_MAP: MAP = {
    'list': 'List',
    'object': 'Item'
};

export abstract class Effect extends BasicElement {

    name: string // effect的名称
    stateName: string // effect所关联的state名称
    effectName: string // effect名称原始名称
    model: Model // effect所在的model对象
    dataSourceType: string // 数据来源类型
    api: {
        key: string;
        value: string;
        stageName: string;
    } // 接口地址配置
    actionType: string // CRUD类型
    responseType: string // 接口返回类型
    method: string // 接口类型
    params: {
        name: string;
        value: string;
        defaultValue: string;
    }[] = [] // 接口定义参数

    config: EffectConfig;

    /**
     * @param stateName 状态名称
     * @param model 所属的model对象
     * @param config 配置
     */
    constructor(effectName: string, stateName: string, model: Model, config: EffectConfig) {
        super();
        this.model = model;
        this.config = config;
        this.stateName = stateName;
        this.effectName = effectName;
        const { method, api, type, params = [], actionType, responseType } = config;
        this.method = method;
        this.api = api;
        this.dataSourceType = type;
        this.responseType = responseType;
        this.actionType = actionType;
        this.params = params;
        this.name = PREFIX_NAME_MAP[actionType] + upperFirst(effectName) + SUFFIX_NAME_MAP[responseType];

        /** 设置 apiData.json 中的 api */
        const apiDataPath = path.join(process.cwd(), 'src/api/apiData.json');
        const apiDataJSON = fsExtra.readJSONSync(apiDataPath);
        const pageAPI = apiDataJSON[this.model.namespace] || {};
        pageAPI[api.key] = api.value;
        apiDataJSON[api.stageName || this.model.namespace] = pageAPI;
        fsExtra.writeJSONSync(apiDataPath, apiDataJSON, {
            spaces: '\t'
        });
    }

    getRowSelectionCodes = () => {
        
    }

    abstract toCode(requestParams?: EffectRequestParams[]): string
}
