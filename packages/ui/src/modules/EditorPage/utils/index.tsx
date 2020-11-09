/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { getApp } from 'Src/app';
import { v4 as uuid } from 'uuid';
import { actions } from 'kredux';
import { getComponents, ACTION, ONLYCOMPONENT } from './constants';

export interface HandlePageJson {
    type: string;
    componentName?: string;
    id?: string;
    index?: number;
    oldIndex?: number;
    parentId?: string;
    oldParentId?: string;
    pageJson: any;
}

/**
 * 处理渲染数据
 */
export const handlePageJson = (config: HandlePageJson) => {
    const { type, componentName, index, id, parentId, pageJson } = config;
    let newJson: any;
    switch (type) {
        case ACTION.ADD:
            if (!componentName || (!index && index !== 0) || !parentId) return;
            const initJson = getComponents()[componentName].tools.getInitJson();
            newJson = addComponent(pageJson, index, parentId, {
                ...initJson,
                id: uuid(),
            });
            setTree(newJson);
            return;
        case ACTION.DELETE:
            newJson = deleteComponent(id, pageJson);
            setTree(newJson);
            break;
        case ACTION.UPDATE:
            if ((!index && index !== 0) || !parentId) return;
            const tempNode = findComponent(id, pageJson);
            newJson = deleteComponent(id, pageJson);
            newJson = addComponent(newJson, index, parentId, tempNode);
            setTree(newJson);
            break;
        default:
    }
};

export const setTree = (pageJson: any) => {
    actions.page.setReducers({
        pageJson,
    });
};

// 删除组件
export const deleteComponent = (id: any, pageJson: any) => {
    if (!pageJson.components) {
        return pageJson;
    }
    pageJson.components = pageJson.components.filter((item: any) => {
        if (id === item.id) {
            return false;
        }
        if (item.components) {
            item = deleteComponent(id, item);
        }
        return true;
    });
    return pageJson;
};

// /**
//  * 重新排序
//  * @param {Array} list 需要重新排序的数组
//  * @param {number} startIndex 旧的位置index
//  * @param {number} endIndex 新的位置index
//  */
// const reorder = (list: any, startIndex: any, endIndex: any) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//     return result;
// };

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
const findComponent = (id: any, pageJson: any): any => {
    if (pageJson.id === id) {
        return pageJson;
    }
    if (pageJson.components) {
        let component;
        pageJson.components.forEach((item: any) => {
            const result = findComponent(id, item);
            if (result) {
                component = result;
            }
        });
        return component;
    }
    return undefined;
};

// 一级添加组件
export const addComponent = (pageJson: any, newIndex: number, parentId: string, initJson: any) => {
    // list.splice(endIndex, 0, { ...item, id: uuid() });
    /* root节点不用遍历 */
    if (parentId === 'draw') {
        pageJson.components.splice(newIndex, 0, initJson);
        return pageJson;
    }

    const { components } = pageJson;
    pageJson.components = components.map((item: any): any => {
        if (item.id === parentId) {
            item.components = item.components || [];
            item.components.splice(newIndex, 0, initJson);
            return item;
        }
        if (item.components) {
            item = addComponent(item, newIndex, parentId, initJson);
        }
        return item;
    });
    return pageJson;
};

/**
 * 添加组件校验
 * 1、基础组件,云组件必须放在容器组件中
 * 2、其余组件可以一级添加，也可以放在容器组件中
 * 3、table，relationTable，form全局唯一
 */
export const checkAddComponent = (pageJson: any, component: any, parentId: string) => {
    let isOnly = true;
    let componentName;
    if (component.name) {
        componentName = component.name;
    } else if (component.id) {
        const childrenComponent = findComponentById(pageJson, component.id);
        componentName = childrenComponent.componentName;
    }
    isOnly = checkOnly(pageJson, componentName);
    const isInContainer = checkContainer(pageJson, componentName, parentId);
    if (!isOnly) {
        return `${component.name}只能添加一次`;
    }
    if (!isInContainer) {
        return `${componentName}组件需放在容器组件中`;
    }
    return true;
};

// 基础组件,云组件必须放在容器组件中
const checkContainer = (pageJson: any, componentName: string, parentId: string) => {
    const childrenTools = getComponents()[componentName].tools.getTools();
    const childrenGroupType = childrenTools.groupType;
    if (parentId === 'draw') {
        if (childrenGroupType === 'basic' || childrenGroupType === 'biz') {
            return false;
        }
    } else {
        const parentComponent = findComponentById(pageJson, parentId);
        const { componentName: parentComponentName } = parentComponent;
        const parentTools = getComponents()[parentComponentName].tools.getTools();
        const parentGroupType = parentTools.groupType;
        if ((childrenGroupType === 'basic' || childrenGroupType === 'biz') && parentGroupType !== 'container') {
            return false;
        }
    }
    return true;
};

// 根据组件id查找组件
const findComponentById = (pageJson: any, parentId: string) => {
    let result;
    const { components } = pageJson;
    // eslint-disable-next-line array-callback-return
    components.map((item: any) => {
        if (parentId === item.id) {
            result = item;
        } else if (item.components) {
            result = findComponentById(item, parentId);
        }
    });

    return result;
};

// 全局唯一
const checkOnly = (pageJson: any, componentName: string) => {
    const { components } = pageJson;
    if (
        ONLYCOMPONENT.includes(componentName) &&
        components.filter((item: { componentName: string }) => item.componentName === componentName).length > 0
    ) {
        return false;
    }
    return true;
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
            if (!config[key] && config[key] !== 0 && config[key] !== false) {
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
