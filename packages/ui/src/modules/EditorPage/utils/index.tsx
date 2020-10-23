import React from 'react';
import { Input, Form } from 'antd';
import { ALL_COMPONENTS } from '../components/materials/index';

const KSForm = (props: any) => {
    console.log('formProps====>', props);
    return <Form {...props} />;
};

const KSInput = (props: any) => {
    console.log('InputProps====>', props);
    const { label, ...res } = props;
    return (
        <Form.Item label={label}>
            <Input
                {...res}
                style={{
                    width: '300px',
                }}
            />
        </Form.Item>
    );
};

/**
 * 视图区组件渲染
 */
export const renderComponent = (componentData: any) => {
    componentData.forEach(element => {
        
    });
};
