/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Input',
    source: 'antd',
    default: false,
    key: '',
    label: '',
    // isRequired: ISREQUIRED_TYPE[0].VALUE,
    defaultValue: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Input',
    icon: 'edit',
    componentName: 'Input',
});

interface CheckTypes {
    key: string;
    name: string;
    componentName: string;
}

/* 检查属性 */
const checkFields = (config: any, keys: CheckTypes[]) =>
    new Promise((resolve, reject) => {
        keys.forEach(({ key, name, componentName }) => {
            if (!config[key]) {
                resolve(`${componentName}请填写${name}`);
            }
        });
        resolve();
    });

/* 检查基础 key、label属性 */
const baseValidator = (config: any) =>
    checkFields(config, [
        {
            key: 'label',
            name: '表单展示字段',
            componentName: config.componentName,
        },
        {
            key: 'key',
            name: '表单绑定字段',
            componentName: config.componentName,
        },
    ]);

export const validator = (config: any) => baseValidator(config);
