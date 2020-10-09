import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { goto } from 'Src/utils';

export default class Auth extends Component {
    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        // const { match: { query = '' } } = this.props;
        // goto.push('/');
    }
    render() {
        return <div>
            loading
        </div>;
    }
}
