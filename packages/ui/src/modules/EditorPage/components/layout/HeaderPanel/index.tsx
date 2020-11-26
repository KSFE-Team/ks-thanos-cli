import React from 'react';
import { EnterOutlined } from '@ant-design/icons';
// import { actions } from 'kredux';
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

const { confirm } = Modal;

export default () => {
    const page = useSelector((store: any) => store.page);
    const { pageJson } = page;
    const handleSubmit = async (pageOrTemp: string) => {
        const { components, pageName, paramKey } = pageJson;
        console.log(components[0], 'components');
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
                // console.log(componentsData, 'componentsData----发布后的数据');
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

    return (
        <div className="thanos-editor-header">
            <Button
                className="thanos-editor-back"
                onClick={() => {
                    goto.push('/workspace/blocks/existingPage');
                }}
            >
                <EnterOutlined />
            </Button>
            <Logo className="thanos-editor-logo" />
            <div className="thanos-editor-actions">
                {/* <Button title="undo" disabled>
                    <RollbackOutlined />
                </Button>
                <Button title="redo">
                    <RollbackOutlined
                        style={{
                            transform: 'scaleX(-1)',
                        }}
                    />
                </Button> */}
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
