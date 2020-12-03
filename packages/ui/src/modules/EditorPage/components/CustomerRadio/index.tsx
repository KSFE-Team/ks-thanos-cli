import React, { ReactChild } from 'react';
import './style.scss';

interface RadioProps {
    children?: ReactChild;
}

export default (props: RadioProps) => {
    const { children } = props;
    return (
        <div className="customer-radio-container">
            <div className="customer-radio-icon" />
            <span className="customer-radio-text">{children}</span>
        </div>
    );
};
