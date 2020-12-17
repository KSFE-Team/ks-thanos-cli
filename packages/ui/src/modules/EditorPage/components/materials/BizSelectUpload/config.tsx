import React from 'react';
import { Form, Input, Select, Radio } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';
import { ALIAS, FIELD_DICT, ISREQUIRED_TYPE } from '../../../utils/constants';

const FormItem = Form.Item;
const { Option } = Select;
type ObjectType = {
    [key: string]: string;
};
const DEFAULT_OPTIONS: ObjectType = {
    image: '图片',
    video: '视频',
    audio: '音频',
};
const IS_MULTI = [
    {
        value: true,
        label: '多选',
    },
    {
        value: false,
        label: '单选',
    },
];
const RENAME_FIELD = {
    ...FIELD_DICT,
    MULTIPLE: 'multiple',
    MULTIPLE_LABEL: '是否多选',
    FILETYPE: 'fileType',
};

interface BizSelectUploadProps extends ComponentConfig {}

export default (props: BizSelectUploadProps) => {
    const { id, undoStack } = props;
    const config = props[id] || {};
    const children = Object.keys(DEFAULT_OPTIONS).map((item, index) => {
        return <Option key={index} value={item}>{`${DEFAULT_OPTIONS[item]}`}</Option>;
    });
    return (
        <div>
            <Form
                layout="vertical"
                onValuesChange={(_, allFields) => {
                    actions[id].setReducers(allFields);
                }}
                onBlur={() => {
                    const copyConfig = JSON.parse(JSON.stringify(config));
                    const undoItem = {
                        type: 'property',
                        formConfig: copyConfig,
                        id,
                        componentName: 'BizSelectUpload',
                    };
                    undoStack.push(undoItem);
                    actions.page.setReducers({
                        undoStack,
                    });
                }}
                fields={Object.keys(config).map((key) => ({
                    name: [key],
                    value: config[key],
                }))}
            >
                <Card title={config.componentName}>
                    <Form.Item name={RENAME_FIELD.LABEL} label={ALIAS.LABEL} required>
                        <Input placeholder="例如：广告图片" />
                    </Form.Item>
                    <FormItem name={RENAME_FIELD.KEY} label={ALIAS.KEY} required>
                        <Input placeholder="例如： fileId" />
                    </FormItem>
                    <Form.Item name={RENAME_FIELD.FILETYPE} label={ALIAS.TYPE} required>
                        <Select
                            placeholder="请选择"
                            style={{ width: '100%' }}
                            showSearch
                            filterOption={(input, option: any) =>
                                String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {children}
                        </Select>
                    </Form.Item>
                    <Form.Item name={RENAME_FIELD.MULTIPLE} label={RENAME_FIELD.MULTIPLE_LABEL} required>
                        <Radio.Group>
                            {IS_MULTI.map(({ value, label }, index) => (
                                <Radio key={index} value={value}>
                                    {label}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={RENAME_FIELD.ISREQUIRED} label={ALIAS.ISREQUIRED} required>
                        <Radio.Group>
                            {ISREQUIRED_TYPE.map(({ VALUE, LABEL }, index) => (
                                <Radio key={index} value={VALUE}>
                                    {LABEL}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                </Card>
            </Form>
        </div>
    );
};
