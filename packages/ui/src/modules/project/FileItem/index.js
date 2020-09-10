import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { actions } from 'kredux';
import * as antdIcons from '@ant-design/icons';
import { Menu, Dropdown, Modal } from 'antd';
import { FILE_TYPE } from '../constants';
const [FILE, DIR] = FILE_TYPE;
const { Item: MenuItem } = Menu;
const { confirm } = Modal;

export default class FileItem extends Component {
    static propTypes = {
        file: PropTypes.object,
        onClick: PropTypes.func,
    }

    getIcon = () => {
        const { file } = this.props;
        const { type } = file;
        const dict = FILE_TYPE.find(({key}) => key === type) || FILE;
        const IconComponent = antdIcons[`${dict.icon}Filled`];
        return <IconComponent style={{fontSize: '18px', color: dict.color}} className='file-item-icon' />;
    }

    handleClick = () => {
        const { onClick, file } = this.props;
        const { type } = file;
        /* 暂时只支持文件夹点击 */
        if (type === DIR.key) {
            onClick && onClick(file);
        }
    }

    getMenu = () => {
        const { file } = this.props;
        return <Menu>
            <MenuItem
                onClick={() => {
                    confirm({
                        title: '删除',
                        content: `确认要删除${file.name}`,
                        onOk: () => {
                            actions.project.runCommand(`rm -rf ${file.name}`).then(() => {
                                actions.project.selectFolder();
                            });
                        }
                    });
                }}
            >删除</MenuItem>
        </Menu>;
    }

    render() {
        const { file } = this.props;
        const { name } = file;
        return (
            <Dropdown
                overlay={this.getMenu()}
                trigger={['contextMenu']}
            >
                <div
                    className={`file-item ${file.type}`}
                    onClick={this.handleClick}
                >
                    {this.getIcon()}
                    {name}
                </div>
            </Dropdown>
        );
    }
}
