import React from 'react';
import './style.scss';

interface ConfigCardProps {
    children: React.ReactNode;
    title: string;
}
export default (props: ConfigCardProps) => {
    const { children, title } = props;
    return (
        <div className="config-card-container">
            <div>
                <span className="config-card-title">{title}</span>
            </div>
            {children}
        </div>
    );
};
