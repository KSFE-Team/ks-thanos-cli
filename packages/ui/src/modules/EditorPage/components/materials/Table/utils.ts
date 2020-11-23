import { ComponentJSON } from 'Src/types/ComponentJSON';
import { checkFields } from 'Src/modules/EditorPage/utils';
import { getApp } from 'Src/app';

interface ColumnsConfig {
    title: string;
    dataIndex: string;
    width?: number;
    dataType?: string;
}

export interface Dependencies {
    type: string;
    responseType: string;
    api: {
        key: string;
        value: string;
    };
    method: string;
    actionType: string;
}

export interface TableConfig extends ComponentJSON {
    componentName: string;
    source: string;
    default: boolean;
    stateName: string;
    method?: string;
    api?: string;
    showPagination: boolean;
    showSelectedRows: boolean;
    showSelectedRowsType?: string;
    columns?: ColumnsConfig[];
    props: {
        [key: string]: any;
    };
    dependencies: Dependencies;
    id: string;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): TableConfig => ({
    componentName: 'Table',
    source: 'antd',
    default: false,
    stateName: '',
    method: 'get',
    api: '',
    showPagination: true,
    showSelectedRows: false,
    columns: [{ title: '序号', dataIndex: 'sortNum', width: 80, dataType: 'text' }],
    props: {},
    dependencies: {
        type: '',
        responseType: '',
        api: {
            key: '',
            value: '',
        },
        method: '',
        actionType: '',
    },
    id: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Table',
    icon: 'edit',
    componentName: 'Table',
    groupType: 'content',
});

export const validator = async (config: TableConfig) => {
    const { columns, showSelectedRows, showSelectedRowsType } = config;
    const baseCheck = await checkFields(config, [
        {
            key: 'api',
            name: '请求地址',
        },
        {
            key: 'method',
            name: '请求方式',
        },
        {
            key: 'showPagination',
            name: '是否分页',
        },
        {
            key: 'showSelectedRows',
            name: '是否行选中',
        },
    ]);
    if (baseCheck) {
        return new Error(baseCheck);
    }

    if (showSelectedRows && !showSelectedRowsType) {
        return new Error('请设置选中类型');
    }

    if (columns && columns.some(({ title, dataIndex }) => !title || !dataIndex)) {
        return new Error('表头设置有误，请检查');
    }

    return undefined;
};

const findStateNameByPageJson = (pageJson: any): string => {
    let stateName: string = '';
    const { components } = pageJson;
    components.forEach((component: any) => {
        if (component.componentName === 'Form') {
            // eslint-disable-next-line no-underscore-dangle
            const formConfig = getApp()._store.getState()[component.id];
            stateName = formConfig.stateName;
            return;
        }
        if (component.components) {
            const result = findStateNameByPageJson(component);
            if (result) {
                stateName = result;
            }
        }
    });

    return stateName;
};

export const toCode = (config: TableConfig, formConfig: TableConfig, pageJson: any): TableConfig => {
    return {
        stateName: findStateNameByPageJson(pageJson),
        componentName: config.componentName,
        source: config.source,
        default: config.default,
        showPagination: formConfig.showPagination,
        showSelectedRows: formConfig.showSelectedRows,
        showSelectedRowsType: formConfig.showSelectedRowsType,
        id: config.id,
        props: {
            columns: formConfig.columns,
        },
        dependencies: {
            type: 'fetch',
            responseType: 'list',
            api: {
                key: 'query',
                value: formConfig.api || '',
            },
            method: formConfig.method || '',
            actionType: 'get',
        },
    };
};

export const reCode = (config: TableConfig): TableConfig => {
    return {
        ...config,
        columns: config.props.columns,
        api: config.dependencies.api.value,
    };
};
