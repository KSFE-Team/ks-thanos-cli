import React, { Component } from 'react';
import { getComponent } from './components';

export default class Blocks extends Component<any> {
    state = {
        component: null,
    };

    componentDidMount() {
        const { name } = this.props;
        const Comp = getComponent()[name];
        this.setState({
            component: <Comp {...this.props} />,
        });
    }

    render() {
        return this.state.component;
    }
}
