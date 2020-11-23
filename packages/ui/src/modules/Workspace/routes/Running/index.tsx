import React, { ReactNode, useEffect } from 'react';
import { Button, Badge } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { FitAddon } from 'xterm-addon-fit';
import { actions } from 'kredux';
import terminal from 'Src/components/Terminal';
import ThanosModal from '../../component/ThanosModal';
import { PROJECT_PROCESS_TYPE } from './constants';
import './style.scss';

const [{ key: NOT_RUN }, { key: RUNNING }, { key: FINISH }, { key: FAIL }] = PROJECT_PROCESS_TYPE;

export default () => {
    const { workspace } = useSelector((store: any) => ({ workspace: store.workspace }));
    const { currentProject, thanosGeneratorLoading, thanosModalVisible, projectConfig } = workspace;
    const { openUrl } = projectConfig;
    useEffect(() => {
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(document.querySelector('#terminal'));
        fitAddon.fit();
        actions.workspace.getProjectProcess();
        actions.workspace.getProjectConfig();
    }, []);

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
        ];
        return (
            <>
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
            </>
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
