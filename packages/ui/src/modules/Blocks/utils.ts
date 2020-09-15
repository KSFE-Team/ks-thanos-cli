import { actions } from 'kredux';
import { ALL_TOOLS } from './materials';
import html2canvas from 'html2canvas';

export { default as request } from 'Src/utils/request';

/**
 * 提交校验 - 是否信息都已填完整
 * type 类型
 * data 要校验的数据源
 * field 要校验的字段
 */

interface checkFieldDataResult {
    error: boolean;
    message: string;
}
// 通用校验
const FIELD_ARR = ['key', 'label'];
// Form
const FORM_FIELD = ['stateName', 'type', 'saveApi', 'updateApi', 'getApi', 'paramKey'];
// Select
const SELECT_FIELD = ['label', 'value'];
// Radio Checkbox
const RADIO_CHECKBOX_FIELD = ['text', 'value'];
// BizSelectModal
const BIZ_FIELD = ['key', 'label', 'type'];
// Table
const TABLE_FIELD = {
    config: [
        'dependencies',
        'stateName',
    ],
    dataSource: [
        'dataKey',
        'tableName'
    ]
};

export function checkFieldData(type: string, data: any, source?: string): checkFieldDataResult {
    let tempArr = [];
    switch (type) {
        case 'Form':
            if (data.type === 'normal') {
                return {
                    error: checkCommonFn(data, FORM_FIELD),
                    message: 'Form'
                };
            } else if (data.type === 'search') {
                return {
                    error: !data.stateName,
                    message: 'Form'
                };
            }
        case 'Input':
            return {
                error: checkCommonFn(data, FIELD_ARR),
                message: 'Input'
            };
        case 'Select':
            tempArr = data.options.map((item: any) => {
                return {
                    value: item.props.value,
                    label: item.label
                };
            });
            return {
                error: checkCommonFn(data, FIELD_ARR) || checkArrayCommonFn(tempArr, SELECT_FIELD),
                message: 'Select'
            };
        case 'DatePicker':
            return {
                error: checkCommonFn(data, FIELD_ARR),
                message: 'DatePicker'
            };
        case 'InputNumber':
            return {
                error: checkCommonFn(data, FIELD_ARR),
                message: 'InputNumber'
            };
        case 'RangePicker':
            return {
                error: checkCommonFn(data, FIELD_ARR),
                message: 'RangePicker'
            };
        case 'Textarea':
            return {
                error: checkCommonFn(data, FIELD_ARR),
                message: 'Textarea'
            };
        case 'Radio':
            return {
                error: checkCommonFn(data, FIELD_ARR) || checkArrayCommonFn(data.options, RADIO_CHECKBOX_FIELD),
                message: 'Radio'
            };
        case 'Checkbox':
            tempArr = data.options.map((item: any) => {
                return {
                    text: item.text,
                    value: item.props.value
                };
            });
            return {
                error: checkCommonFn(data, FIELD_ARR) || checkArrayCommonFn(tempArr, RADIO_CHECKBOX_FIELD),
                message: 'Checkbox'
            };
        case 'BizSelectModal':
            return {
                error: checkCommonFn(source ? { ...data, type: data.props.type } : data, BIZ_FIELD),
                message: 'BizSelectModal'
            };
        case 'Table':
            if (source) {
                tempArr = data.props.columns.map((item: any) => {
                    return {
                        dataKey: item.dataIndex,
                        tableName: item.title
                    };
                });
            } else {
                tempArr = data.dataSource;
            }
            return {
                error: checkCommonFn(data, TABLE_FIELD.config) || checkArrayCommonFn(tempArr, TABLE_FIELD.dataSource),
                message: 'Table'
            };
    }
    return {
        error: false,
        message: ''
    };
};

function checkCommonFn(data: any, field: any) {
    // let flag = false;
    return field.some((validateKey: string) => !data[validateKey]);
    // Object.keys(data).forEach(() => {
    //     field.find((key: any) => {
    //         if (!data[key]) {
    //             flag = true;
    //             return true;
    //         }
    //     });
    // });
    // return flag;
};

function checkArrayCommonFn(data: any, field: any) {
    let flag = false;
    if (data.length > 0) {
        data.forEach((item: any) => {
            field.find((key: any) => {
                if (!item[key] && item[key] !== 0) {
                    flag = true;
                    return true;
                }
            });
        });
    } else {
        flag = true;
    }
    return flag;
}

// 生成随机码
export const getUniqueID = () => {
    return Math.random().toString(36).substring(2);
};

/**
 * 数组转化 树形数组
 *
 * @typedef {Object} attrParams
 * @property {number} rootId Top parentId
 * @property {string} id 当前Id
 * @property {string} parentId 父级Id
 *
 * @param {Array} 转化的数组
 * @type {attrParams}
 * @return {Array}  返回树形数组
 */
export function toTreeData(data: any, {
    id,
    parentId,
    rootId
}: any) {
    const resData: any[] = [...data]; const tree: any[] = [];
    function run(chiArr: any[]) {
        if (resData.length !== 0) {
            for (let i = 0; i < chiArr.length; i++) {
                for (let j = 0; j < resData.length; j++) {
                    if (chiArr[i][id] === resData[j][parentId]) {
                        chiArr[i].children = chiArr[i].children || [];
                        chiArr[i].children.push(resData[j]);
                        resData.splice(j, 1);
                        j--;
                    }
                }
                if (chiArr[i].children) {
                    run(chiArr[i].children);
                }
            }
        }
    }

    for (let i = 0; i < resData.length; i++) {
        if (resData[i][parentId] === rootId) {
            tree.push(resData[i]);
            resData.splice(i, 1);
            i--;
        } else if (data.every((res: any) => res[id] !== resData[i][parentId])) {
            tree.push(resData[i]);
            resData.splice(i, 1);
            i--;
        }
    }
    run(tree);
    return tree;
};

/**
 * 修改配置显隐藏
 */
export const changeConfig = (id: string, components: any[], visible: boolean) => {
    return components.map((item) => {
        item = {
            ...item,
            configVisible: id === item.id ? visible : false
        };
        if (item.components) {
            item.components = changeConfig(id, item.components, visible);
        }
        return item;
    });
};

/**
 * 找到当前显示的
 * @param components
 */
export const findComponent = (components: any[]) => {
    let result: any;
    components.forEach((item: any) => {
        if (!result) {
            if (item.configVisible) {
                // if (item.components) {
                //     result = findComponent(item.components);
                // } else {
                //     result = item;
                // }
                result = item;
            } else if (item.components) {
                const tempResult = findComponent(item.components);
                if (tempResult) {
                    result = tempResult;
                }
            }
        }
    });
    return result;
};

/**
 * 找到当前的组件并且更改配置
 */
export const saveComponent = (targetId: string, components: any[], config: any) => {
    return components.map((item) => {
        const { id: currentId, components: children } = item;
        if (currentId === targetId) {
            item = {
                ...item,
                ...config
            };
        } else if (children && children.length) {
            item.components = saveComponent(targetId, children, config);
        }
        return item;
    });
};

/**
 * 匹配当前路由
 */
export const matchRouter = (path: string, routerList: any[]) => {
    const currentPath = path;
    return routerList.find(({ path }) => path === currentPath) || {};
};

/**
 * 获取组件配置
 * @param components Object
 */
export const getTools = (components: any) => {
    return Object.keys(components).map((key) => components[key].getTools());
};

/**
 * 块域中插入组件
 */
export const insertComponents = (payload: any, components: any[] = []) => {
    if (!payload.targetId || !components.length) {
        return;
    }
    let item,
        hadInsert: boolean = false;
    for (item of components) {
        if (hadInsert) {
            break;
        }
        if (payload.targetId === item.id) {
            item.components = [
                ...item.components || [],
                {
                    id: getUniqueID(),
                    ...payload.insertComponent
                }
            ];
            hadInsert = true;
        } else {
            insertComponents(payload, item.components);
        }
    }
};

/**
 * 获取同级区域块
 */
export const getFragments = (targetId: string, components: any[] = []) => {
    if (!targetId || !components.length) {
        return [];
    }
    let fragments: any[] = [],
        item;
    for (item of components) {
        if (fragments && fragments.length) {
            return fragments;
        }
        const { id: currentId, components: children } = item;
        if (currentId === targetId) {
            fragments = components.filter((it) => it.componentName === 'Fragment');
        } else if (children && children.length) {
            fragments = getFragments(targetId, children);
        }
    }
    return fragments;
};

/**
 * 通过 fragmentId 获取被关联区域块
 */
export const getCorrelationFragment = (targetId: string, components: any[] = [], fragmentId: string) => {
    const fragments = getFragments(targetId, components);
    return fragments.find((item) => fragmentId === item.id);
};

/**
 * 修改被关联区域块的属性值
 */
export const modifyCorrelationFragment = (components: any[] = [], stateName: string, type: string) => {
    components.forEach((item) => {
        item.stateName = stateName;
        item.formType = type;
        if (item.componentName === 'Fragment') {
            modifyCorrelationFragment(item.components, stateName, type);
        }
        // 单选关联区域块
        if (item.componentName === 'Radio') {
            let fragment;
            // 循环 Radio 的 Option
            item.options.forEach((option: any) => {
                // 如果 Option 关联了区域块
                if (option.fragmentId) {
                    // 找的被关联的同级区域块
                    fragment = getCorrelationFragment(item.id, components, option.fragmentId);
                    // 如果有的话，则给该区域块添加两个属性
                    if (fragment) {
                        fragment.showKey = item.key;
                        fragment.showValue = option.value;
                    }
                }
            });
        }
        // 多选关联区域块
        if (item.componentName === 'Checkbox') {
            // let fragment;
            // // 循环 Radio 的 Option
            // item.options.forEach((option) => {
            //     // 如果 Option 关联了区域块
            //     if (option.fragmentId) {
            //         // 找的被关联的同级区域块
            //         fragment = getCorrelationFragment(item.id, components, option.fragmentId);
            //         // 如果有的话，则给该区域块添加两个属性
            //         if (fragment) {
            //             fragment.showKey = item.key;
            //             fragment.showValue = option.value;
            //         }
            //     }
            // });
        }
    });
};

/* 灭霸水印 */
const WATERMARK = '灭霸预览图';
/* 截图+水印 */
export const getScreenShotByCanvas = async() => {
    /* 获取截屏 */
    const container: HTMLElement = document.querySelector('.thanos-generate-page-container') || document.body;
    const canvas = await html2canvas(container);
    const ctx: any = canvas.getContext('2d');
    ctx.save();
    ctx.translate(canvas.width / 4, canvas.height / 4);
    ctx.rotate(-(30 * Math.PI / 180));
    ctx.globalAlpha = 0.05;
    ctx.font = '100px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(WATERMARK, 0, 50);
    ctx.restore();
    return canvas.toDataURL('image/jpeg', 0.5);
};

// TODO
/**
 * 获取层级数组的索引
 */
export const getComponents = (components: any, id: any = '') => {
    let nodeArray:Array<any> = [];
    if (id) {
        nodeArray = components.map((item: any) => {
            if (item.id === id) {
                const pageJSON = ALL_TOOLS[item.componentName].getInitJson();
                for (const key in pageJSON) {
                    if (item.componentName === 'Table' && key === 'tableType') {
                        if (item.tableType === 2 || item.tableType === 3) {
                            item.tableType = item[key];
                        }
                    } else {
                        item[key] = pageJSON[key];
                    }
                }
            } else {
                if (item.components && item.components.length) {
                    getComponents(item.components, id);
                }
            }
            return item;
        });
    } else {
        nodeArray = components.map((item: any) => {
            const pageJSON = ALL_TOOLS[item.componentName].getInitJson();
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
                getComponents(item.components);
            }
            return item;
        });
    }

    return nodeArray;
};

/**
 * 清除数据
 * @param route
 */
export const clearData = (that: any, initState: any, type: any = '') => {
    const id = that.state.current.id; // 当前操作的组件id
    const components = that.props.pageJSON.components; // 页面里的所有组件：数组
    const newComponents = getComponents(components, id);
    actions.generatePage.setReducers({
        pageJSON: {
            components: newComponents
        }
    });
    if (type === 'InputNumber' || type === 'Select' || type === 'RangePicker') {
        that.props.form.resetFields();
    }
    that.setState({...initState, isClear: true});
};

/**
 * 清空所有配置
 */
export const clearAllData = (components: any) => {
    const newComponents = getComponents(components);
    actions.generatePage.setReducers({
        pageJSON: {
            components: newComponents
        }
    });
};
