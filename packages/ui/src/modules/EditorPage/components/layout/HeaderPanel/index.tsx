import React from 'react';
import { EnterOutlined, RollbackOutlined } from '@ant-design/icons';
import { actions } from 'kredux';
import { message, Modal } from 'antd';
import { useSelector } from 'react-redux';
import Logo from 'Src/components/Logo';
import Button from 'Src/components/Button';
import { parse } from 'qs';
import { goto } from 'Src/utils';
import {
    getValidator,
    clearAllData,
    getComponent,
    getScreenShotByCanvas,
    findParamKey,
    getPageData,
} from '../../../utils';
import { getComponents } from '../../../utils/constants';

const { confirm } = Modal;

export default () => {
    const page = useSelector((store: any) => store.page);
    const { pageJson, undoStack, redoStack } = page;

    const handleSubmit = async (pageOrTemp: string) => {
        const { components, pageName, paramKey } = pageJson;
        if (!pageName) {
            message.error('请填写页面名称');
            return;
        }
        /* 获取截屏 */
        const screenshotSrc: string = await getScreenShotByCanvas();
        if (pageOrTemp === 'page') {
            getValidator(components)
                .then(() => {
                    handleConfirm(pageOrTemp, components, pageName, paramKey, screenshotSrc);
                })
                .catch((err) => {
                    console.log('err', err);
                    message.error(err.message);
                });
        } else {
            handleConfirm(pageOrTemp, components, pageName, paramKey, screenshotSrc);
        }
    };

    const handleConfirm = (
        pageOrTemp: string,
        components: any[],
        pageName: string,
        paramKey: string,
        screenshotSrc: any,
    ) => {
        const pageOrTempText = pageOrTemp === 'page' ? '页面' : '模版';
        const queryString = parse(window.location.search.replace(/\?/g, ''));
        confirm({
            title: `确认提交${pageOrTempText}的所写配置吗？`,
            onOk: async () => {
                const componentsData =
                    pageOrTemp === 'page'
                        ? getPageData(components, pageJson)
                        : getComponent(JSON.parse(JSON.stringify(components)));
                let id: number;
                if (queryString.pageOrTemp === 'page' && pageOrTemp === 'template') {
                    id = 0;
                } else {
                    id = Number(queryString.id || 0);
                }
                actions.page.save({
                    postDate: {
                        [`${pageOrTemp}Data`]: JSON.stringify({
                            components: componentsData,
                            paramKey: findParamKey(components),
                        }),
                        [`${pageOrTemp}Name`]: pageName,
                        paramKey,
                        id,
                        img: screenshotSrc,
                    },
                    pageOrTemp,
                });
            },
        });
    };
    /**
     * 清空全部配置
     */
    const clearData = () => {
        confirm({
            title: '清空全部配置',
            content: '确认是否清空全部配置，谨慎操作',
            onOk: () => {
                actions.page.setReducers({
                    pageJson: {
                        ...pageJson,
                        pageName: '',
                        paramKey: '',
                    },
                });
                clearAllData(pageJson.components);
            },
        });
    };

    const undo = () => {
        const copyUndoStack = JSON.parse(JSON.stringify(undoStack));
        undoStack.pop();
        const undoItem = copyUndoStack.pop();
        const currentItem = undoStack[undoStack.length - 1];
        const redoItem = undoItem;
        redoStack.push(redoItem);
        if ((undoStack.length > 0 && currentItem.type === 'tree') || undoStack.length === 0) {
            if (undoItem.type === 'property') {
                const { id, componentName } = undoItem;
                const initJson = getComponents()[componentName].tools.getInitJson();
                actions[id].setReducers(initJson);
            } else {
                actions.page.setReducers({
                    pageJson: { ...pageJson, components: undoStack.length > 0 ? currentItem.components : [] },
                });
            }
        } else if (currentItem.type === 'property') {
            if (undoItem.type === 'tree') {
                const result = undoStack.filter((item: any) => item.type === 'tree');
                actions.page.setReducers({
                    pageJson: {
                        ...pageJson,
                        components: result.length > 0 ? result[result.length - 1].components : [],
                    },
                });
            } else {
                const { id, formConfig } = currentItem;
                actions[id].setReducers(formConfig);
            }
        }
        actions.page.setReducers({
            redoStack,
        });
    };

    const redo = () => {
        const copyRedoStack = JSON.parse(JSON.stringify(redoStack));
        const redoItem = copyRedoStack.pop();
        const currentItem = redoStack[redoStack.length - 1];
        const undoItem = redoItem;
        undoStack.push(undoItem);
        if ((redoStack.length > 0 && currentItem.type === 'tree') || redoStack.length === 0) {
            actions.page.setReducers({
                pageJson: { ...pageJson, components: redoStack.length > 0 ? currentItem.components : [] },
            });
        } else if (currentItem.type === 'property') {
            const { id, formConfig } = currentItem;
            actions[id].setReducers(formConfig);
        }
        redoStack.pop();
        actions.page.setReducers({
            undoStack,
        });
    };

    // eslint-disable-next-line no-return-assign
    return (
        <div className="thanos-editor-header">
            <Button
                title="返回"
                className="thanos-editor-back"
                onClick={() => {
                    goto.push('/workspace/blocks/existingPage');
                }}
            >
                <EnterOutlined />
            </Button>
            <Logo className="thanos-editor-logo" />
            <div className="thanos-editor-actions">
                <Button
                    title="undo"
                    onClick={() => undo()}
                    className="thanos-editor-undo"
                    disabled={undoStack.length < 1}
                >
                    <RollbackOutlined />
                </Button>
                <Button
                    title="redo"
                    onClick={() => redo()}
                    className="thanos-editor-redo"
                    disabled={redoStack.length < 1}
                >
                    <RollbackOutlined
                        style={{
                            transform: 'scaleX(-1)',
                        }}
                    />
                </Button>
                <Button
                    className="thanos-editor-primary mar-l-4"
                    onClick={() => {
                        clearData();
                    }}
                >
                    清空全部配置
                </Button>
                <Button className="thanos-editor-primary mar-l-4" onClick={() => handleSubmit('template')}>
                    生成模板
                </Button>
                <Button
                    title="发布"
                    className="thanos-editor-primary mar-l-4"
                    onClick={() => {
                        handleSubmit('page');
                    }}
                >
                    发布
                    {/* <SaveOutlined /> */}
                </Button>
            </div>
        </div>
    );
};
