import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Menu from 'Src/components/Menu';
import { ROUTE_LIST } from './routes';
import NoMatch from '../Workspace/component/NoMatch';
import router from 'kredux/output/router';

const { Sider, Content } = Layout;
const { Route, Switch } = router;

export default class Property extends Component {
    static propTypes = {
        match: PropTypes.object
    };

    componentDidMount() {
        // // const { match: { query = '' } } = this.props;
        // goto.push('/');
    }

    render() {
        const { match } = this.props;
        return <Layout
            style={{
                overflow: 'auto',
                height: '100vh',
                width: '100%',
                position: 'fixed',
                backgroundColor: '#23232e'
            }}
        >
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    backgroundColor: '#30303d'
                }}
                width='auto'
            >
                <Menu
                    direction='column'
                    match={match}
                    dataSource={ROUTE_LIST}
                />
            </Sider>
            <Content>
                <Switch>
                    {
                        ROUTE_LIST.map((config) => {
                            return <Route key={config.path} {...config}/>;
                        })
                    }
                    <Route component={NoMatch}/>
                </Switch>
            </Content>
        </Layout>;
    }
}
