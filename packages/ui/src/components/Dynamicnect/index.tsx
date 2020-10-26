import React, { useState, useEffect } from 'react';
import { actions, connect } from 'kredux';
import { getApp } from 'Src/app';

interface HOCProps {
    id: string;
}

/* 注册model */
const regsisterModelById = (id: string) => {
    if (!(id in actions)) {
        const app = getApp();
        app.model({
            namespace: id,
            initialState: {},
        });
    }
};

/* 根据ID获取connect后的组件 */
const getConnectComponent = (id: string, OriginComponent: any) => {
    regsisterModelById(id);
    return {
        [id]: connect((store: any) => ({ [id]: store[id] }))(OriginComponent),
    };
};

export default (OriginComponent: any) => {
    return (props: HOCProps) => {
        const { id } = props;
        const [state, setState] = useState(() => {
            return getConnectComponent(id, OriginComponent);
        });
        useEffect((): void => {
            setState((prevState) => ({
                ...prevState,
                ...getConnectComponent(id, OriginComponent),
            }));
        }, [id]);
        if (id) {
            const { [id]: HOCComponent } = state;
            if (HOCComponent) {
                return <HOCComponent {...props} />;
            }
            return null;
        }
        return <div />;
    };
};
