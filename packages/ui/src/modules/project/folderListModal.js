import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { actions } from 'kredux';
import Modal from 'Components/Modal';
import { projectContainer } from 'Models/project';
import './index.scss';

@projectContainer
export default class FolderListModal extends Component {
    static propTypes = {
        project: PropTypes.object
    }

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
        actions.project.confirmFilePath();
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

    render() {
        const { fileList, currentPath, isShowFolder } = this.props.project;
        return (
            <Modal
                visible={isShowFolder}
                title={
                    <Fragment>
                        <span className="btn" onClick={this.handleBack}>{`<`}</span>
                        <span>当前路径：{currentPath}</span>
                    </Fragment>
                }
                onCancel={this.handleCancel}
                onSubmit={this.handleConfirm}
            >
                <div className="file-item-wrapper">
                    {
                        fileList.map((f) => {
                            return <div key={f.name} className="file-item" onClick={() => this.handleSelectProject(`/${f.name}`)}>{f.name}</div>;
                        })
                    }
                </div>
            </Modal>
        );
    }
}
