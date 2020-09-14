import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import { goto } from 'Src/utils';
export default class MenuLayout extends Component {

    static propTypes = {
        match: PropTypes.object,
        dataSource: PropTypes.array,
        direction: PropTypes.string
    }

    static defaultProps = {
        direction: 'row'
    }

    constructor(props) {
        super(props);
        const { pathname } = location;
        this.state = {
            routePath: pathname
        };
    }

    handleLink = (url) => {
        this.setState({
            routePath: url
        });
        goto.push(`${url}`);
    }

    getActionNode = (path) => this.state.routePath === path ? 'active' : '';

    render() {
        const { dataSource, direction } = this.props;
        return (
            <div
                className={`menu ${direction}`}
                data-direction={direction}
                style={{
                    flexDirection: direction
                }}
            >
                {
                    dataSource.map(({path, name}) => {
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
