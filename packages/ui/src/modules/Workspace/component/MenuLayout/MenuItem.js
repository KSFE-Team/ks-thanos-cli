import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class MenuItem extends Component {
    static propTypes = {
        className: PropTypes.string,
        onClick: PropTypes.func,
        children: PropTypes.node
    }
    render() {
        const { className, onClick, children } = this.props;
        return (
            <div
                className={`menu-item ${className}`}
                onClick={onClick}
            >
                {children}
            </div>
        );
    }
}
