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
        newPageData = addComponent(parentId, newComponent, endIndex, oldPageData);
    } else if (startIndex) {
        newPageData = dragComponent(id, startIndex, endIndex, oldPageData);
    } else if (newComponent) {
        // 修改组件(组件ID，组件数据，页面json数据)
        newPageData = changeComponent(id, newComponent, oldPageData);
    } else {
        // 删除组件(组件id,页面json数据)
        newPageData = deleteComponent(id, oldPageData);
    }
    return newPageData;
};
// 添加组件
const addComponent = (parentId: any, newComponent: any, endIndex: any, oldPageData: any[]) => {
    // eslint-disable-next-line array-callback-return
    return oldPageData.map((item: { id: any; components: any }, index: string | number) => {
        const { id: currentId, components: children } = item;
        if (currentId === parentId) {
            children.splice(endIndex, 0, newComponent);
        } else if (children && children.length) {
            addComponent(currentId, newComponent, endIndex, children);
        }
    });
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
            const [removed] = oldPageData.splice(startIndex, 1);
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
