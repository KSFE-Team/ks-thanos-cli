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
    let splitIndex: any[] = [];
    const col = 8; // 存放 span 数大于 24 后的第一个 formItem 的 index 索引
    let colSpan = 0;
    components.forEach((item: any, index: number) => {
        // 累加 span 数
        colSpan += col;
        // 记录 span 数大于 24 后的第一个 item 的 index
        if (colSpan > 24) {
            splitIndex.push(index);
            colSpan = col;
        } else if (colSpan < 24) {
            splitIndex = [components.length + 1];
            colSpan = col;
        }
    });
    const showExtend = splitIndex.length > 0; // 是否需要收起/展开
    let fillGroup: any = [];
    let lastGroup = [];
    if (showExtend) {
        fillGroup = components.slice(0, splitIndex[splitIndex.length - 1]);
        lastGroup = components.slice(splitIndex[splitIndex.length - 1]);
    } else {
        fillGroup = [];
        lastGroup = components;
    }
    switch (type) {
        case SEARCH_FORM:
            return (
                <>
                    {fillGroup.length > 0 && (
                        <Row style={{ width: '100%', minHeight: '145px' }}>
                            {fillGroup.map((item: any, index: number) => {
                                return (
                                    <Col key={index} span={col} style={{ padding: '0 3px' }}>
                                        <Sortable
                                            className="react-sortable-drop-container"
                                            list={components}
                                            id={id}
                                            redux={page}
                                        >
                                            <div className="form-item-container" key={`${item.id}`}>
                                                <ComponentRender {...item} index={index} />
                                            </div>
                                        </Sortable>
                                    </Col>
                                );
                            })}
                        </Row>
                    )}
                    <Row gutter={4} style={{ width: '100%' }}>
                        <Col span={lastGroup.length === 0 ? 18 : col} style={{ padding: '0 3px' }}>
                            <Sortable className="react-sortable-drop-container" list={components} id={id} redux={page}>
                                {lastGroup.map((item: any, index: number) => {
                                    return (
                                        <div className="form-item-container" key={`${item.id}`}>
                                            <ComponentRender {...item} index={index} />
                                        </div>
                                    );
                                })}
                            </Sortable>
                        </Col>
                        <Col span={5} style={{ marginLeft: '10px' }}>
                            <Button style={{ background: '#1890ff' }}>查询</Button>
                            <Button style={{ background: '#1890ff' }}>新增</Button>
                        </Col>
                    </Row>
                </>
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
                            <div className="form-item-container" key={`${itemProps.id}`}>
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
