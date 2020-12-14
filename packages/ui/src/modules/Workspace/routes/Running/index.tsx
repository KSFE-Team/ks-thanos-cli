import React, { ReactNode, useEffect } from 'react';
import { Button, Badge, message, Modal, Spin } from 'antd';
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { FitAddon } from 'xterm-addon-fit';
import { actions } from 'kredux';
import terminal from 'Src/components/Terminal';
import { ApiTransfer } from 'Src/modules/thanos-ast/apiTransfer';
import ThanosModal from '../../component/ThanosModal';
import { PROJECT_PROCESS_TYPE } from './constants';
import './style.scss';

const code = `
import API_JSON from './apiData.json';
export const Origin = window.location.origin;
export const server = Origin + '/jinwu-server'; // ENV=dev
export const systemServer = Origin + '/system-server';
export const scrmServer = Origin + '/scrm-server';
export const baiguiServer = Origin + '/baigui-server';
export const questionServer = Origin + '/question-server';

/**
 *合并API
 */
export const composeApi = (prevServer, API) => {
    return Object.keys(API).reduce((prev, componentName) => {
        const componentApi = API[componentName];
        return {
            ...prev,
            [componentName]: Object.keys(componentApi).reduce((prevApi, apiKey) => {
                return {
                    ...prevApi,
                    [apiKey]: ${'prevServer' || ''}${'componentApi[apiKey]' || ''}
                };
            }, {})
        };
    }, {});
};

export const API = {
    // login
    login: {
        captcha: server + '/captcha.jpg',
        login: server + '/login',
        changePwd: server + '/update-password',
        logout: server + '/logout',
    },
    headmaster: {
        query: server + '/teacher/page',
        save: server + '/teacher/add',
        delete: server + '/teacher/delete',
        update: server + '/teacher/add',
        get: server + '/teacher/detail',
    },
    ...composeApi(server, API_JSON)
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
        const sourceAst = new ApiTransfer(code);
        const apiNode = sourceAst.getApiNode();
        const firstChildNode = sourceAst.copyNode(sourceAst.getFirstChildNode());
        console.log('firstChildNode', firstChildNode);
        console.log('apiNode', apiNode);
        console.log('sourceAst', sourceAst);
        console.log('toJS', sourceAst.toJS());
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
