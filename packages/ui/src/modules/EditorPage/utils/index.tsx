import { getApp } from 'Src/app';
import { getComponents } from './constants';
import uuid from 'uuid/v4';
/**
 * 处理渲染数据
 */
export const handlePageJson = (source, destination, draggableId, droppableSource, droppableDestination) => {
    switch (droppableSource.droppableId) {
        // 排序
        case droppableDestination.droppableId:
            const list = destination.components;
            const startIndex = droppableSource.index;
            const endIndex = droppableDestination.index;
            dragComponent(list, startIndex, endIndex);
            break;
        // 添加
        case 'ITEMS':
            addComponent(source, destination, draggableId, droppableSource, droppableDestination);
            break;
        default:
            break;
    }
}

//查找源组件
const findComponent = (componentList: any[], id: any) => {
    let component;
    componentList.map(item => {
        const { components: componentArr } = item;
        component = componentArr.filter((item: { id: any; }) => item.id === id)
    })
    return component[0];
}

// 添加组件
export const addComponent = (source, destination, draggableId, droppableSource, droppableDestination) => {
    let item = findComponent(source, draggableId);
    destination.components.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destination;
};

// 拖拽排序
export const dragComponent = (list, startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list;
};

// 修改组件
export const changeComponent = (id: any, newComponent: any, oldPageData: any[]) => {
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
export const deleteComponent = (id: any, oldPageData: any[]) => {
    for (let item in oldPageData) {
        if (oldPageData[item].id === id) {
            oldPageData.splice(item, 1);
            return oldPageData;
        }
        else {
            if (oldPageData[item].hasOwnProperty('components') && oldPageData[item].components.length != 0) {
                let m = JSON.parse(JSON.stringify(oldPageData[item].components));
                deleteComponent(id, m);
            }
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
