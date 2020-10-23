import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Row, Col, Radio, Tabs, message } from 'antd';
import { actions, connect } from 'kredux';
import { FORM_TYPES } from './constants';
import PropTypes from 'prop-types';
import { getDataEntry, getCloudComponents, ALL_TOOLS } from 'Src/components';
import { getTools } from 'Src/utils';
import ComponentType from 'Src/pages/GeneratePage/components/Config/ComponentType';
import { CHARACTER_REG, CHARACTER_MESSAGE, FORM_MESSAGE } from 'Src/utils/constants';
import { checkFieldData } from 'Src/utils/utils';
import { filterCloudComponents, initState } from './utils';
import ClearButton from 'Src/components/ClearButton';

const [{ key: NORMAL }, { key: SEARCH }] = FORM_TYPES;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TabPane } = Tabs;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    }
};
const STATE_NAME = 'stateName';
const TYPE = 'type';
const LINK = 'link';
const SAVE_API = 'saveApi';
const UPDATE_API = 'updateApi';
const GET_API = 'getApi';
const PARAM_KEY = 'paramKey';
interface FormConfigProps {
    onSave(pageJSON: any): void,
    pageJSON: any,
    generatePage: any,
}

@connect(({ generatePage }) => ({
    generatePage
}))
export default class FormConfig extends Component<FormConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state=initState

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = components.find(({ configVisible }) => configVisible);
            return {
                formData: {
                    [STATE_NAME]: current[STATE_NAME],
                    [TYPE]: current[TYPE],
                    [LINK]: current[LINK],
                    [SAVE_API]: current[SAVE_API],
                    [UPDATE_API]: current[UPDATE_API],
                    [GET_API]: current[GET_API],
                    [PARAM_KEY]: current[PARAM_KEY],
                },
                current
            };
        } else {
            return state;
        }
    }

    componentDidMount() {
        actions.generatePage.loadCloudComponentList();
    }

    /**
     * 插入组件事件
     */
    handleClick = (componentName: string) => {
        const insertComponent = ALL_TOOLS[componentName].getInitJson();
        const current = this.props.pageJSON.components.find(({ configVisible }) => configVisible);
        actions.generatePage.insertFormComponent({insertComponent, targetId: current.id});
    }

    /**
     * 组件保存
     */
    handleSave = () => {
        const { formData } = this.state;
        const { error } = checkFieldData('Form', formData);
        const { pageJSON, onSave } = this.props;
        // 提交检验
        if (error) {
            message.error(FORM_MESSAGE);
            return false;
        }
        pageJSON.components = pageJSON.components.map((component: any) => {
            if (component.configVisible) {
                component = {
                    ...component,
                    ...formData,
                    props: {
                        ...component.props,
                    }
                };
            }
            return component;
        });
        onSave && onSave(pageJSON);
    }

    /**
     * 组件保存
     */
    handleChange = (key: string, value: string, type: string = '') => {
        let current = value;
        if (type) {
            if (CHARACTER_REG.test(value)) {
                message.error(CHARACTER_MESSAGE);
                current = '';
            }
        }
        const { formData } = this.state;
        this.setState({
            formData: {
                ...formData,
                [key]: current
            },
            isTouch: true
        });
    };

    /**
     * 根据类型展示表单
     */
    getTypeForm = () => {
        const { formData } = this.state;
        switch (formData[TYPE]) {
            case SEARCH:
                return <Fragment>
                    {/* <FormItem
                        label={'新增/修改跳转地址'}
                        {...formItemLayout}
                    >
                        <Input
                            placeholder='新增/修改跳转地址'
                            value={formData[LINK]}
                            onChange={(e) => {
                                const { value } = e.target;
                                this.handleChange(LINK, value);
                            }}
                        />
                    </FormItem> */}
                </Fragment>;
            case NORMAL:
                return <Fragment>
                    <FormItem
                        label={'新增API'}
                        {...formItemLayout}
                        required={true}
                    >
                        <Input
                            placeholder='新增API'
                            value={formData[SAVE_API]}
                            onChange={(e) => {
                                const { value } = e.target;
                                this.handleChange(SAVE_API, value);
                            }}
                        />
                    </FormItem>
                    <FormItem
                        label={'修改API'}
                        {...formItemLayout}
                        required={true}
                    >
                        <Input
                            placeholder='修改API'
                            value={formData[UPDATE_API]}
                            onChange={(e) => {
                                const { value } = e.target;
                                this.handleChange(UPDATE_API, value);
                            }}
                        />
                    </FormItem>
                    <FormItem
                        label={'查询API'}
                        {...formItemLayout}
                        required={true}
                    >
                        <Input
                            placeholder='查询API'
                            value={formData[GET_API]}
                            onChange={(e) => {
                                const { value } = e.target;
                                this.handleChange(GET_API, value);
                            }}
                        />
                    </FormItem>
                    <FormItem
                        label={'路由参数'}
                        {...formItemLayout}
                        required={true}
                    >
                        <Input
                            placeholder='路由参数'
                            value={formData[PARAM_KEY]}
                            onChange={(e) => {
                                const { value } = e.target;
                                this.handleChange(PARAM_KEY, value);
                            }}
                        />
                    </FormItem>
                </Fragment>;
        }
    }

    render() {
        const { formData } = this.state;
        const { generatePage } = this.props;
        const { cloudComponentList } = generatePage;
        const dataSource = getTools(getDataEntry());
        const cloudDataSource = getTools(filterCloudComponents(cloudComponentList, getCloudComponents()));
        return <div>
            <Tabs
                defaultActiveKey={'1'}
                tabPosition={'left'}
            >
                <TabPane tab={`组件配置`} key={'1'}>
                    <FormItem
                        label={'绑定redux的Key'}
                        {...formItemLayout}
                    >
                        <Input
                            value={formData[STATE_NAME]}
                            placeholder='例如： userSearchForm | userInfo'
                            onChange={(e) => {
                                const value = e.target.value;
                                this.handleChange(STATE_NAME, value, 'filter');
                            }}
                        />
                    </FormItem>
                    <FormItem
                        label={'是否选中'}
                        {...formItemLayout}
                    >
                        <RadioGroup
                            value={formData[TYPE]}
                            onChange={(e) => {
                                const value = e.target.value;
                                this.handleChange(TYPE, value);
                            }}
                        >
                            {
                                FORM_TYPES.map(({ key, name }) => {
                                    return (
                                        <Radio key={key} value={key}>{name}</Radio>
                                    );
                                })
                            }
                        </RadioGroup>
                    </FormItem>
                    {
                        this.getTypeForm()
                    }
                    <FormItem>
                        <Row>
                            <Col>
                                <Button
                                    onClick={this.handleSave}
                                    type='primary'
                                >确定</Button>
                            </Col>
                            <ClearButton initState={initState} that={this}/>
                        </Row>
                    </FormItem>
                </TabPane>
                <TabPane tab={`子组件`} key={'2'}>
                    <FormItem
                        label={'可配置组件'}
                        {...formItemLayout}
                        style={{marginBottom: 0}}
                    >
                        <ComponentType
                            dataSource={[dataSource] || []}
                            span={12}
                            onClick={this.handleClick}
                            title={''}
                        />
                    </FormItem>
                    <FormItem
                        label={'云组件'}
                        {...formItemLayout}
                    >
                        <ComponentType
                            dataSource={[cloudDataSource] || []}
                            span={12}
                            onClick={this.handleClick}
                            title={''}
                        />
                    </FormItem>
                </TabPane>
            </Tabs>
        </div>;
    }
}
