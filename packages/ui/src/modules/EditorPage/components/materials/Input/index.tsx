import React from 'react';
import { Input, Form } from 'antd';
import { getInitJson, getTools } from './utils';
import InputConfig from './config';
// import { FORMITEM_LAYOUT } from 'Src/utils/constants';

interface KInputProps {
    config: any;
    generatePage: {
        pageJSON: any;
    };
}

// class KInput extends Component<KInputProps> {
//     render() {
//         const { config, generatePage, ...OtherProps } = this.props;
//         const { label = '' } = config;
//         return (
//             <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: 0 }} label={label}>
//                 <Input
//                     {...OtherProps}
//                     style={{
//                         width: '300px',
//                     }}
//                 />
//             </Form.Item>
//         );
//     }
// }
const KInput = (props: any) => {
    const { config = {}, generatePage, ...OtherProps } = props;
    const { label = '' } = config;
    return (
        <Form.Item {...{}} style={{ marginBottom: 0 }} label={label}>
            <Input
                {...OtherProps}
                style={{
                    width: '300px',
                }}
            />
        </Form.Item>
    );
};

export { KInput as component, getInitJson, getTools, InputConfig as config };
