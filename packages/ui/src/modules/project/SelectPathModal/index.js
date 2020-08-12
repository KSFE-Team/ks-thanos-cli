import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { actions } from 'kredux';
import { projectContainer } from 'Models/project';
import { Button, Icon, Input, message } from 'antd';
import Modal from 'Components/Modal';
import FileItem from '../FileItem';
import { FILE_TYPE } from '../constants';
import '../index.scss';

const DIR = FILE_TYPE[1];

@projectContainer
export default class SelectPathModal extends Component {
    static propTypes = {
        project: PropTypes.object,
        preCheckFunc: PropTypes.func,
        onSubmit: PropTypes.func,
    }

    state = {
        method: 'check'
    }

    inputRef;

    /**
     * 文件路径范围上一层
     */
    handleBack = () => {
        const { currentPath } = this.props.project;
        actions.project.selectFolder({
            path: currentPath.substring(0, currentPath.lastIndexOf('/'))
        });
    }

    /**
     * 关闭弹框
     */
    handleCancel = () => {
        actions.project.cancelSelect();
    }

    /**
     * 确认弹框
     */
    handleConfirm = () => {
        const { preCheckFunc, onSubmit } = this.props;
        const { currentPath } = this.props.project;
        const {pass, msg} = preCheckFunc ? preCheckFunc(currentPath) : {pass: true};
        if (pass) {
            onSubmit && onSubmit(currentPath);
            actions.project.setReducers({
                isShowFolder: false
            });
        } else {
            message.error(msg);
        }
    }

    /**
     * 选择项目
     */
    handleSelectProject = (add = '') => {
        const { currentPath } = this.props.project;
        actions.project.selectFolder({
            path: currentPath + add
        });
    }

    /**
     * 获取创建 Input
     */
    getCreateFolder = () => {
        const { method } = this.state;
        if (method === 'check') {
            return null;
        }
        return <Input
            className='create-folder-input'
            placeholder={'文件夹名称'}
            ref={(ref) => {
                this.inputRef = ref;
            }}
            onPressEnter={(e) => {
                const { value } = e.target;
                this.handleCreateFolder(value);
            }}
            onBlur={(e) => {
                const { value } = e.target;
                this.handleCreateFolder(value);
            }}
        />;
    }

    /**
     * 创建文件事件
     */
    handleCreateFolder = (value) => {
        if (!value) {
            this.setState({
                method: 'check'
            });
            return;
        }
        const result = this.checkFolderName(value);
        if (result.pass) {
            actions.project.runCommand(`mkdir ${value}`).then(() => {
                this.setState({
                    method: 'check'
                });
                actions.project.selectFolder();
            });
        } else {
            message.error(result.msg);
        }
    }

    /**
     * 检查文件名称冲突
     */
    checkFolderName = (folderName) => {
        const { fileList } = this.props.project;
        const isSame = fileList.some(({type, name}) => type === DIR.key && name === folderName);
        return {
            pass: !isSame,
            msg: !isSame ? '' : '该目录下已经存在相同名称文件夹'
        };
    }

    /**
     * 自定义弹窗底部
     */
    getFooter = () => {
        return <Fragment>
            <div className='file-modal-tools'>
                <Icon
                    onClick={() => {
                        this.setState({
                            method: 'create'
                        }, () => {
                            this.inputRef.focus();
                        });
                    }}
                    style={{fontSize: '22px'}}
                    type="folder-add"
                    theme="filled"
                />
            </div>
            <Button
                onClick={this.handleCancel}
            >取消</Button>
            <Button
                className={'mar-l-4'}
                type='primary'
                onClick={this.handleConfirm}
            >确定</Button>
        </Fragment>;
    }

    render() {
        const { fileList, currentPath, isShowFolder } = this.props.project;
        return (
            <Modal
                visible={isShowFolder}
                title={
                    <Fragment>
                        <Icon
                            onClick={() => {
                                actions.project.selectFolder({
                                    path: '/Users'
                                });
                            }}
                            style={{margin: '0 6px', fontSize: '18px'}}
                            type="home"
                            theme="filled"
                        />
                        <span className='get-back-icon' onClick={this.handleBack}>{`<`}</span>
                        <span>当前路径：{currentPath}</span>
                    </Fragment>
                }
                footer={this.getFooter()}
            >
                <div className="file-item-wrapper">
                    {this.getCreateFolder()}
                    {
                        fileList.map((file) => {
                            return <FileItem
                                key={file.name}
                                file={file}
                                onClick={() => {
                                    this.handleSelectProject(`/${file.name}`);
                                }}
                            />;
                        })
                    }
                </div>
            </Modal>
        );
    }
}