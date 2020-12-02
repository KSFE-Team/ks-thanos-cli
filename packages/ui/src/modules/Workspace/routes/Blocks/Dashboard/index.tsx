import React, { useEffect, useState } from 'react';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Select } from 'antd';
import { Chart, Interval, Line, Tooltip, Axis, Point } from 'bizcharts';
import { getComponentsCount } from 'Src/modules/EditorPage/components/materials';
import { TIMES } from './constants';
import './style.scss';

const { Option } = Select;
const [{ key: WEEK }] = TIMES;

const componentCounts = getComponentsCount();

export default () => {
    const [state, setState] = useState({
        pageTimeType: WEEK,
    });
    const { dashboard } = useSelector((store: any) => ({
        dashboard: store.dashboard,
    }));
    const { list = [], pageList = [], info } = dashboard;
    useEffect(() => {
        actions.dashboard.getInfo();
    }, []);
    useEffect(() => {
        actions.dashboard.getPageActByTime({
            timeType: state.pageTimeType,
        });
    }, [state.pageTimeType]);
    return (
        <div className="thanos-blocks-dashboard">
            <Row>
                <Col span={12}>
                    <Card className="thanos-dashboard-card" title="页面总数">
                        {info.pageTotal}
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="thanos-dashboard-card" title="组件总数">
                        {componentCounts}
                    </Card>
                </Col>
                {/* <Col span={8}>
                    <Card className="thanos-dashboard-card" title="页面总数">
                        {info.pageTotal}
                    </Card>
                </Col> */}
            </Row>
            {/* <Row>
                <Col span={12}>
                    
                </Col>
                <Col span={12}>
                    <Card title="近期">
                        <Chart height={250} autoFit data={list}>
                            <Interval position="componentName*count" />
                        </Chart>
                    </Card>
                </Col>
            </Row> */}
            <Card className="thanos-dashboard-bizcharts" title="组件热度排名">
                <Chart height={250} autoFit data={list}>
                    <Interval position="componentName*count" />
                </Chart>
            </Card>
            <Card
                className="thanos-dashboard-bizcharts"
                title="灭霸页面活跃"
                extra={
                    <Select
                        style={{
                            width: '200px',
                        }}
                        value={state.pageTimeType}
                        onChange={(value) => {
                            setState({
                                pageTimeType: value,
                            });
                        }}
                    >
                        {TIMES.map(({ key, name }) => {
                            return (
                                <Option value={key} key={key}>
                                    {name}
                                </Option>
                            );
                        })}
                    </Select>
                }
            >
                <Chart height={250} autoFit data={pageList} interactions={['element-active']}>
                    <Line position="time*count" />
                    <Point position="time*count" shape='circle' />
                    <Tooltip
                        shared
                        itemTpl={`<li style="margin-bottom: 15px" data-index={index}>
                            <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                            创建数量: {value}
                        </li>`}
                        triggerOn="hover"
                        showCrosshairs
                    />
                    <Axis
                        name="time"
                        label={{
                            autoHide: false,
                            autoEllipsis: false,
                        }}
                    />
                </Chart>
            </Card>
        </div>
    );
};
