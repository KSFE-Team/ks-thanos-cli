import React from 'react';
import { actions } from 'kredux';
import { FileFilled, FolderFilled } from '@ant-design/icons';
import { Menu, Dropdown, Modal } from 'antd';
import { FILE_TYPE } from './constants';
import { FileItemInterFace } from './types';

const [FILE, DIR] = FILE_TYPE;
const { Item: MenuItem } = Menu;
const { confirm } = Modal;

interface FileItemProps {
    file: FileItemInterFace;
    onClick(file: FileItemInterFace): void;
}

export default (props: FileItemProps) => {
    const { file } = props;
    const { name } = file;

    const getMenu = () => {
        return (
            <Menu>
                <MenuItem
                    onClick={() => {
                        confirm({
                            title: '删除',
                            content: `确认要删除${file.name}`,
                            onOk: () => {
                                actions.global.runCommand(`rm -rf ${file.name}`).then(() => {
                                    actions.global.selectFolder();
                                });
                            },
                        });
                    }}
                >
                    删除
                </MenuItem>
            </Menu>
        );
    };

    const getIcon = () => {
        const { type } = file;
        const dict = FILE_TYPE.find(({ key }) => key === type) || FILE;
        let IconComponent;
        switch (dict) {
            case FILE:
                IconComponent = FileFilled;
                break;
            case DIR:
                IconComponent = FolderFilled;
                break;
            default:
        }
        return (
            IconComponent && (
                <IconComponent style={{ fontSize: '18px', color: dict.color }} className="file-item-icon" />
            )
        );
    };

    const handleClick = () => {
        const { onClick } = props;
        const { type } = file;
        /* 暂时只支持文件夹点击 */
        if (type === DIR.key && onClick) {
            onClick(file);
        }
    };

    return (
        <Dropdown overlay={getMenu()} trigger={['contextMenu']}>
            <div className={`file-item ${file.type}`} onClick={handleClick}>
                {getIcon()}
                {name}
            </div>
        </Dropdown>
    );
};
