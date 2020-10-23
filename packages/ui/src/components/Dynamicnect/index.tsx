import React, { Component } from 'react';
import { actions, connect } from 'kredux';
import { getApp } from 'Src/app';

interface HOCProps {
    id: string;
}

interface HOCState {
    hocComp: any;
}

export default (OriginComponent: any) => {
    return class HOC extends Component<HOCProps, HOCState> {
        constructor(props: any) {
            super(props);
            const { id } = props;
            if (!(id in actions)) {
                const app = getApp();
                app.model({
                    namespace: id,
                    initialState: {},
                });
            }
            this.state = {
                hocComp: connect((store: any) => ({ [id]: store[id] }))(OriginComponent),
            };
        }

        render() {
            const { hocComp: HOCComponent } = this.state;
            return <HOCComponent {...this.props} />;
        }
    };
};
