import React from 'react';
import './style.scss';

export interface Config {
    title: string | React.ReactNode;
    key: string;
    component: React.ReactNode;
    config: any;
    desc?: string;
}
interface FormItemProps {
    form: any;
    configs: Config[];
}

const FormItemRender = (props: FormItemProps) => {
    const { form, configs } = props;
    const { Item: FormItem } = form;
    return (
        <>
            {configs.map(({ key, title, config, component, desc }) => {
                let label = title;
                if (desc) {
                    label = (
                        <div>
                            {title}
                            <div className="form-item-desc">{desc}</div>
                        </div>
                    );
                }
                return (
                    <FormItem label={label} key={key} name={key} {...config}>
                        {component}
                    </FormItem>
                );
            })}
        </>
    );
};

export default FormItemRender;
