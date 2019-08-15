import { upperFirst } from '../../utils/upperFirst';
import { Effect } from '../model/effect';
import Model from '../model/model';

export interface DataDependenceStructure {
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

export class DataDependence {

    type: 'fetch' | 'dict'
    api: string
    responseType: 'list' | 'object'
    method: string

    effect: Effect

    constructor(stateName: string, model: Model, config: DataDependenceStructure) {
        this.type = config.type;
        this.api = config.api;
        this.responseType = config.responseType;
        this.method = config.method;

        const effectName = PREFIX_NAME_MAP[this.method] + upperFirst(stateName) + SUFFIX_NAME_MAP[this.responseType];
        const effectCode = `
            async ${effectName}(payload, getState) {
                try {
                    const state = getState().${model.namespace}.${stateName};

                    let postData = {
                        size: state.limit,
                        page: state.page,
                    };

                    const response = await call(request, \`${this.api}?\${stringify(postData)}\`)

                    if (response && response.code === 200) {
                        actions.${model.namespace}.setReducer({
                            ${stateName}: {
                                ...state,
                                list: response.data.content,
                                page: response.data.pageNumber,
                                total: response.data.totalElements
                            }
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        `;
        this.effect = new Effect({
            name: effectName,
            code: effectCode
        });
    }
}
