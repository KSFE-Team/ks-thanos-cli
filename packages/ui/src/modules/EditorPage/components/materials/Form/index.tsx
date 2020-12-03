import React from 'react';
import { Button } from 'antd';
import ComponentRender from '../../ComponentRender';
import * as tools from './utils';
import FormConfig from './config';
import Sortable from '../../Sortable';
import { FORM_TYPES } from './constants';
import './index.scss';

const [, , { key: MODAL_FORM }] = FORM_TYPES;
interface MaterialFormProps {
    components: any;
    id: string;
    page: any;
}

const getModalFormActions = (type: string) => {
    switch (type) {
        case MODAL_FORM:
            return (
                <div className="modal-actions">
                    <Button>cancel</Button>
                    <Button className="mar-l-4" type="primary">
                        ok
                    </Button>
                </div>
            );
        default:
            return null;
    }
};

const MaterialForm = (props: MaterialFormProps) => {
    const { components = [], id, page } = props;
    const config = props[id];
    return (
        <div className="form-container">
            <div className="form-title">表单容器</div>
            <div className="form-container-background">
                <Sortable className="react-sortable-drop-container" list={components} id={id} redux={page}>
                    {components.map((itemProps: any, index: number) => {
                        return (
                            <div className="form-item-container" key={`${itemProps.id}`}>
                                <ComponentRender {...itemProps} index={index} />
                            </div>
                        );
                    })}
                </Sortable>
            </div>
            {getModalFormActions(config.type)}
        </div>
    );
};

export { MaterialForm as component, FormConfig as config, tools };
