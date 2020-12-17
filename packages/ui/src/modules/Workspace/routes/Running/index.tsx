import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Badge, message, Modal, Spin, Menu, Dropdown } from 'antd';
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { FitAddon } from 'xterm-addon-fit';
import { actions } from 'kredux';
import terminal from 'Src/components/Terminal';
import ThanosModal from '../../component/ThanosModal';
import { PROJECT_PROCESS_TYPE, NGINX_ENV } from './constants';
import './style.scss';

const { confirm: Confirm } = Modal;
const [{ key: NOT_RUN }, { key: RUNNING }, { key: FINISH }, { key: FAIL }] = PROJECT_PROCESS_TYPE;

export default () => {
    const { workspace, loading } = useSelector((store: any) => ({
        workspace: store.workspace,
        loading:
            store.loading.effects['workspace/getProjectProcess'] ||
            store.loading.effects['workspace/thanosSync'] ||
            store.loading.effects['workspace/getNginxEnv'] ||
            false,
    }));
    // thanosLoading
    const { currentProject, thanosGeneratorLoading, thanosModalVisible, projectConfig, cwd, localNginxEnv } = workspace;
    const { openUrl, nginxPort } = projectConfig;
    const [nginxEnv, setNginxEnv] = useState('Dev');

    useEffect(() => {
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(document.querySelector('#terminal'));
        fitAddon.fit();
        actions.workspace.getProjectProcess();
        actions.workspace.getProjectConfig();
    }, []);

    useEffect(() => {
        setNginxEnv(localNginxEnv);
    }, [localNginxEnv]);

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

    const handleMenuClick = (e: any) => {
        const env = e.key;
        if (env === nginxEnv) {
            return;
        }
        actions.workspace.setReducers({
            localNginxEnv: env,
        });
        actions.workspace.thanosSync({
            cwd,
            cmd: 'cv',
            args: JSON.stringify([
                {
                    key: '--config',
                    value: {
                        action: 'set',
                        port: nginxPort,
                        env,
                    },
                },
            ]),
            callback: () => {
                message.success('切换nginx环境成功');
            },
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
        const menu = (
            <Menu onClick={handleMenuClick}>
                {NGINX_ENV.map((env) => (
                    <Menu.Item key={env}>{env}</Menu.Item>
                ))}
            </Menu>
        );
        return (
            <Spin spinning={loading}>
                {actionBtns.map(({ type, onClick, text, props = {} }, idx) => {
                    return (
                        <Button className="mar-l-4" type={type} key={`${idx}_${type}`} onClick={onClick} {...props}>
                            {text}
                        </Button>
                    );
                })}
                <div className="mar-l-4" style={{ display: 'inline-block' }}>
                    <Dropdown.Button overlay={menu}>{nginxEnv}</Dropdown.Button>
                </div>
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
