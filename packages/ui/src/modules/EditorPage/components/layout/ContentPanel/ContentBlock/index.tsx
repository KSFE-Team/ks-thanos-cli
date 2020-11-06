import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import ContentItem from '../ContentItem';
import './style.scss';

export default (props: any) => {
    const { data } = props;
    const { groupTitle, components } = data;
    return (
        <>
            <div className="thanos-editor-blocks-group-title">{groupTitle}</div>
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
        </>
    );
};
