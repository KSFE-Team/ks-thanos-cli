import React from 'react';
import { Button, Row, Col } from 'antd';
import ComponentRender from '../../ComponentRender';
import * as tools from './utils';
import FormConfig from './config';
import Sortable from '../../Sortable';
import { FORM_TYPES } from './constants';
import './index.scss';

const [, { key: SEARCH_FORM }, { key: MODAL_FORM }] = FORM_TYPES;
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

const renderForm = (props: any, type: string): JSX.Element => {
    const { id, page, components = [] } = props;
    const col = 8;

    switch (type) {
        case SEARCH_FORM:
            return (
                <Sortable
                    className="react-sortable-drop-container search-form-container"
                    list={components}
                    id={id}
                    redux={page}
                >
                    {components.length > 0 && (
                        <Row style={{ width: '100%' }}>
                            {components.map((item: any, index: number) => {
                                return (
                                    <Col
                                        key={index}
                                        span={components.length < 3 ? undefined : col}
                                        style={{ padding: '0 3px' }}
                                    >
                                        <ComponentRender {...item} index={index} />
                                    </Col>
                                );
                            })}
                            <Col span={4} offset={20}>
                                <Button style={{ background: '#1890ff' }}>查询</Button>
                                <Button style={{ background: '#1890ff' }}>新增</Button>
                            </Col>
                        </Row>
                    )}
                </Sortable>
            );
        default:
            return (
                <Sortable
                    className="react-sortable-drop-container nomall-form-wrapper"
                    list={components}
                    id={id}
                    redux={page}
                >
                    {components.map((itemProps: any, index: number) => {
                        return (
                            <div key={`${itemProps.id}`}>
                                <ComponentRender {...itemProps} index={index} />
                            </div>
                        );
                    })}
                </Sortable>
            );
    }
};

const MaterialForm = (props: MaterialFormProps) => {
    const { id } = props;
    const config = props[id];
    return (
        <div className="form-container">
            <div className="form-title">表单容器</div>
            <div className="form-container-background">{renderForm(props, config.type)}</div>
            {getModalFormActions(config.type)}
        </div>
    );
};

export { MaterialForm as component, FormConfig as config, tools };
