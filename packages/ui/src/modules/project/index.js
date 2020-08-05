import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { actions } from 'kredux';
import { Icon } from 'antd';
import lottie from 'lottie-web';
import { projectContainer } from 'Models/project';
import { FitAddon } from 'xterm-addon-fit';
import FolderListModal from './FolderListModal';
import ThanosModal from './ThanosModal';
import terminal from './terminal';
import './index.scss';
import 'xterm/css/xterm.css';

@projectContainer
export default class Project extends Component {

    static propTypes = {
        project: PropTypes.object
    }

    state = {
        filePath: ''
    }

    componentDidMount() {
        actions.project.init();

        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(document.getElementById('terminal'));
        fitAddon.fit();

        this.animate = lottie.loadAnimation({
            container: document.querySelector('.animate-container'), // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets5.lottiefiles.com/temp/lf20_DGLtjO.json' // the path to the animation json
        });
        this.animate._ksplaystatus = 'play';
    }

    handleStart = () => {
        actions.project.runNpmCommand('start');
    }

    handleStop = () => {
        this.handleClear();
        actions.project.runNpmCommand('stop');
    }

    handleClear = () => {
        actions.project.clear();
    }

    handleSelectProject = (add = '') => {
        const { currentPath } = this.props.project;

        actions.project.selectFolder({
            path: currentPath + add
        });
    }

    handleConfirm = () => {
        actions.project.confirmFilePath();
    }

    handleCancel = () => {
        actions.project.cancelSelect();
    }

    handleBack = () => {
        const { currentPath } = this.props.project;
        actions.project.selectFolder({
            path: currentPath.substring(0, currentPath.lastIndexOf('/'))
        });
    }

    toggleAnimate = () => {
        if (this.animate._ksplaystatus === 'play') {
            this.animate.stop();
            this.animate._ksplaystatus = 'stop';
        } else {
            this.animate.play();
            this.animate._ksplaystatus = 'play';
        }
    }

    fasterAnimate = () => {
        this.startEnterTime = new Date().getTime();

        this.timeout = setTimeout(() => {
            this.interval = setInterval(() => {
                this.animate.setSpeed(1 + 1 * (new Date().getTime() - this.startEnterTime) / 1000);
            }, 1000);
        }, 2000);
    }

    slowAnimate = () => {
        clearTimeout(this.timeout);
        clearInterval(this.interval);
        this.animate.setSpeed(1);
    }

    /**
     * 灭霸弹框
     */
    handleThanos = () => {
        actions.project.setReducers({
            thanosModalVisible: true
        });
    }

    /**
     * 获取操作
     */
    getActions = () => {
        const isStarting = true;
        let actions = [];
        switch (isStarting) {
            case true:
                actions = [
                    {
                        className: 'btn-start',
                        onClick: this.handleStart,
                        text: '启动'
                    },
                    {
                        className: 'btn-stop',
                        onClick: this.handleStop,
                        text: '停止'
                    },
                    {
                        className: 'btn-clear',
                        onClick: this.handleClear,
                        text: '清空日志'
                    },
                    {
                        className: 'btn-clear',
                        onClick: this.handleThanos,
                        text: '灭霸'
                    }
                ];
                break;
            case false:
                return [
                    {
                        className: 'btn-start',
                        onClick: this.handleStart,
                        text: '启动'
                    },
                ];
        }
        return actions.map(({ className, onClick, text }, idx) => {
            return (
                <button className={`btn ${className || ''}`} key={idx} onClick={onClick}>{text}</button>
            );
        });
    }

    render() {
        const {
            projects, isShowFolder, currentIndex,
            thanosModalVisible,
        } = this.props.project;
        return (
            <div
                className="project-container"
            >
                <div className="project-header">
                    <div
                        className="animate-container"
                        title="心灵宝石"
                        onMouseEnter={() => this.fasterAnimate()}
                        onMouseLeave={() => this.slowAnimate()}
                        onClick={() => this.toggleAnimate()}>
                    </div>
                </div>
                <div className="content-container">
                    <div className="project-left-side">
                        <div className="project-title-wrapper">
                            <span className="project-title">项目列表</span>
                            <span className="project-add-icon" onClick={() => this.handleSelectProject('')}>+</span>
                        </div>
                        <div className="project-empty">
                            {
                                projects.length > 0 ? (
                                    <ul className="project-list-wrapper">
                                        {
                                            projects.map((p, index) => <li
                                                className={`project-item${index === currentIndex ? ' active' : ''}`}
                                                key={p.name}
                                                onClick={() => actions.project.changeCurrentIndex(index)}
                                            >
                                                {p.name} <Icon
                                                    className={'project-item-delete'}
                                                    theme={'filled'}
                                                    type='delete'
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const filterProjects = projects.filter((_, idx) => {
                                                            return idx !== index;
                                                        });
                                                        actions.project.setReducers({
                                                            projects: filterProjects
                                                        });
                                                        localStorage.setItem('projects', JSON.stringify(filterProjects));
                                                    }}
                                                />
                                            </li>
                                            )
                                        }
                                    </ul>
                                ) : (
                                    <React.Fragment>
                                        <img src="https://cdn.kaishuhezi.com/kstory/activity_flow/image/b74cce89-a6ef-41d0-a9e3-57168e37416f.png" alt="美国队长提醒你先添加项目" />
                                        <span className="empty-text">美队提醒您：点击加号添加项目</span>
                                    </React.Fragment>
                                )
                            }
                        </div>
                    </div>
                    <div className="terminal-wrapper">
                        <div className="btn-wrapper">
                            {
                                this.getActions()
                            }
                        </div>
                        <div id="terminal"></div>
                    </div>

                </div>
                {/* 设置文件目录弹框 */}
                {
                    isShowFolder && <FolderListModal/>
                }
                {/* 灭霸弹框 */}
                {
                    thanosModalVisible && <ThanosModal/>
                }
            </div>
        );
    }
}
