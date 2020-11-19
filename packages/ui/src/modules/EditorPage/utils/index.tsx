/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import html2canvas from 'html2canvas';
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

// 添加组件
export const addComponent = (pageJson: any, newIndex: number, parentId: string, initJson: any) => {
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
 * 4、Row组件中只能放Col
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
    const rowOnlyCol = checkRowOnlyCol(pageJson, componentName, parentId);
    const colOnlyRow = checkColOnlyRow(pageJson, componentName, parentId);
    const isInContainer = checkContainer(pageJson, componentName, parentId);
    const formOnFragment = checkFormOnlyFragment(pageJson, componentName, parentId);
    const formOnExtendContainer = checkFormOnlyExtendContainer(pageJson, componentName, parentId);
    if (!isOnly) {
        return `${component.name}只能添加一次`;
    }
    if (!isInContainer) {
        return `${componentName}组件需放在容器组件中`;
    }
    if (!rowOnlyCol) {
        return 'Row组件中只能配置Col组件';
    }
    if (!colOnlyRow) {
        return 'Col组件只能配置在Row组件中';
    }
    if (!formOnFragment) {
        return 'Fragment组件中只能配置一个Form组件';
    }
    if (!formOnExtendContainer) {
        return 'ExtendContainer组件中不能配置Form组件';
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

/**
 * 校验Row组件中只能配置Col
 * @param pageJson 数据
 * @param componentName 当前组件名称
 */
const checkRowOnlyCol = (pageJson: any, componentName: string, parentId: string) => {
    if (parentId === 'draw') {
        return true;
    }
    const parentComponent = findComponentById(pageJson, parentId);
    const { componentName: parentComponentName } = parentComponent;
    if (parentComponentName === 'Row' && componentName !== 'Col') {
        return false;
    }
    return true;
};

/**
 * 校验Col组件中只能配置在Row组件内
 * @param pageJson 数据
 * @param componentName 当前组件名称
 */
const checkColOnlyRow = (pageJson: any, componentName: string, parentId: string) => {
    if (parentId === 'draw') {
        if (componentName === 'Col') {
            return false;
        }
        return true;
    }
    const parentComponent = findComponentById(pageJson, parentId);
    const { componentName: parentComponentName } = parentComponent;
    if (componentName === 'Col' && parentComponentName !== 'Row') {
        return false;
    }
    return true;
};
/**
 * 校验Form组件中只能在Fragment组件内配置一次，不可嵌套配置
 * @param pageJson 数据
 * @param componentName 当前组件名称
 */
const checkFormOnlyFragment = (pageJson: any, componentName: string, parentId: string) => {
    let flag = true;
    if (parentId === 'draw') {
        return true;
    }
    const { components } = pageJson;
    components.find((item: any) => {
        if (item.componentName === 'Fragment') {
            if (
                item.components.filter((comp: { componentName: string }) => comp.componentName === componentName)
                    .length > 0
            ) {
                flag = false;
                return true;
            }
            return true;
        }
    });
    return flag;
};
/**
 * ExtendContainer组件不可嵌套Form
 * @param pageJson 数据
 * @param componentName 当前组件名称
 */
const checkFormOnlyExtendContainer = (pageJson: any, componentName: string, parentId: string) => {
    if (parentId === 'draw') {
        return true;
    }
    const parentComponent = findComponentById(pageJson, parentId);
    const { componentName: parentComponentName } = parentComponent;
    if (parentComponentName === 'ExtendContainer' && componentName === 'Form') {
        return false;
    }
    return true;
};
interface CheckTypes {
    key: string;
    name: string;
    componentName?: string;
}
/* 检查属性 */
export const checkFields = (config: any, keys: CheckTypes[]): Promise<string | undefined> =>
    new Promise((resolve, reject) => {
        keys.forEach(({ key, name, componentName }) => {
            if (!config[key] && config[key] !== 0 && config[key] !== false) {
                resolve(`${componentName || config.componentName}请填写${name}`);
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
export const getValidator = (dataSource: any[]): Promise<Error | undefined> =>
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
export const getPageData = (dataSource: any[], pageJson: any): any[] => {
    const componentMap = getComponents();
    return dataSource.map((item) => {
        const { componentName, id, components } = item;
        // eslint-disable-next-line no-underscore-dangle
        const formConfig = getApp()._store.getState()[id];
        const { toCode } = componentMap[componentName].tools;
        const result = toCode(item, formConfig, pageJson);
        if (components && components.length) {
            result.components = getPageData(components, pageJson);
        }
        return result;
    });
};

/**
 * 获取层级数组的索引
 */
export const getComponent = (components: any[], id = '') => {
    let nodeArray: Array<any> = [];
    if (id) {
        nodeArray = components.map((item) => {
            if (item.id === id) {
                const pageJSON = getComponents()[item.componentName].tools.getInitJson();
                // eslint-disable-next-line no-restricted-syntax
                for (const key in pageJSON) {
                    if (item.componentName === 'Table' && key === 'tableType') {
                        if (item.tableType === 2 || item.tableType === 3) {
                            item.tableType = item[key];
                        }
                    } else {
                        item[key] = pageJSON[key];
                    }
                }
            } else if (item.components && item.components.length) {
                getComponent(item.components, id);
            }
            return item;
        });
    } else {
        nodeArray = components.map((item) => {
            const pageJSON = getComponents()[item.componentName].tools.getInitJson();
            // eslint-disable-next-line no-restricted-syntax
            for (const key in pageJSON) {
                if (item.componentName === 'Table' && key === 'tableType') {
                    if (item.tableType === 2 || item.tableType === 3) {
                        item.tableType = item[key];
                    }
                } else {
                    item[key] = pageJSON[key];
                }
            }
            if (item.components && item.components.length) {
                getComponent(item.components);
            }
            return item;
        });
    }

    return nodeArray;
};

/**
 * 清空所有配置
 */
export const clearAllData = (components: any) => {
    components.forEach((item: any) => {
        const { id, components: children, componentName } = item;
        const initJson = getComponents()[componentName].tools.getInitJson();
        actions[id].setReducers(initJson);
        if (children && children.length > 0) {
            clearAllData(children);
        }
    });
};

/* 灭霸水印 */
const WATERMARK = '灭霸预览图';
/* 截图+水印 */
export const getScreenShotByCanvas = async () => {
    /* 获取截屏 */
    const container: HTMLElement = document.querySelector('.thanos-editor-draw') || document.body;
    const canvas = await html2canvas(container);
    const ctx: any = canvas.getContext('2d');
    ctx.save();
    ctx.translate(canvas.width / 4, canvas.height / 4);
    ctx.rotate(-((30 * Math.PI) / 180));
    ctx.globalAlpha = 0.05;
    ctx.font = '100px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(WATERMARK, 0, 50);
    ctx.restore();
    return canvas.toDataURL('image/jpeg', 0.5);
};

/**
 * 查找Form中的paramKey
 * @param components any[]
 */
export const findParamKey = (components: any[], findKey = 'paramKey'): string => {
    let key = '';
    components.forEach((component) => {
        const { componentName } = component;
        if (componentName === 'Form') {
            key = component[findKey];
        }
    });
    return key;
};
