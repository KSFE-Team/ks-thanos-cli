import React from 'react';
import './style.scss';

export interface Config {
    title: string | React.ReactNode;
    key: string;
    component: React.ReactNode;
    config: any;
    desc?: string;
    when?: string; // 根据前面表单项的值，判断当前表单项是否需要展示
}
interface FormItemProps {
    form: any;
    configs: Config[];
}

const FormItemRender = (props: FormItemProps) => {
    const { form, configs } = props;
    const { Item: FormItem } = form;

    return (
        <FormItem>
            {configs.map(({ key, title, config, component, desc, when }) => {
                let label = title;
                if (desc) {
                    label = (
                        <div>
                            {title}
                            <div className="form-item-desc">{desc}</div>
                        </div>
                    );
                }
                // console.log('form.getFieldValue(when)', form);
                // if (when && !form.getFieldValue(when)) {
                //     return null;
                // }
                return (
                    <FormItem label={label} key={key} name={key} {...config}>
                        {component}
                    </FormItem>
                );
            })}
        </FormItem>
    );
};

export default FormItemRender;
