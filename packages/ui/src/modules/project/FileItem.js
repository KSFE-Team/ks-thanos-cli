import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { FILE_TYPE } from './constants';
const [FILE, DIR] = FILE_TYPE;

export default class FileItem extends Component {
    static propTypes = {
        file: PropTypes.object,
        onClick: PropTypes.func,
    }

    getIcon = () => {
        const { file } = this.props;
        const { type } = file;
        let dict = FILE_TYPE.find(({key}) => key === type) || FILE;
        return <Icon style={{fontSize: '18px', color: dict.color}} theme={'filled'} className='file-item-icon' type={dict.icon}/>;
    }

    handleClick = () => {
        const { onClick, file } = this.props;
        const { type } = file;
        /* 暂时只支持文件夹点击 */
        if (type === DIR.key) {
            onClick && onClick(file);
        }
    }

    render() {
        const { file } = this.props;
        const { name } = file;
        return (
            <div
                className={`file-item ${file.type}`}
                onClick={this.handleClick}
            >
                {this.getIcon()}
                {name}
            </div>
        );
    }
}
