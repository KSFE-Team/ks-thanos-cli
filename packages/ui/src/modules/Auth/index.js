import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { goto } from 'Src/utils';

export default class Auth extends Component {
    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        window.loginEnv = 'devEdit';
    }
    render() {
        return <div style={{color: 'red'}}>
            <button onClick={() => {
                window.loginEnv = 'devEdit';
                // localStorage.setItem('loginEnv', 'devEdit');
                goto.push('/');
            }}>开发</button><br/>
            <button onClick={() => {
                window.loginEnv = 'onlyPreview';
                // localStorage.setItem('loginEnv', 'onlyPreview');
                goto.push('/workspace/blocks/existingPage');
            }}>生产</button>
        </div>;
    }
}
