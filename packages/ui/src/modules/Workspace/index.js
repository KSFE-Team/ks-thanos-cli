import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RollbackOutlined } from '@ant-design/icons';
import { message } from 'antd';
import router from 'kredux/output/router';
import { ROUTE_LIST } from './routes';
import MenuLayout from './component/MenuLayout';
import { goto, getObjectStorage } from 'Src/utils';
import NoMatch from './component/NoMatch';
import './style.scss';

const { Route, Switch } = router;

export default class Workspace extends Component {
    static propTypes = {
        match: PropTypes.object
    }

    constructor(props) {
        super(props);
        const project = getObjectStorage('currentProject');
        if (!project) {
            message.error('选择的项目数据有误，请重新选择');
        } else {
            this.project = project;
        }
    }

    componentDidMount() {
        console.log('mount');
    }
    render() {
        const { match } = this.props;
        const { project } = this;
        return <div className='workspace'>
            <div className={'workspace-header'}>
                <div
                    className='workspace-header-tools'
                    onClick={() => {
                        goto.push('/');
                    }}
                >
                    <RollbackOutlined />
                </div>
                <div className='workspace-header-project-name'>
                    {project.name}
                </div>
                <div className='workspace-header-title'>
                    <span className='workspace-header-title-text'>
                        Thanos
                    </span>
                </div>
                <div className='workspace-header-menu'>
                    <MenuLayout match={match}/>
                </div>
            </div>
            <Switch>
                {
                    ROUTE_LIST.map((config) => {
                        return <Route key={config.path} {...config}/>;
                    })
                }
                <Route component={NoMatch}/>
            </Switch>
        </div>;
    }
}
