import React from 'react';
import { Tooltip } from 'antd';
import './style.scss';

interface ButtonProps {
    title?: string;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    onClick?(): void;
}

export default ({ title, disabled, children, className, onClick }: ButtonProps) => {
    let content = (
        <div
            onClick={() => {
                if (onClick && !disabled) {
                    onClick();
                }
            }}
            className={`header-button ${className || ''} ${disabled ? 'disabled' : ''}`}
        >
            {children}
        </div>
    );
    if (!disabled && title) {
        content = (
            <Tooltip title={title} placement="bottom">
                {content}
            </Tooltip>
        );
    }
    return content;
};
