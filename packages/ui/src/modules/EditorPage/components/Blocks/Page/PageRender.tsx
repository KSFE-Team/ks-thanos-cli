import React from 'react';
import { useRecoilState } from 'recoil';
import { pageState } from '../../../atoms/page';
import blockMaps from '../blockMaps';

export default (props: any = {}) => {
    const [[page], setTitle] = useRecoilState(pageState);
    const { configProps, components } = page;
    return (
        <div>
            <div>{configProps.title}</div>
            <button
                type="button"
                onClick={(e) => {
                    setTitle([
                        {
                            ...page,
                            configProps: {
                                ...configProps,
                                title: 'caid',
                            },
                        },
                    ]);
                }}
            >
                click
            </button>

            <div>
                {components.map(({ name }: { name: string }) => {
                    let component: any = '';
                    if (name) {
                        const Component = blockMaps[name];
                        component = <Component />;
                    }
                    return component;
                })}
            </div>
        </div>
    );
};
