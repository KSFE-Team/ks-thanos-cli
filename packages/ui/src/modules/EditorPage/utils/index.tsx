/* eslint-disable no-param-reassign */
import { getApp } from 'Src/app';
import uuid from 'uuid/v4';
import { actions } from 'kredux';
import { message } from 'antd';
import { getComponents } from './constants';

const Basic = ['Input', 'Checkbox', 'Radio'];

/**
 * 处理渲染数据
 */
export const handlePageJson = (sourceComponents: any, pageJson: any, result: any) => {
    console.log('result', result);
    const list = pageJson.components;
    const { draggableId, source, destination } = result;
    const startIndex = source.index;
    const endIndex = destination.index;
    const item = findComponent(sourceComponents, draggableId);
    if (Basic.indexOf(item.componentName) > -1 && destination.droppableId !== '1') {
        message.warning(`${item.componentName}只能添加在容器组件中`);
        return;
    }
    if (
        item.componentName === 'Form' &&
        // eslint-disable-next-line no-shadow
        list.filter((item: { componentName: string }) => item.componentName === 'Form').length > 0
    ) {
        message.warning(`${item.componentName}只能配置一次`);
        return;
    }
    switch (destination.droppableId) {
        // 排序
        case source.droppableId:
            const dataSource = reorder(list, startIndex, endIndex);
            if (source.droppableId === 'draw') {
                setTree({ components: dataSource }, pageJson);
            } else {
                dragComponent(list, dataSource, draggableId);
            }
            break;
        // 添加
        case 'draw':
            const newComponents = addComponent(list, endIndex, item);
            setTree({ components: newComponents }, pageJson);
            break;
        case '1':
            const newJson = nestedComponent(list, endIndex, item);
            setTree({ components: newJson }, pageJson);
            break;
        default:
            break;
    }
};

export const setTree = (components: any, pageJson: any) => {
    actions.page.setReducers({
        pageJson: {
            ...pageJson,
            ...components,
        },
    });
};

// 删除组件
export const deleteComponent = (id: any, components: any) => {
    return components.filter((item: any) => {
        if (id === item.id) {
            return false;
            // eslint-disable-next-line no-else-return
        } else if (item.components) {
            // eslint-disable-next-line no-param-reassign
            item.components = deleteComponent(id, item.components);
        }
        return true;
    });
};

/**
 * 重新排序
 * @param {Array} list 需要重新排序的数组
 * @param {number} startIndex 旧的位置index
 * @param {number} endIndex 新的位置index
 */
const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

// 拖拽排序
export const dragComponent = (components: any, dataSource: any, id: any) => {
    components.map((item: any) => {
        if (item.id === id) {
            item.components = dataSource;
        } else if (item.components) {
            // 区域块
            item.components = dragComponent(item.components, dataSource, id);
        }
        return item;
    });
};

// 查找源组件
const findComponent = (componentList: any[], id: any) => {
    let component;
    componentList.forEach((item) => {
        const { components: componentArr } = item;
        component = componentArr.filter((value: { id: any }) => value.id === id);
    });
    const [componentItem] = component;
    return componentItem;
};

// 一级添加组件
export const addComponent = (list: any[], endIndex: any, item: any) => {
    list.splice(endIndex, 0, { ...item, id: uuid() });
    return list;
};

// 嵌套添加组件
export const nestedComponent = (list: any, endIndex: any, item: any) => {
    let index;
    // eslint-disable-next-line array-callback-return
    list.map((val: any, idx: any) => {
        if (val.componentName === 'Form') {
            index = idx;
        }
    });
    list[index].components.splice(endIndex, 0, { ...item, id: uuid() });
    return list;
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
