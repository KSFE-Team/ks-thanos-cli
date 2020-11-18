import React, { useState, useRef, useEffect } from 'react';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { FolderAddFilled, HomeFilled } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import Modal from 'Src/components/Modal';
import { FILE_TYPE } from 'Src/utils/constants';
import FileItem from './FileItem';
import { FileItemInterFace } from './types';
import './style.scss';

const DIR = FILE_TYPE[1];

interface SelectPathModalProps {
    preCheckFunc?(
        currentPath: string,
    ): {
        pass: string;
        msg?: string;
    };
    onSubmit?(path: string): void;
}

export default (props: SelectPathModalProps) => {
    const { global } = useSelector((store: any) => ({
        global: store.global,
    }));
    const [state, setState] = useState({
        method: 'check',
        inputRef: useRef(),
    });
    const { method } = state;
    const { fileList, currentPath, isShowFolder } = global;
    useEffect(() => {
        if (state.method === 'create') {
            state.inputRef.current.focus();
        }
    }, [state.inputRef, state.method]);

    /**
     * 文件路径范围上一层
     */
    const handleBack = () => {
        actions.global.selectFolder({
            path: currentPath.substring(0, currentPath.lastIndexOf('/')),
        });
    };

    /**
     * 关闭弹框
     */
    const handleCancel = () => {
        actions.global.cancelSelect();
    };

    /**
     * 确认弹框
     */
    const handleConfirm = () => {
        const { preCheckFunc, onSubmit } = props;
        const { pass, msg } = preCheckFunc ? preCheckFunc(currentPath) : { pass: true, msg: '' };
        if (pass) {
            if (onSubmit) {
                onSubmit(currentPath);
            }
            actions.global.setReducers({
                isShowFolder: false,
            });
        } else {
            message.error(msg);
        }
    };

    /**
     * 选择项目
     */
    const handleSelectProject = (add = '') => {
        actions.global.selectFolder({
            path: currentPath + add,
        });
    };

    /**
     * 获取创建 Input
     */
    const getCreateFolder = () => {
        if (method === 'check') {
            return null;
        }
        return (
            <Input
                className="create-folder-input"
                placeholder="文件夹名称"
                ref={state.inputRef}
                onPressEnter={(e: React.KeyboardEvent) => {
                    const { value } = e.target;
                    handleCreateFolder(value);
                }}
                onBlur={(e: React.FocusEvent) => {
                    const { value } = e.target;
                    handleCreateFolder(value);
                }}
            />
        );
    };

    /**
     * 创建文件事件
     */
    const handleCreateFolder = (value: string) => {
        if (!value) {
            setState({
                ...state,
                method: 'check',
            });
            return;
        }
        const result = checkFolderName(value);
        if (result.pass) {
            actions.global.runCommand(`mkdir ${value}`).then(() => {
                setState({
                    ...state,
                    method: 'check',
                });
                actions.global.selectFolder();
            });
        } else {
            message.error(result.msg);
        }
    };

    /**
     * 检查文件名称冲突
     */
    const checkFolderName = (folderName: string) => {
        const isSame = fileList.some(({ type, name }: FileItemInterFace) => type === DIR.key && name === folderName);
        return {
            pass: !isSame,
            msg: !isSame ? '' : '该目录下已经存在相同名称文件夹',
        };
    };

    /**
     * 自定义弹窗底部
     */
    const getFooter = () => {
        return (
            <>
                <div className="file-modal-tools">
                    <FolderAddFilled
                        onClick={() => {
                            setState({
                                ...state,
                                method: 'create',
                            });
                        }}
                        style={{ fontSize: '22px' }}
                    />
                </div>
                <Button onClick={handleCancel}>取消</Button>
                <Button className="mar-l-4" type="primary" onClick={handleConfirm}>
                    确定
                </Button>
            </>
        );
    };

    return (
        <Modal
            visible={isShowFolder}
            title={
                <>
                    <HomeFilled
                        onClick={() => {
                            actions.global.selectFolder({
                                path: '/Users',
                            });
                        }}
                        style={{ margin: '0 6px', fontSize: '18px' }}
                    />
                    <span className="get-back-icon" onClick={handleBack}>
                        {'<'}
                    </span>
                    <span>当前路径：{currentPath}</span>
                </>
            }
            footer={getFooter()}
        >
            <div className="file-item-wrapper">
                {getCreateFolder()}
                {fileList.map((file: FileItemInterFace) => {
                    return (
                        <FileItem
                            key={file.name}
                            file={file}
                            onClick={() => {
                                handleSelectProject(`/${file.name}`);
                            }}
                        />
                    );
                })}
            </div>
        </Modal>
    );
};
