import { getApp } from 'Src/app';
import uuid from 'uuid/v4';
import { actions } from 'kredux';
import { message } from 'antd';
import { getComponents } from './constants';

const Basic = ['Input', 'Checkbox'];

/**
 * 处理渲染数据
 */
export const handlePageJson = (
    source: any,
    destination: any,
    draggableId: any,
    droppableSource: any,
    droppableDestination: any,
) => {
    const list = destination.components;
    const startIndex = droppableSource.index;
    const endIndex = droppableDestination.index;
    const item = findComponent(source, draggableId);
    if (Basic.indexOf(item.componentName) > -1 && droppableDestination.droppableId !== 1) {
        message.warning(`${item.componentName}只能添加在容器组件中`);
        return;
    }
    switch (droppableDestination.droppableId) {
        // 排序
        case droppableSource.droppableId:
            dragComponent(destination, startIndex, endIndex);
            break;
        // 添加
        case 'draw':
            addComponent(list, endIndex, item, destination);
            break;
        case '1':
            nestedComponent(list, endIndex, item, destination);
            break;
        default:
            break;
    }
};

// 查找源组件
const findComponent = (componentList: any[], id: any) => {
    let component;
    componentList.map((item) => {
        const { components: componentArr } = item;
        component = componentArr.filter((value: { id: any }) => value.id === id);
    });
    const [componentItem] = component;
    return componentItem;
};

// 添加组件
export const addComponent = (list: any[], endIndex: any, item: any, destination: any) => {
    list.splice(endIndex, 0, { ...item, id: uuid() });
    actions.page.setReducers({
        pageJson: { ...destination, components: list },
    });
};

// 嵌套添加组件
export const nestedComponent = (list: any, endIndex: any, item: any, destination: any) => {
    list[0].components.splice(endIndex, 0, { ...item, id: uuid() });
    actions.page.setReducers({
        pageJson: { ...destination, components: list },
    });
};

// 拖拽排序
export const dragComponent = (destination: any, startIndex: any, endIndex: any) => {
    const list = destination.components;
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    actions.page.setReducers({
        pageJson: { ...destination },
    });
};

// 删除组件
export const deleteComponent = (id: any, pageJson: any) => {
    const list = pageJson.components || [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item in list) {
        if (list[item].id === id) {
            list.splice(item, 1);
            actions.page.setReducers({
                pageJson: { ...pageJson, components: list },
            });
            // eslint-disable-next-line no-prototype-builtins
        } else if (list[item].hasOwnProperty('components') && list[item].components.length !== 0) {
            const m = JSON.parse(JSON.stringify(list[item]));
            deleteComponent(id, m);
        }
    }
};

interface CheckTypes {
    key: string;
    name: string;
    componentName: string;
}
/* 检查属性 */
export const checkFields = (config: any, keys: CheckTypes[]) =>
    new Promise((resolve, reject) => {
        keys.forEach(({ key, name, componentName }) => {
            if (!config[key]) {
                resolve(`${componentName}请填写${name}`);
            }
        });
        resolve();
    });

/* 检查基础 key、label属性 */
export const baseValidator = (config: any) =>
    checkFields(
        config,
        [
            {
                key: 'label',
                name: '表单展示字段',
            },
            {
                key: 'key',
                name: '表单绑定字段',
            },
            {
                key: 'isRequired',
                name: '是否必填',
            },
        ].map((item) => ({
            ...item,
            componentName: config.componentName,
        })),
    );

/* 校验页面数据 */
export const getValidator = (dataSource: any[]) =>
    new Promise((resolve, reject) => {
        let err: any;
        let times = dataSource.length;
        dataSource.forEach(async (item: any) => {
            if (!err) {
                const { componentName, id, components } = item;
                const componentMap = getComponents();
                // eslint-disable-next-line no-underscore-dangle
                const formConfig = getApp()._store.getState()[id];
                const tempItem = {
                    ...item,
                    ...formConfig,
                };
                const { validator } = componentMap[componentName].tools;
                const result = await validator(tempItem);
                if (result) {
                    err = result;
                }

                if (!err && components) {
                    await getValidator(components).catch((error) => {
                        err = new Error(error);
                    });
                }
            }
            times -= 1;
        });
        const timer = setInterval(() => {
            if (!times) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
                if (timer) {
                    clearInterval(timer);
                }
            }
        }, 100);
    });

/* 整合数据 */
export const getPageData = (dataSource: any[]): any[] => {
    const componentMap = getComponents();
    return dataSource.map((item) => {
        const { componentName, id, components } = item;
        // eslint-disable-next-line no-underscore-dangle
        const formConfig = getApp()._store.getState()[id];
        const { toCode } = componentMap[componentName].tools;
        const result = toCode(item, formConfig);
        if (components && components.length) {
            result.components = getPageData(components);
        }
        return result;
    });
};
