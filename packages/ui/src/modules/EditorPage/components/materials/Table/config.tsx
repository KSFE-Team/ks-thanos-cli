import React from 'react';
import { Form, Input, Radio, Select } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';
import { FETCH_METHOD, IS_PAGINATION, IS_ROW_SELECTION, ROW_SELECTION_TYPE } from './constants';
import TableColumnsConfig from './TableColumnsConfig';

const FormItem = Form.Item;
const { Group: RadioGroup } = Radio;
const { Option } = Select;

interface TableConfigProps extends ComponentConfig {}

export default (props: TableConfigProps) => {
    const { id } = props;
    const config = props[id] || {};

    const getSelectedRowTypeByShow = () => {
        const { showSelectedRows } = config;
        if (showSelectedRows) {
            return (
                <Form.Item name="showSelectedRowsType" label="选中类型" required>
                    <Select placeholder="请求方式">
                        {ROW_SELECTION_TYPE.map(({ VALUE, LABEL }) => {
                            return (
                                <Option key={VALUE} value={VALUE}>
                                    {LABEL}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            );
        }
        return null;
    };

    return (
        <div>
            <Form
                layout="vertical"
                onValuesChange={(_, allFields) => {
                    actions[id].setReducers(allFields);
                }}
                fields={Object.keys(config).map((key) => ({
                    name: [key],
                    value: config[key],
                }))}
            >
                <Card title="基础配置">
                    <FormItem name="api" label="请求地址" required>
                        <Input placeholder="例如： /user/list" />
                    </FormItem>
                    <FormItem name="method" label="请求方式" required>
                        <Select placeholder="请求方式">
                            {FETCH_METHOD.map(({ VALUE, LABEL }) => {
                                return (
                                    <Option key={VALUE} value={VALUE}>
                                        {LABEL}
                                    </Option>
                                );
                            })}
                        </Select>
                    </FormItem>
                    <Form.Item name="showPagination" label="是否分页" required>
                        <RadioGroup>
                            {IS_PAGINATION.map(({ VALUE, LABEL }, index) => (
                                <Radio key={index} value={VALUE}>
                                    {LABEL}
                                </Radio>
                            ))}
                        </RadioGroup>
                    </Form.Item>
                    <Form.Item name="showSelectedRows" label="是否行选中" required>
                        <RadioGroup>
                            {IS_ROW_SELECTION.map(({ VALUE, LABEL }, index) => (
                                <Radio key={index} value={VALUE}>
                                    {LABEL}
                                </Radio>
                            ))}
                        </RadioGroup>
                    </Form.Item>
                    {getSelectedRowTypeByShow()}
                </Card>
                <Card title="表头配置">
                    <TableColumnsConfig id={id} config={config} />
                </Card>
            </Form>
        </div>
    );
};
