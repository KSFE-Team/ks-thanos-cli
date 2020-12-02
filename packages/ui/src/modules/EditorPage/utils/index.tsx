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
    undoStack: any;
}

/**
 * 处理渲染数据
 */
export const handlePageJson = (config: HandlePageJson) => {
    const { type, componentName, index, id, parentId, pageJson, undoStack } = config;
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
            setUndoStack(newJson, undoStack);
            return;
        case ACTION.DELETE:
            newJson = deleteComponent(id, pageJson);
            setTree(newJson);
            setUndoStack(newJson, undoStack);
            break;
        case ACTION.UPDATE:
            if ((!index && index !== 0) || !parentId) return;
            const tempNode = findComponent(id, pageJson);
            newJson = deleteComponent(id, pageJson);
            newJson = addComponent(newJson, index, parentId, tempNode);
            setTree(newJson);
            setUndoStack(newJson, undoStack);
            break;
        default:
    }
};

export const setTree = (pageJson: any) => {
    actions.page.setReducers({
        pageJson,
    });
};

// 记录操作组件树
export const setUndoStack = (pageJson: any, undoStack: any) => {
    const copyPageJson = JSON.parse(JSON.stringify(pageJson));
    const undoItem = {
        type: 'tree',
        components: copyPageJson.components,
    };
    undoStack.push(undoItem);
    actions.page.setReducers({
        undoStack,
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
const findComponent = (id: any, pageJson: any, key: string = 'id'): any => {
    if (pageJson[key] === id) {
        return pageJson;
    }
    if (pageJson.components) {
        let component;
        pageJson.components.forEach((item: any) => {
            const result = findComponent(id, item, key);
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
    // 全局唯一校验
    let isOnly = true;
    let componentName;
    if (component.name) {
        componentName = component.name;
    } else if (component.id) {
        const childrenComponent: any = findComponent(component.id, pageJson);
        componentName = childrenComponent.componentName;
    }
    isOnly = checkOnly(pageJson, componentName);
    if (!isOnly) {
        return `${component.name}只能添加一次`;
    }
    const { tools: childrenTools } = getComponents()[componentName];
    const taegetCompoent = findComponent(parentId, pageJson) || 'draw';
    const sourceComponent = component;
    const getTools = childrenTools.getTools();
    let parentTools;
    if (taegetCompoent !== 'draw') {
        parentTools = getComponents()[taegetCompoent.componentName].tools;
    }
    let result;
    if (parentTools && parentTools.verifyParentComponent) {
        result = parentTools.verifyParentComponent(sourceComponent, taegetCompoent, pageJson);
    } else if (childrenTools && childrenTools.verifyComponent) {
        result = childrenTools.verifyComponent(sourceComponent, taegetCompoent, pageJson);
    } else if (getTools && getTools.accept) {
        const { accept } = getTools;
        result = verifyComponentByAccept(accept, taegetCompoent);
    } else if (getTools && getTools.groupType) {
        const { groupType } = getTools;
        result = verifyComponentByGroupType(groupType, taegetCompoent, parentId);
    }
    if (result && typeof result !== 'boolean') {
        return result;
    }
    if (!result) {
        return `${
            parentId === 'draw'
                ? `${componentName}需放在容器组件中`
                : `${componentName}不能放在${taegetCompoent.componentName}组件中`
        }`;
    }
    return true;
};

// 根据accept校验组件
const verifyComponentByAccept = (accept: any, taegetCompoent: any) => {
    if (!accept.includes(taegetCompoent.componentName)) {
        return false;
    }
    return true;
};

// 根据groupType校验组件
const verifyComponentByGroupType = (groupType: any, taegetCompoent: any, parentId: any) => {
    if (parentId === 'draw') {
        if (groupType === 'basic' || groupType === 'biz') {
            return false;
        }
    } else {
        const { componentName: targetComponentName } = taegetCompoent;
        const targetTools = getComponents()[targetComponentName].tools.getTools();
        const targetGroupType = targetTools.groupType;
        if ((groupType === 'basic' || groupType === 'biz') && targetGroupType !== 'container') {
            return false;
        }
    }
    return true;
};

// 全局唯一
const checkOnly = (pageJson: any, componentName: string) => {
    if (ONLYCOMPONENT.includes(componentName) && findComponent(componentName, pageJson, 'componentName')) {
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
