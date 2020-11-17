import React, { ReactChild } from 'react';
import './style.scss';

interface MenuItemProps {
    className: string;
    children: ReactChild;
    onClick?(): void;
}

export default (props: MenuItemProps) => {
    const { className, onClick, children } = props;
    return (
        <div className={`menu-item ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};
