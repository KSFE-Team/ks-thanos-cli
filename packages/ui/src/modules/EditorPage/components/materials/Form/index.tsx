import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import ComponentRender from '../../ComponentRender';
import * as tools from './utils';
import FormConfig from './config';
import { handlePageJson } from '../../../utils';
import { ACTION } from '../../../utils/constants';
import './index.scss';

interface MaterialFormProps {
    components: any;
    id: string;
    page: any;
}

const MaterialForm = (props: MaterialFormProps) => {
    const { components = [], id, page } = props;
    const [nextStep, setNextStep] = useState({});
    return (
        <div className="form-container">
            <div className="form-title">表单容器</div>
            <div className="form-container-background">
                <ReactSortable
                    className="react-sortable-drop-container"
                    list={components}
                    setList={(result) => {}}
                    animation={150}
                    id={id}
                    group={{
                        name: 'materials',
                        pull: 'clone',
                    }}
                    onAdd={(eva) => {
                        const { clone, newIndex, path } = eva;
                        const [parent] = path;
                        handlePageJson({
                            type: ACTION.ADD,
                            componentName: clone.dataset.name,
                            index: newIndex,
                            parentId: parent.id,
                            pageJson: page.pageJson,
                        });
                    }}
                    onUpdate={(eva) => {
                        const { clone, newIndex, oldIndex, from, path } = eva;
                        const [parent] = path;
                        // setNext;
                        // handlePageJson({
                        //     type: ACTION.UPDATE,
                        //     index: newIndex,
                        //     oldIndex,
                        //     parentId: parent.id,
                        //     oldParentId: from.id,
                        //     pageJson: page.pageJson,
                        //     id: clone.dataset.id,
                        // });
                        setNextStep({
                            func: handlePageJson,
                            params: {
                                type: ACTION.UPDATE,
                                index: newIndex,
                                oldIndex,
                                parentId: parent.id,
                                oldParentId: from.id,
                                pageJson: page.pageJson,
                                id: clone.dataset.id,
                            },
                        });
                    }}
                    onEnd={() => {
                        if (nextStep.func) {
                            nextStep.func(nextStep.params);
                            setNextStep({});
                        }
                    }}
                >
                    {components.map((itemProps: any, index: number) => {
                        return (
                            <div className="form-item-container" key={`${itemProps.id}`}>
                                <ComponentRender {...itemProps} index={index} />
                            </div>
                        );
                    })}
                </ReactSortable>
            </div>
        </div>
    );
};

export { MaterialForm as component, FormConfig as config, tools };
