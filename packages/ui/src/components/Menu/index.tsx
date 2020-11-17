import React, { useState, useEffect } from 'react';
import { goto } from 'Src/utils';
import RouteProps from 'Src/types/route';
import MenuItem from './MenuItem';

interface MenuLayoutProps extends RouteProps {
    dataSource: any[];
    direction: 'row' | 'column';
}

export default (props: MenuLayoutProps) => {
    const { direction = 'row', dataSource } = props;
    const { pathname } = window.location;
    const [state, setState] = useState(() => {
        // eslint-disable-next-line no-restricted-globals
        return {
            routePath: pathname,
        };
    });

    useEffect(() => {
        setState({
            routePath: pathname,
        });
    }, [pathname]);

    const handleLink = (url: string) => {
        goto.push(`${url}`);
    };

    const getActionNode = (path: string) => (state.routePath.includes(path) ? 'active' : '');

    return (
        <div
            className={`menu ${direction}`}
            data-direction={direction}
            style={{
                flexDirection: direction,
            }}
        >
            {dataSource.map(({ path, name }) => {
                return (
                    <MenuItem
                        key={path}
                        onClick={() => {
                            handleLink(path);
                        }}
                        className={getActionNode(path)}
                    >
                        {name}
                    </MenuItem>
                );
            })}
        </div>
    );
};
