import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'antd';
import Icon from '@ant-design/icons';
import './index.scss';

const FormItem = Form.Item;

/**
 * 搜索表单布局
 * @type {Object}
 */
export const SEARCH_FORM_LAYOUT = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    }
};

interface SearchFormProps {
    form: {
        getFieldDecorator: any
    },
    col: number, // 列宽 max：24
    components: ComponentConfig[], // 搜索项列表
    actions: React.ReactNode, // 按钮节点
    defaultExtend?: boolean, // 默认展开|闭合
    extend?: boolean, // 展开|闭合状态
    onExtend?(trigger: boolean): void, // 切换展开事件回掉
    bottom?: number, // formItem的marginBottom 数量
    split: number, // 自定义分割数量
}

interface ComponentConfig {
    title: string,
    key: string,
    component: any,
    render?(): void,
    options?: object,
}

export default class SearchForm extends Component<SearchFormProps> {
    static propTypes = {
        form: PropTypes.object,
        col: PropTypes.number, // 列宽 max：24
        components: PropTypes.array, // 搜索项列表
        actions: PropTypes.node, // 按钮节点
        defaultExtend: PropTypes.bool, // 默认展开|闭合
        extend: PropTypes.bool, // 展开|闭合状态
        onExtend: PropTypes.func, // 切换展开事件回掉
        bottom: PropTypes.number, // formItem的marginBottom 数量
    }

    static defaultProps = {
        col: 7,
        split: 3,
        bottom: 12
    }

    state = {
        extend: 'defaultExtend' in this.props ? this.props.defaultExtend : true
    }

    renderSearchItem = (item: ComponentConfig, hide: boolean) => {
        const { form, col, bottom } = this.props;
        const { getFieldDecorator } = form;
        if (item.render) {
            return item.render();
        } else {
            return <Col
                key={item.key}
                span={col}
            >
                <FormItem
                    {...SEARCH_FORM_LAYOUT}
                    style={{marginBottom: bottom}}
                    label={item.title}
                    className={hide ? 'hide-item' : ''}
                >
                    {
                        getFieldDecorator(item.key, (item.options || {}))(item.component)
                    }
                </FormItem>
            </Col>;
        }
    }

    /**
     * 根据展开状态获取名称
     */
    getExtend = (extend: boolean) => {
        if (!extend) {
            return {
                name: '收起',
                type: 'up'
            };
        } else {
            return {
                name: '展开',
                type: 'down'
            };
        }
    }

    /**
     * 渲染搜索布局
     */
    renderSeachForm = () => {
        const { components, split, actions, col, onExtend, bottom } = this.props;
        const dataSource = components.reduce((prev: any[], record: ComponentConfig) => {
            const length = prev.length;
            const lastItem: any[] = prev[length - 1];
            if (length && lastItem && lastItem.length < split) {
                lastItem.push(record);
            } else {
                prev.push([record]);
            }
            return prev;
        }, []);
        const isExtend = components.length > split;
        const extend = 'extend' in this.props ? this.props.extend : this.state.extend;
        let lastGroup: any[],
            actionStyle: object = {};
        if (dataSource[dataSource.length - 1].length === split) {
            lastGroup = [];
        } else {
            lastGroup = dataSource.pop();
        }
        const remainder = lastGroup.length % split;

        if (!dataSource.length && remainder < split - 1) {
            actionStyle = {
                ...actionStyle,
                textAlign: 'left',
                paddingLeft: '4px',
            };
        } else {
            actionStyle = {
                ...actionStyle,
                textAlign: 'right',
            };
        }
        const { name, type } = this.getExtend(!!extend);
        return <div className='kssearchform'>
            {
                dataSource.map((group: any[], index: number) => {
                    return <Row key={index} className={isExtend && index > 0 && extend ? 'extend' : ''}>
                        {
                            group.map((item: ComponentConfig) => this.renderSearchItem(item, Boolean(isExtend && index > 0 && extend)))
                        }
                    </Row>;
                })
            }
            <Row>
                {
                    lastGroup.map((item: ComponentConfig) => this.renderSearchItem(item, Boolean(isExtend && extend)))
                }
                <Col
                    span={isExtend && extend ? (col * split) : (col * (split - remainder))}
                    style={actionStyle}
                >
                    <FormItem
                        style={{ marginBottom: bottom }}
                    >
                        {
                            isExtend && <span>
                                <a
                                    className='more'
                                    onClick={() => {
                                        this.setState({
                                            extend: !extend
                                        });
                                        onExtend && onExtend(!extend);
                                    }}
                                >{name}<Icon type={type} /></a>
                            </span>
                        }
                        {actions}
                    </FormItem>
                </Col>
            </Row>
        </div>;
    }

    render() {
        return (
            <div>
                {this.renderSeachForm()}
            </div>
        );
    }
}
