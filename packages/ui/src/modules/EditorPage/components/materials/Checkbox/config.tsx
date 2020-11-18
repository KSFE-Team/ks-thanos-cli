import React from 'react';
import { Form, Input, Radio } from 'antd';
// import { CloseCircleOutlined } from '@ant-design/icons';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
// import ConfigTable from 'Src/components/ConfigTable';
import ExtendOptions from 'Src/components/ExtendOptions';
import Card from 'Src/components/Card';
import { ISREQUIRED_TYPE, ALIAS, FIELD_DICT } from '../../../utils/constants';

const FormItem = Form.Item;

interface CheckboxConfigProps extends ComponentConfig {}

export default (props: CheckboxConfigProps) => {
    const { id } = props;
    const config = props[id] || {};
    // const { options = [] } = config;
    // const [columns] = useState([
    //     {
    //         title: '选项名称',
    //         dataIndex: 'label',
    //         col: 11,
    //         render: (item: any, record: any, index: any) => (
    //             <Input
    //                 value={record.props.value}
    //                 placeholder="例如： 选项"
    //                 // onChange={this.handleChange.bind(this, VALUE, index)}
    //             />
    //         ),
    //     },
    //     {
    //         title: '选项值',
    //         dataIndex: 'value',
    //         col: 11,
    //         render: (item: any, record: any, index: any) => (
    //             <Input
    //                 value={record.label}
    //                 placeholder="例如： 姓名"
    //                 // onChange={this.handleChange.bind(this, TEXT, index)}
    //             />
    //         ),
    //     },
    //     {
    //         title: '',
    //         col: 2,
    //         render: (text: any, record: any, index: any) => {
    //             return (
    //                 <div style={{ lineHeight: '32px' }}>
    //                     <CloseCircleOutlined
    //                         onClick={() => {
    //                             // this.handleDeleteCheckItem(index);
    //                         }}
    //                     />
    //                 </div>
    //             );
    //         },
    //     },
    // ]);
    return (
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
                <FormItem name={FIELD_DICT.LABEL} label={ALIAS.LABEL} required>
                    <Input placeholder="例如： 姓名" />
                </FormItem>
                <FormItem name={FIELD_DICT.KEY} label={ALIAS.KEY} required>
                    <Input placeholder="例如： name" />
                </FormItem>
                <Form.Item name={FIELD_DICT.ISREQUIRED} label={ALIAS.ISREQUIRED} required>
                    <Radio.Group>
                        {ISREQUIRED_TYPE.map(({ VALUE, LABEL: label }, index) => (
                            <Radio key={index} value={VALUE}>
                                {label}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>
            </Card>
            <Card title="Option 配置">
                <ExtendOptions labelText="选项名称" valueText="选项值" config={config} id={id} />
            </Card>
        </Form>
    );
};
