import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Badge, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FitAddon } from 'xterm-addon-fit';
import { connect, actions } from 'kredux';
import terminal from 'Src/components/Terminal';
import ThanosModal from '../../../project/ThanosModal';
import { getObjectStorage } from 'Src/utils';
import { PROJECT_PROCESS_TYPE } from './constants';
import './style.scss';
const [{key: NOT_RUN}, {key: RUNNING}, {key: FINISH}, {key: FAIL}] = PROJECT_PROCESS_TYPE;

// import { goto } from 'Src/utils';
@connect(({project}) => ({project}))
export default class Running extends Component {
    static propTypes = {
        children: PropTypes.node,
        project: PropTypes.object,
    }

    constructor(props) {
        super(props);
        const project = getObjectStorage('currentProject');
        if (!project) {
            message.error('选择的项目数据有误，请重新选择');
        } else {
            this.project = project;
        }
    }

    componentDidMount() {
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(document.querySelector('#terminal'));
        fitAddon.fit();
        actions.project.getProjectProcess();
    }

    /**
     * 获取操作
     */
    getActions = () => {
        const { projectProcess } = this.props.project;
        const { status = NOT_RUN } = projectProcess;
        let actions = [],
            badge = {};
        switch (status) {
            case NOT_RUN:
                badge = {
                    status: 'default',
                    text: '待运行'
                };
                actions = [
                    {
                        type: 'primary',
                        onClick: this.handleStart,
                        text: '启动'
                    },
                ];
                break;
            case FAIL:
                badge = {
                    status: 'error',
                    text: '运行失败'
                };
                actions = [
                    {
                        type: 'primary',
                        onClick: this.handleStart,
                        text: '启动'
                    },
                ];
                break;
            case RUNNING:
                badge = {
                    status: 'processing',
                    text: <span className='workspace-running-badge-processing'>
                        运行中
                        <span className='workspace-running-badge-processing-loading1'>.</span>
                        <span className='workspace-running-badge-processing-loading2'>.</span>
                        <span className='workspace-running-badge-processing-loading3'>.</span>
                    </span>
                };
                actions = [
                    {
                        type: 'danger',
                        onClick: this.handleStop,
                        text: '停止'
                    },
                ];
                break;
            case FINISH:
                badge = {
                    status: 'success',
                    text: <span>
                        运行成功 <a
                            className='workspace-running-text-link'
                            onClick={() => {
                                open('http://localhost:105');
                            }}
                        >http://localhost:105</a>
                    </span>
                };
                actions = [
                    {
                        type: 'danger',
                        onClick: this.handleStop,
                        text: '停止'
                    },
                ];
                break;
        }
        actions = [...actions, {
            onClick: this.handleClear,
            text: '清空日志'
        },
        {
            onClick: this.handleThanos,
            text: '灭霸'
        }];
        return <Fragment>
            {
                actions.map(({ type, onClick, text }, idx) => {
                    return (
                        <Button className={'mar-l-4'} type={type} key={`${idx}_${type}`} onClick={onClick}>{text}</Button>
                    );
                })
            }
            <span className='workspace-running-badge'>
                <Badge status={badge.status}/> {badge.text}
            </span>
        </Fragment>;
    }

    handleStart = () => {
        actions.project.runNpmCommand('start');
    }

    handleStop = () => {
        actions.project.runNpmCommand('stop');
    }

    handleClear = () => {
        actions.project.clear();
    }

    handleThanos = () => {
        actions.project.setReducers({
            thanosModalVisible: true,
            currentPath: this.project.path
        });
    }

    getGeneratorLoading = () => {
        const { thanosGeneratorLoading } = this.props.project;
        if (thanosGeneratorLoading) {
            return <span className='workspace-running-generator-loading'>代码生成中 <LoadingOutlined className='mar-l-4'/></span>;
        } else {
            return null;
        }
    }

    render() {
        const { thanosModalVisible } = this.props.project;
        return <div className='workspace-running-container'>
            <div className={'workspace-running-tools'}>
                {this.getActions()}
                {this.getGeneratorLoading()}
            </div>
            <div id='terminal'></div>
            {
                thanosModalVisible && <ThanosModal/>
            }
        </div>;
    }
}
