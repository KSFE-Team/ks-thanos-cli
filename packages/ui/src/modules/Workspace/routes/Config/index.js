import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { goto } from 'Src/utils';

export default class Config extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    componentDidMount() {
        // // const { match: { query = '' } } = this.props;
        // goto.push('/');
    }
    render() {
        return <div>
            Config
        </div>;
    }
}