import React from 'react';
import './style.scss';

interface LogoProps {
    text?: string;
    className?: string;
}

export default ({ text = 'Thanos', className = '' }: LogoProps) => {
    return (
        <div className={`logo-title ${className}`}>
            <span className="logo-title-text">{text}</span>
        </div>
    );
};
