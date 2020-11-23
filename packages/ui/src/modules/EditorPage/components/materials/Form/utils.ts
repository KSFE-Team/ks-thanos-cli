import { ComponentJSON } from 'Src/types/ComponentJSON';
import { getApp } from 'Src/app';
import { FORM_TYPES } from './constants';
import { Dependencies, TableConfig } from '../Table/utils';

const [{ key: NORMAL_FORM }, { key: SEARCH_FORM }] = FORM_TYPES;

interface ActiveEvent {
    eventType: string;
    dependencies: Dependencies;
}

interface FormConfig extends ComponentJSON {
    stateName: string;
    type: string;
    saveApi?: string;
    updateApi?: string;
    getApi?: string;
    paramKey?: string;
    activeEvents: ActiveEvent[];
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): FormConfig => ({
    componentName: 'Form',
    source: 'antd',
    default: false,
    stateName: '',
    type: SEARCH_FORM,
    saveApi: '',
    updateApi: '',
    getApi: '',
    paramKey: '',
    activeEvents: [],
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Form',
    icon: 'form',
    componentName: 'Form',
    groupType: 'container',
});

// eslint-disable-next-line consistent-return
/* form组件配置校验 */
export const validator = (item: any): undefined | Error => {
    if (!item.stateName) {
        return new Error('请填写表单存储key');
    }
    if (!item.type) {
        return new Error('请选择表单类型');
    }
    if (item.type === 'normal') {
        if (['saveApi', 'updateApi', 'getApi', 'paramKey'].some((key) => !item[key])) {
            return new Error('请填写表单信息');
        }
    }
    return undefined;
};

const getTableFormConfig = (pageJson: any): TableConfig | undefined => {
    let tableFormConfig: TableConfig | undefined;
    const { components } = pageJson;
    components.forEach((component: any) => {
        if (component.componentName === 'Table') {
            // eslint-disable-next-line no-underscore-dangle
            const formConfig = getApp()._store.getState()[component.id];
            tableFormConfig = formConfig;
            return;
        }
        if (component.components) {
            const result = getTableFormConfig(component);
            if (result) {
                tableFormConfig = result;
            }
        }
    });
    return tableFormConfig;
};

const getActiveEventsByFormConfig = (formConfig: FormConfig, pageJson: any): ActiveEvent[] => {
    const { type } = formConfig;
    switch (type) {
        case SEARCH_FORM:
            const tableFormConfig: TableConfig | undefined = getTableFormConfig(pageJson);
            const dependencies = {
                type: 'fetch',
                responseType: 'list',
                api: {
                    key: 'query',
                    value: tableFormConfig ? tableFormConfig.api || '' : '',
                },
                method: tableFormConfig ? tableFormConfig.method || '' : '',
                actionType: 'get',
            };
            return [
                {
                    eventType: 'request',
                    dependencies,
                },
            ];
        default:
        case NORMAL_FORM:
            return [
                {
                    eventType: 'request',
                    dependencies: {
                        type: 'fetch',
                        api: {
                            key: 'save',
                            value: formConfig.saveApi || '',
                        },
                        actionType: 'save',
                        responseType: 'object',
                        method: 'post',
                    },
                },
                {
                    eventType: 'request',
                    dependencies: {
                        type: 'fetch',
                        api: {
                            key: 'update',
                            value: formConfig.updateApi || '',
                        },
                        actionType: 'update',
                        responseType: 'object',
                        method: 'post',
                    },
                },
                {
                    eventType: 'request',
                    dependencies: {
                        type: 'fetch',
                        api: {
                            key: 'get',
                            value: formConfig.getApi || '',
                        },
                        actionType: 'get',
                        responseType: 'object',
                        method: 'get',
                    },
                },
            ];
    }
};

/* 组件转换JSON */
export const toCode = (config: FormConfig, formConfig: FormConfig, pageJson: any): FormConfig => {
    const { stateName, type, paramKey } = formConfig;
    return {
        ...config,
        stateName,
        type,
        paramKey,
        activeEvents: getActiveEventsByFormConfig(formConfig, pageJson),
    };
};

export const reCode = (config: FormConfig): FormConfig => {
    let apiConfig: {
        [key: string]: any;
    } = {};
    const { type } = config;
    if (type === NORMAL_FORM) {
        const { activeEvents } = config;
        const [SAVE_REQUEST, UPDATE_REQUEST, GET_REQUEST] = activeEvents;
        apiConfig = {
            saveApi: SAVE_REQUEST.dependencies.api.value,
            updateApi: UPDATE_REQUEST.dependencies.api.value,
            getApi: GET_REQUEST.dependencies.api.value,
        };
    }
    return {
        ...config,
        ...apiConfig,
    };
};
