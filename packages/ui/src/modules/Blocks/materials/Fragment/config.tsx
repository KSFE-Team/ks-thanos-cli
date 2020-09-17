import React, { Component } from 'react';
import { actions } from 'kredux';
import { Form, Input, Button, Row, Col } from 'antd';
import { getDataEntry, ALL_TOOLS } from '../../materials';
import {findComponent, getTools, getUniqueID, saveComponent} from '../../utils';
import ComponentType from 'Src/pages/GeneratePage/materials/Config/ComponentType';

const FormItem = Form.Item;

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

const FRAGMENT_NAME = 'fragmentName';

interface FragmentConfigProps{
    onSave(pageJSON:any): void,
    pageJSON: any
}

interface FragmentConfigState {
    formData: object;
    isTouch: boolean;
    current: {
        id: string;
        components: any[]
    }
}

export default class FragmentConfig extends Component<FragmentConfigProps, FragmentConfigState> {

    constructor(props: any) {
        super(props);
        const { pageJSON } = props;
        const { components } = pageJSON;
        const current = findComponent(components);
        this.state = {
            formData: {

            },
            isTouch: false,
            current
        };
    }

    static getDerivedStateFromProps(props: any, state: any) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                formData: {
                    [FRAGMENT_NAME]: current[FRAGMENT_NAME],
                }
            };
        } else {
            return state;
        }
    }

    /**
     * 插入组件事件
     */
    handleClick = (componentName: string) => {
        const insertComponent = ALL_TOOLS[componentName].getInitJson();
        let { current } = this.state;
        current = {
            ...current,
            components: [
                ...current.components || [],
                {
                    ...insertComponent,
                    id: getUniqueID(),
                }
            ]
        };
        actions.generatePage.insertFormComponent({insertComponent, targetId: current.id});
        this.setState({
            current
        });
    };

    handleSave = () => {
        const { formData, current } = this.state;
        const { pageJSON, onSave } = this.props;
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            ...current,
            ...formData,
        });
        onSave && onSave(pageJSON);
    };

    handleChange = (key: string, value: string|boolean) => {
        const { formData } = this.state;
        this.setState({
            formData: {
                ...formData,
                [key]: value
            },
            isTouch: true
        });
    };

    render() {
        const { formData } = this.state;
        const dataSource = getTools(getDataEntry());
        return <div>
            <FormItem
                label='区域块名称'
                {...formItemLayout}
            >
                <Input
                    value={formData[FRAGMENT_NAME]}
                    placeholder='例如： fragmentName'
                    onChange={(e) => {
                        const value = e.target.value;
                        this.handleChange(FRAGMENT_NAME, value);
                    }}
                />
            </FormItem>
            <FormItem
                label='可配置组件'
                {...formItemLayout}
            >
                <ComponentType
                    dataSource={[dataSource] || []}
                    span={12}
                    onClick={this.handleClick}
                    title=''
                />
            </FormItem>
            <FormItem>
                <Row>
                    <Col>
                        <Button
                            onClick={this.handleSave}
                            type='primary'
                        >确定</Button>
                    </Col>
                </Row>
            </FormItem>
        </div>;
    }
}
