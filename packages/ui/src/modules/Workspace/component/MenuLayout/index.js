import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import { ROUTE_LIST } from '../../routes';
import { goto } from 'Src/utils';
export default class MenuLayout extends Component {

    static propTypes = {
        match: PropTypes.object
    }

    constructor(props) {
        super(props);
        const { pathname } = location;
        this.state = {
            routePath: pathname
        };
    }

    // baseUrl = '/workspace';

    handleLink = (url) => {
        this.setState({
            routePath: url
        });
        goto.push(`${url}`);
    }

    getActionNode = (path) => this.state.routePath === path ? 'active' : '';

    render() {
        return (
            <div
                className={'menu'}
            >
                {
                    ROUTE_LIST.map(({path, name}) => {
                        return (
                            <MenuItem
                                key={path}
                                onClick={() => {
                                    this.handleLink(path);
                                }}
                                className={this.getActionNode(path)}
                            >
                                {name}
                            </MenuItem>
                        );
                    })
                }
            </div>
        );
    }
}
