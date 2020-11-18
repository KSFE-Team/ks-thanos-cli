import React, { useState, useEffect } from 'react';
import { actions, connect } from 'kredux';
import { getApp } from 'Src/app';

interface HOCProps {
    id: string;
}

/* 注册model */
const regsisterModelById = (id: string, originComponentConfig: any) => {
    if (!(id in actions)) {
        const app = getApp();
        const { tools } = originComponentConfig;
        const { getInitJson } = tools;
        app.model({
            namespace: id,
            initialState: getInitJson(),
        });
    }
};

/* 根据ID获取connect后的组件 */
const getConnectComponent = (id: string, OriginComponent: any, Boolean: any, originComponentConfig: any) => {
    regsisterModelById(id, originComponentConfig);
    return {
        [id]: connect((store: any) => {
            let params = { [id]: store[id] };
            if (Boolean) {
                params = { ...params, page: store.page };
            }
            return params;
        })(OriginComponent),
    };
};

export default (OriginComponent: any, originComponentConfig: any, Boolean: boolean) => {
    return (props: HOCProps) => {
        const { id } = props;
        const [state, setState] = useState(() => {
            return getConnectComponent(id, OriginComponent, Boolean, originComponentConfig);
        });
        useEffect((): void => {
            setState((prevState) => ({
                ...prevState,
                ...getConnectComponent(id, OriginComponent, Boolean, originComponentConfig),
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
