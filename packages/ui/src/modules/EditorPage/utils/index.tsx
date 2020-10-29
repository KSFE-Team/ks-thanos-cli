import { getApp } from 'Src/app';
import { getComponents } from './constants';
/**
 * 处理渲染数据
 */
export const handlePageJson = (params: {
    [x: string]: any;
    id: any;
    newComponent: any;
    oldPageData: any;
    parentId?: any;
    startIndex?: any;
    endIndex?: any;
}) => {
    const { id, parentId, newComponent, oldPageData, startIndex, endIndex } = params;
    let newPageData = oldPageData;
    if (parentId) {
        console.log('新增了')
        newPageData = addComponent(parentId, newComponent, endIndex, oldPageData);
    } else if (startIndex) {
        console.log('排序了')
        newPageData = dragComponent(id, startIndex, endIndex, oldPageData);
    } else if (newComponent) {
        console.log('修改了')
        // 修改组件(组件ID，组件数据，页面json数据)
        newPageData = changeComponent(id, newComponent, oldPageData);
    } else {
        console.log('删除了')
        // 删除组件(组件id,页面json数据)
        newPageData = deleteComponent(id, oldPageData);
    }
    return newPageData;
};
// 添加组件
export const addComponent = (parentId: any, newComponent: any, endIndex: any, oldPageData: any[]) => {
    // eslint-disable-next-line array-callback-return
    console.log(parentId, newComponent, endIndex, oldPageData);
    switch (parentId) {
        case 'draw':
            oldPageData.components.splice(endIndex, 0, newComponent);
            return oldPageData;
        default:
            console.log('222222')
            return oldPageData.map((item: { id: any; components: any }, index: string | number) => {
                const { id: currentId, components: children } = item;
                if (currentId === parentId) {
                    children.splice(endIndex, 0, newComponent);
                } else if (children && children.length) {
                    addComponent(currentId, newComponent, endIndex, children);
                }
            });
    }
};

// 拖拽组件
const dragComponent = (
    id: any,
    startIndex: any,
    endIndex: any,
    oldPageData: {
        map: (arg0: (item: any, index: any) => void) => any;
        splice: (arg0: any, arg1: number, arg2: undefined) => [any];
    },
) => {
    // eslint-disable-next-line array-callback-return
    return oldPageData.map((item: { id: any; components: any }, index: any) => {
        const { id: currentId, components: children } = item;
        if (id === currentId) {
            // 删除并记录 删除元素
            const [removed] = oldPageData.splice(startIndex, 1, undefined);
            // 将原来的元素添加进数组
            oldPageData.splice(endIndex, 0, removed);
        } else if (children && children.length) {
            dragComponent(id, startIndex, endIndex, children);
        }
    });
};

// 修改组件
const changeComponent = (id: any, newComponent: any, oldPageData: any[]) => {
    // eslint-disable-next-line array-callback-return
    return oldPageData.map((item: { id: any; components: any }, index: string | number) => {
        const { id: currentId, components: children } = item;
        if (currentId === id) {
            // eslint-disable-next-line no-param-reassign
            oldPageData[index] = newComponent;
        } else if (children && children.length) {
            changeComponent(id, newComponent, children);
        }
    });
};

// 删除组件
const deleteComponent = (id: any, oldPageData: any[]) => {
    return oldPageData.filter((item: { id: any; components: any }) => {
        if (id === item.id) {
            return false;
        }
        if (item.components) {
            // eslint-disable-next-line no-param-reassign
            item.components = deleteComponent(id, item.components);
        }
        return true;
    });
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
