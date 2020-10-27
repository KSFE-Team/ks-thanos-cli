import { getApp } from 'Src/app';
import { getComponents } from './constants';
/**
 * 视图区数据渲染
 */

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
