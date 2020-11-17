import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Collapse } from 'antd';
import ContentItem from '../ContentItem';
import './style.scss';

const { Panel } = Collapse;

export default (props: any) => {
    const { data } = props;
    const { groupTitle, components } = data;
    return (
        <Collapse defaultActiveKey={['1']} ghost expandIconPosition="right" style={{ padding: '0' }}>
            <Panel header={groupTitle} key="1" style={{ padding: '0 0 0 5px' }}>
                <div className="thanos-editor-blocks-group-content">
                    <ReactSortable
                        className="thanos-editor-blocks-group-drop"
                        list={components}
                        setList={() => {}}
                        group={{
                            name: 'materials',
                            pull: 'clone',
                            put: false,
                        }}
                        sort={false}
                    >
                        {components.map((item: any, index: any) => {
                            return <ContentItem data={item} key={index} index={index} />;
                        })}
                    </ReactSortable>
                </div>
            </Panel>
        </Collapse>
    );
};
