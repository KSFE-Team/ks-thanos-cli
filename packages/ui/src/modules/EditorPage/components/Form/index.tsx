import React from 'react';
import { Form, Input } from 'antd';
import './style.scss';

const { Item: FormItem } = Form;

export default () => {
    return (
        <div className="thanos-editor-form">
            <div className="editor-form-container">
                <div className="editor-form-title">配置</div>
                <div className="editor-form-content">
                    <Form>
                        <FormItem label="页面名称" labelCol={{ xs: 24 }} labelAlign="left">
                            <Input />
                        </FormItem>
                        <FormItem label="页面名称" labelCol={{ xs: 24 }} labelAlign="left">
                            <Input />
                        </FormItem>
                        <FormItem label="页面名称" labelCol={{ xs: 24 }} labelAlign="left">
                            <Input />
                        </FormItem>
                        <FormItem label="页面名称" labelCol={{ xs: 24 }} labelAlign="left">
                            <Input />
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    );
};
