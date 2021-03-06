import request from 'Src/utils/requestExtend';
import { API } from 'Src/api';
import { getApp } from 'Src/app';
import { actions } from 'kredux';
import { message, Modal } from 'antd';
import { goto } from 'Src/utils';
import { getComponents } from './utils/constants';

export const STATE = {
    selectedId: '',
    pageJson: {
        pageName: '',
        paramKey: '',
        components: [],
    },
    editorInitComponents: [],
    editorInitFormConfig: {},
    editorInitPage: {},
    undoStack: [],
    redoStack: [],
};

export default {
    namespace: 'page',
    initialState: STATE,
    effects: {
        save: async (payload: any) => {
            const { pageOrTemp, postDate } = payload;
            try {
                const response = await request(API[pageOrTemp].addOrUpdate, {
                    method: 'post',
                    body: {
                        ...postDate,
                    },
                });
                if (response && response.errcode === 0) {
                    const text = postDate.id ? '修改' : '新增';
                    if (pageOrTemp === 'template') {
                        message.success(`${text}模板配置成功`);
                        Modal.confirm({
                            title: '是否前往模板列表查看',
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => {
                                goto.push('/workspace/blocks/tempLateMgt');
                            },
                        });
                    } else {
                        message.success(`${text}页面配置成功`);
                        goto.go(-1);
                    }
                }
            } catch (err) {
                message.error(err);
            }
        },
        /**
         * 获取模版
         */
        getTemplateItem: async (payload: any) => {
            const { pageOrTemp, pageName } = payload;
            const response = await request(API[pageOrTemp].get, {
                method: 'GET',
                body: {
                    [`${pageOrTemp}Name`]: pageName,
                },
            });
            if (response && !response.errcode) {
                const { result } = response;
                const { components, paramKey } = JSON.parse(result[`${pageOrTemp}Data`]);
                actions.page.setReducers({
                    pageJson: {
                        pageName: pageOrTemp === 'page' ? result[`${pageOrTemp}Name`] : '',
                        paramKey: result.paramKey || paramKey,
                        components:
                            components[0].componentName === 'RelationTable' ? components[0].components : components,
                    },
                    editorInitComponents: JSON.parse(JSON.stringify(components)),
                    editorInitPage: {
                        pageName: pageOrTemp === 'page' ? result[`${pageOrTemp}Name`] : '',
                        paramKey: result.paramKey || paramKey,
                    },
                });
                actions.page.setItemProperty(JSON.parse(result[`${pageOrTemp}Data`]));
            }
        },

        /**
         * 设置组件配置属性
         */
        setItemProperty: (payload: any) => {
            const { components } = payload;
            const allComponents = getComponents();
            components.forEach((item: any) => {
                const { id, components: children, componentName } = item;
                const { reCode } = allComponents[componentName].tools;
                let result = item;
                if (reCode) {
                    result = reCode(item);
                }
                actions[id].setReducers(result);
                // eslint-disable-next-line no-underscore-dangle
                const init = getApp()._store.getState().page.editorInitFormConfig;
                actions.page.setReducers({
                    editorInitFormConfig: Object.assign(init, { [id]: result }),
                });
                if (children && children.length > 0) {
                    actions.page.setItemProperty(item);
                }
            });
        },
    },
};
