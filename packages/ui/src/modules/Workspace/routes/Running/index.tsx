import React, { ReactNode, useEffect } from 'react';
import { Button, Badge, message, Modal, Spin } from 'antd';
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { FitAddon } from 'xterm-addon-fit';
import { actions } from 'kredux';
import terminal from 'Src/components/Terminal';
import { ModelTransfer } from 'Src/modules/thanos-ast/modelTransfer';
import ThanosModal from '../../component/ThanosModal';
import { PROJECT_PROCESS_TYPE } from './constants';
import './style.scss';

const code = `
import request from 'Src/utils/request';
import { actions } from 'kredux';
import { API } from 'Src/api';
export const STATE = { // 曾阿牛测试
    test: {
        name: '',
        page: 1,
        limit: 10,
        total: 0
    },
    list: []
};

export default {
    namespace: 'searchFormTest',

    initialState: { ...STATE },

    effects: {
        async loadSearchFormTestList(payload, getState) {
            try {
                const state = getState().searchFormTest.test;

                let postData = {
                    pageSize: state.limit,
                    pageNo: state.page,
                    name: state.name && state.name.value
                };

                const response = await request(API.searchFormTest.query, {
                    method: 'get',
                    body: postData
                });

                if (response && response.code === 0) {
                    actions.searchFormTest.setReducers({
                        test: {
                            ...state,
                            total: response.data.totalCount
                        },
                        list: response.data.list
                    });
                }
            } catch (error) {
                actions.login.commonError(error);
            }
        }
    }
};
`;
const mergeCode = `
import request from 'Src/utils/request';
import { message } from 'antd';
import { actions } from 'kredux';
import { API } from 'Src/api';
export const STATE = {
    info: {
        name: '曾猫测试'
    }
};

export default {
    namespace: 'normalFormTest',

    initialState: { ...STATE },

    effects: {
        async loadNormalFormTestItem(payload) {
            try {
                const response = await request(API.normalFormTest.get, {
                    method: 'get',
                    body: payload
                });

                if (response && response.code === 0) {
                    actions.normalFormTest.setReducers({
                        info: response.data
                    });
                }
            } catch (error) {
                actions.login.commonError(error);
            }
        },

        async createNormalFormTestItem(payload) {
            try {
                const response = await request(API.normalFormTest.save, {
                    method: 'post',
                    body: payload
                });
                if (response && response.code === 0) {
                    message.success('新增成功！');
                }
            } catch (error) {
                actions.login.commonError(error);
            }
        },
        async updateNormalFormTestItem(payload) {
            try {
                const response = await request(API.normalFormTest.update, {
                    method: 'post',
                    body: payload
                });
                if (response && response.code === 0) {
                    message.success('修改成功！');
                }
            } catch (error) {
                actions.login.commonError(error);
            }
        }
    }
};
`;

const { confirm: Confirm } = Modal;
const [{ key: NOT_RUN }, { key: RUNNING }, { key: FINISH }, { key: FAIL }] = PROJECT_PROCESS_TYPE;

export default () => {
    const { workspace, loading } = useSelector((store: any) => ({
        workspace: store.workspace,
        loading: store.loading.effects['workspace/thanosSync'] || false,
    }));
    // thanosLoading
    const { currentProject, thanosGeneratorLoading, thanosModalVisible, projectConfig, cwd } = workspace;
    const { openUrl } = projectConfig;
    useEffect(() => {
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(document.querySelector('#terminal'));
        fitAddon.fit();
        actions.workspace.getProjectProcess();
        actions.workspace.getProjectConfig();
    }, []);

    /**
     * 测试AST
     */
    const astTest = () => {
        const sourceAst = new ModelTransfer(code);
        console.log('astData', sourceAst.astData);
        const targetAst = new ModelTransfer(mergeCode);

        // 合并STATE
        sourceAst.combineStateNodes(sourceAst, targetAst);

        // 合并effects
        sourceAst.combineEffectsNodes(sourceAst, targetAst);

        // 处理import
        sourceAst.combineImportNodes(sourceAst, targetAst);

        // 校验namespace
        const isSameNamespace = sourceAst.checkNamespace(sourceAst, targetAst);
        console.log('isSameNamespace', isSameNamespace);
        // console.log('toJS', sourceAst.toJS());
    };
    astTest();

    const handleStart = () => {
        actions.workspace.runNpmCommand('start');
    };

    const handleStop = () => {
        actions.workspace.runNpmCommand('stop');
    };

    const handleClear = () => {
        actions.workspace.clear();
    };

    const handleThanos = () => {
        actions.global.setReducers({
            currentPath: `${currentProject.path}/src/pages`,
        });
        actions.workspace.setReducers({
            thanosModalVisible: true,
        });
    };
    const handleSyncNginx = () => {
        Confirm({
            title: '同步nginx配置',
            icon: <ExclamationCircleOutlined />,
            content: '同步线上配置到本地，并帮您自动重启，确认？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                actions.workspace.thanosSync({
                    cwd,
                    cmd: 'mn',
                    args: '',
                    callback: () => {
                        message.success('同步nginx配置并重启成功');
                    },
                });
            },
        });
    };

    /**
     * 获取操作
     */
    const getActions = () => {
        const { projectProcess } = workspace;
        const { status = NOT_RUN } = projectProcess;
        let actionBtns: {
            type?: 'text' | 'link' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
            text: string;
            props?: {
                [key: string]: any;
            };
            onClick(): void;
        }[] = [];
        let badge: {
            status: 'success' | 'processing' | 'error' | 'default' | 'warning' | undefined;
            text: string | ReactNode;
        } = {
            status: undefined,
            text: '',
        };
        switch (status) {
            case NOT_RUN:
                badge = {
                    status: 'default',
                    text: '待运行',
                };
                actionBtns = [
                    {
                        type: 'primary',
                        onClick: handleStart,
                        text: '启动',
                    },
                ];
                break;
            case FAIL:
                badge = {
                    status: 'error',
                    text: '运行失败',
                };
                actionBtns = [
                    {
                        type: 'primary',
                        onClick: handleStart,
                        text: '启动',
                    },
                ];
                break;
            case RUNNING:
                badge = {
                    status: 'processing',
                    text: (
                        <span className="workspace-running-badge-processing">
                            运行中
                            <span className="workspace-running-badge-processing-loading1">.</span>
                            <span className="workspace-running-badge-processing-loading2">.</span>
                            <span className="workspace-running-badge-processing-loading3">.</span>
                        </span>
                    ),
                };
                actionBtns = [
                    {
                        type: 'primary',
                        onClick: handleStop,
                        text: '停止',
                        props: {
                            danger: true,
                        },
                    },
                ];
                break;
            case FINISH:
                badge = {
                    status: 'success',
                    text: (
                        <span>
                            运行成功
                            <Button
                                type="link"
                                className="workspace-running-text-link"
                                onClick={() => {
                                    window.open(openUrl);
                                }}
                            >
                                {openUrl}
                            </Button>
                        </span>
                    ),
                };
                actionBtns = [
                    {
                        type: 'primary',
                        onClick: handleStop,
                        text: '停止',
                        props: {
                            danger: true,
                        },
                    },
                ];
                break;
            default:
        }
        actionBtns = [
            ...actionBtns,
            {
                onClick: handleClear,
                text: '清空日志',
            },
            {
                onClick: handleThanos,
                text: '灭霸',
            },
            {
                onClick: handleSyncNginx,
                text: '同步nginx',
            },
        ];
        return (
            <Spin spinning={loading}>
                {actionBtns.map(({ type, onClick, text, props = {} }, idx) => {
                    return (
                        <Button className="mar-l-4" type={type} key={`${idx}_${type}`} onClick={onClick} {...props}>
                            {text}
                        </Button>
                    );
                })}
                <span className="workspace-running-badge">
                    <Badge status={badge.status} /> {badge.text}
                </span>
            </Spin>
        );
    };

    const getGeneratorLoading = () => {
        if (thanosGeneratorLoading) {
            return (
                <span className="workspace-running-generator-loading">
                    代码生成中 <LoadingOutlined className="mar-l-4" />
                </span>
            );
        }
        return null;
    };

    return (
        <div className="workspace-running-container">
            <div className="workspace-running-tools">
                {getActions()}
                {getGeneratorLoading()}
            </div>
            <div id="terminal" />
            {thanosModalVisible && <ThanosModal />}
        </div>
    );
};
