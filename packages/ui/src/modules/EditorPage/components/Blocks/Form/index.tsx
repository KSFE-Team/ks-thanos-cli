import React from 'react';
import BlockItem from '../index';

export default (props: any) => {
    const { components } = props;
    return (
        <div>
            这是form
            <div>
                {components.map((config: any) => (
                    <BlockItem {...config} />
                ))}
            </div>
        </div>
    );
};
