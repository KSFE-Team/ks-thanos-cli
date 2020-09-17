import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class NoMatch extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    componentDidMount() {
        // // const { match: { query = '' } } = this.props;
        // goto.push('/');
    }
    render() {
        const { children } = this.props;
        return <div className='worksapce-no-match'>
            {children || '请选择上方菜单，配置或者运行项目'}
        </div>;
    }
}
