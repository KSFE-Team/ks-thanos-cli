import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class Modal extends Component {
    static propTypes = {
        visible: PropTypes.bool, // 是否渲染
        children: PropTypes.node, // 子节点
        title: PropTypes.node, // 标题
        // header: PropTypes.node, // 自定义头部
        footer: PropTypes.node, // 底部
        onCancel: PropTypes.func, // 关闭弹窗时间
        onSubmit: PropTypes.func, // 确定事件
        cancelText: PropTypes.string, // 关闭按钮文案
        submitText: PropTypes.string, // 确定按钮文案
    }

    static defaultProps = {
        cancelText: '取消',
        submitText: '确定'
    }

    /**
     * 关闭弹框事件
     */
    handleCancel = () => {
        const { onCancel } = this.props;
        onCancel && onCancel();
    }

    /**
     * 确定事件
     */
    handleSubmit = () => {
        const { onSubmit } = this.props;
        onSubmit && onSubmit();
    }

    /**
     * 获取底部按钮
     */
    getFooter = () => {
        const { footer, cancelText, submitText } = this.props;
        if (footer) {
            return footer;
        } else {
            return (
                <Fragment>
                    <span
                        className="btn btn-cancel"
                        onClick={this.handleCancel}
                    >{cancelText}</span>
                    <span
                        className="btn btn-confirm"
                        onClick={this.handleSubmit}
                    >{submitText}</span>
                </Fragment>
            );
        }
    }

    render() {
        const { visible, children, title } = this.props;
        return (
            <div className="modal-container" style={{display: visible ? 'block' : 'none'}}>
                <div className="modal-mask" onClick={this.handleCancel}></div>
                <div className="modal-wrapper">
                    <div className="modal-title">
                        {title}
                    </div>
                    <div className='modal-content'>
                        {children}
                    </div>
                    <div className="modal-bottom-toolbar">
                        {this.getFooter()}
                    </div>
                </div>
            </div>
        );
    }
}
