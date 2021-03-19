import React, { useEffect } from 'react';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { Chart, Tooltip, Legend, Facet } from 'bizcharts';

// eslint-disable-next-line consistent-return
const getTypeColor = (type: string) => {
    if (type === '项目模块级使用率(%)') {
        return '#1890ff';
    }
    if (type === '项目页面级使用率(%)') {
        return '#2fc25b';
    }
};

export default () => {
    const { dashboard } = useSelector((store: any) => ({
        dashboard: store.dashboard,
    }));
    const { projectList = [], systemList = [] } = dashboard;
    useEffect(() => {
        actions.dashboard.getListByProject();
    }, []);
    useEffect(() => {
        actions.dashboard.getSystemList();
    }, []);

    const handleData = (className: string, type: string) => {
        const arr: any = [];
        for (let i = 0; i < projectList.length; i++) {
            const project = projectList[i];
            const obj: any = {};
            obj.class = className;
            const systemDetail = systemList.filter((system: any) => project.projectName.indexOf(system.clientId) > 0);
            obj.country = systemDetail[0] && systemDetail[0].name;
            obj.type = type;
            if (className === '项目模块级使用率(%)' && type === '1') {
                if (project.totalModules && systemDetail[0] && systemDetail[0].totalModules) {
                    obj.value = parseFloat(((project.totalModules / systemDetail[0].totalModules) * 100).toFixed(2));
                }
            } else if (className === '项目模块级使用率(%)' && type === '2') {
                if (project.totalModules && systemDetail[0] && systemDetail[0].totalModules) {
                    obj.value = parseFloat(
                        (100 - (project.totalModules / systemDetail[0].totalModules) * 100).toFixed(2),
                    );
                }
            } else if (className === '项目页面级使用率(%)' && type === '1') {
                if (project.totaolRate && systemDetail[0] && systemDetail[0].totalModules) {
                    obj.value = parseFloat((project.totaolRate / systemDetail[0].totalModules).toFixed(2));
                }
            } else if (className === '项目页面级使用率(%)' && type === '2') {
                if (project.totaolRate && systemDetail[0] && systemDetail[0].totalModules) {
                    obj.value = parseFloat((100 - project.totaolRate / systemDetail[0].totalModules).toFixed(2));
                }
            }
            arr.push(obj);
        }

        return arr;
    };

    const echartsData = () => {
        const modeulData1 = handleData('项目模块级使用率(%)', '1');
        const modeulData2 = handleData('项目模块级使用率(%)', '2');
        const pageData1 = handleData('项目页面级使用率(%)', '1');
        const pageData2 = handleData('项目页面级使用率(%)', '2');
        return modeulData1.concat(modeulData2, pageData1, pageData2);
    };

    return (
        <Chart autoFit data={echartsData()} height={400} padding={[20, 20, 20, 70]}>
            <Legend visible={false} />
            <Tooltip showMarkers={false} />
            <Facet
                fields={['class']}
                type="rect"
                columnTitle={{
                    style: {
                        fontSize: 14,
                        fontWeight: 300,
                        fill: '#8d8d8d',
                    },
                }}
                eachView={(view, facet) => {
                    view.coordinate().transpose();

                    if (facet.columnIndex === 0) {
                        view.axis('country', {
                            tickLine: null,
                            line: null,
                        });
                        view.axis('value', false);
                    } else {
                        view.axis(false);
                    }
                    const color = getTypeColor(facet.columnValue);
                    view.interval()
                        .adjust('stack')
                        .position('country*value')
                        .color('type', [color, '#ebedf0'])
                        .size(20)
                        .label('value*type', (value: number, type: string) => {
                            if (type === '2') {
                                return null;
                            }
                            const offset = value < 30 ? 10 : -4;
                            return {
                                offset,
                            };
                        });
                    view.interaction('element-active');
                }}
            />
        </Chart>
    );
};
