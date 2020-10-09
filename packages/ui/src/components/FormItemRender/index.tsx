import React from 'react';

interface FormItemProps {
    form: any;
    configs: any[];
}

const FormItemRender = (props: FormItemProps) => {
    const { form, configs } = props;
    const { Item: FormItem } = form;
    return (
        <>
            {configs.map(({ key, title, config, component }) => {
                return (
                    <FormItem label={title} key={key} name={key} {...config}>
                        {component}
                    </FormItem>
                );
            })}
        </>
    );
};

export default FormItemRender;
