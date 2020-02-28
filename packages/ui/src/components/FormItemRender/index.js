import React, { Fragment } from 'react';
import { Form } from 'antd';
const { Item: FormItem } = Form;

export default (form, configs) => {
    const { getFieldDecorator } = form;
    return (
        <Fragment>
            {
                configs.map(({ key, title, config, component }) => {
                    return (
                        <FormItem label={title} key={key}>
                            {
                                getFieldDecorator(key, config)(component)
                            }
                        </FormItem>
                    );
                })
            }
        </Fragment>

    );
}
;
