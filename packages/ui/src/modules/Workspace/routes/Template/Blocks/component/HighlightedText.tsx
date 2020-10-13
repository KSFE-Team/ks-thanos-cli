import React from 'react';

interface HighlightedTextProps {
    text?: any;
    highlight?: string;
}

const partStyles: React.CSSProperties = {
    fontWeight: 'bold',
    color: '#2688F9',
};

const HighlightedText: React.FC<HighlightedTextProps> = ({ text = '', highlight = '' }) => {
    if (!text || !highlight) {
        return text;
    }
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
        <>
            {parts.map((part: string, i: number) => (
                <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? partStyles : {}}>
                    {part}
                </span>
            ))}
        </>
    );
};

export default HighlightedText;
