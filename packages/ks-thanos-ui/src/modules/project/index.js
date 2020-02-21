import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
import { actions } from 'kredux';
import { projectContainer } from 'Models/project';
import { FitAddon } from 'xterm-addon-fit';
import './index.scss';
import '../../../node_modules/xterm/css/xterm.css';

export const terminal = new Terminal();

@projectContainer
export default class Project extends Component {

    static propTypes = {
        project: PropTypes.object
    }

    state = {
        filePath: ''
    }

    componentDidMount() {
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(document.getElementById('terminal'));
        fitAddon.fit();
    }

    handleStart = () => {
        actions.project.runCommand('start');
    }

    handleStop = () => {
        this.handleClear();
        actions.project.runCommand('stop');
    }

    handleClear = () => {
        terminal.clear();
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

    handleBack = () => {
        const { currentPath } = this.props.project;
        actions.project.selectFolder({
            path: currentPath.substring(currentPath.lastIndexOf('/'))
        });
    }

    render() {
        const { fileList, currentPath, projectName, isShowFolder } = this.props.project;

        return (
            <div
                className="project-container"
            >
                <div className="content-container">
                    <div className="project-left-side">
                        <div className="project-title" onClick={() => this.handleSelectProject('')}>{projectName || '请选择项目'}</div>
                    </div>
                    <div className="terminal-wrapper">
                        <div className="btn-wrapper">
                            <button className="btn btn-start" onClick={this.handleStart}>启动</button>
                            <button className="btn btn-stop" onClick={this.handleStop}>停止</button>
                            <button className="btn btn-clear" onClick={this.handleClear}>清空日志</button>
                        </div>
                        <div id="terminal"></div>
                    </div>

                </div>
                <div className="folder-container" style={{display: isShowFolder ? 'block' : 'none'}}>
                    <div className="folder-mask"></div>
                    <div className="folder-wrapper">
                        <div className="file-toolbar">
                            <span className="btn" onClick={this.handleBack}>{`<`}</span>
                            <span>当前路径：{currentPath}</span>
                        </div>
                        <div className="file-item-wrapper">
                            {
                                fileList.map((f) => {
                                    return <div key={f.name} className="file-item" onClick={() => this.handleSelectProject(`/${f.name}`)}>{f.name}</div>;
                                })
                            }
                        </div>
                        <div className="file-bottom-toolbar">
                            <span className="btn btn-confirm"onClick={this.handleConfirm}>确认</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
