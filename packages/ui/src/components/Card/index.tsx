import React from 'react';
import './style.scss';

interface CardProps {
    title?: string;
    children?: React.ReactNode;
    style?: object;
}

export default ({ title = 'Thanos', style, children }: CardProps) => {
    return (
        <div className="Card-container" style={style}>
            <div className="Card-title">{title}</div>
            {children}
        </div>
    );
};
