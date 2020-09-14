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
        return <div className='worksapce-no-match'>
            请选择上方菜单，配置或者运行项目
        </div>;
    }
}
