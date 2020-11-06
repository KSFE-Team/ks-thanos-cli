import React from 'react';
import './style.scss';

interface CardProps {
    title?: string;
    children?: React.ReactNode;
}

export default ({ title = 'Thanos', children }: CardProps) => {
    return (
        <div className="Card-container">
            <div className="Card-title">{title}</div>
            {children}
        </div>
    );
};
