import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FitAddon } from 'xterm-addon-fit';
import terminal from 'Src/components/Terminal';
import './style.scss';
// import { goto } from 'Src/utils';

export default class Running extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    componentDidMount() {
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(document.querySelector('#terminal'));
        fitAddon.fit();
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
                        type: 'primary',
                        onClick: this.handleStart,
                        text: '启动'
                    },
                    {
                        type: 'danger',
                        onClick: this.handleStop,
                        text: '停止'
                    },
                    {
                        onClick: this.handleClear,
                        text: '清空日志'
                    },
                    {
                        onClick: this.handleThanos,
                        text: '灭霸'
                    },
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
        return actions.map(({ type, onClick, text }, idx) => {
            return (
                <Button className={'mar-l-4'} type={type} key={idx} onClick={onClick}>{text}</Button>
            );
        });
    }

    handleStart = () => {

    }

    handleStop = () => {

    }

    handleClear = () => {

    }

    handleThanos = () => {

    }

    render() {
        return <div className='workspace-running-container'>
            <div className={'workspace-running-tools'}>
                {this.getActions()}
            </div>
            <div id='terminal'></div>
        </div>;
    }
}
