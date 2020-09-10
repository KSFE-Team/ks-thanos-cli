import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const FormItemRender = (props) => {
    const { form, configs } = props;
    const { Item: FormItem } = form;
    return (
        <Fragment>
            {
                configs.map(({ key, title, config, component }) => {
                    return (
                        <FormItem label={title} key={key} name={key} {...config}>
                            {component}
                        </FormItem>
                    );
                })
            }
        </Fragment>

    );
};

FormItemRender.propTypes = {
    form: PropTypes.object,
    configs: PropTypes.array
};

export default FormItemRender;
