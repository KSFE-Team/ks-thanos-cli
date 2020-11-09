import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { handlePageJson, HandlePageJson } from '../../utils';
import { ACTION } from '../../utils/constants';

interface NextStep {
    params?: HandlePageJson;
    func?(params: HandlePageJson): void;
}

export default (props: any) => {
    const { redux: page, id, className, list, children } = props;
    const [nextStep, setNextStep] = useState(() => {
        const stepState: NextStep = {};
        return stepState;
    });
    return (
        <ReactSortable
            className={className}
            list={list}
            setList={(result) => {}}
            animation={150}
            id={id}
            group={{
                name: 'materials',
                pull: 'clone',
            }}
            onAdd={(eva) => {
                const { clone, newIndex, oldIndex, from, path } = eva;
                /* 从物料区过来则是添加节点，否则为更新节点 */
                if (clone.className.includes('thanos-editor-block-item')) {
                    const [parent] = path;
                    handlePageJson({
                        type: ACTION.ADD,
                        componentName: clone.dataset.name,
                        index: newIndex,
                        parentId: parent.id,
                        pageJson: page.pageJson,
                    });
                } else {
                    const [parent] = path;
                    setTimeout(() => {
                        handlePageJson({
                            type: ACTION.UPDATE,
                            index: newIndex,
                            oldIndex,
                            parentId: parent.id,
                            oldParentId: from.id,
                            pageJson: page.pageJson,
                            id: clone.dataset.id,
                        });
                    }, 100);
                }
            }}
            onUpdate={(eva) => {
                const { clone, newIndex, oldIndex, from, path } = eva;
                const [parent] = path;
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
                if (nextStep.func && nextStep.params) {
                    nextStep.func(nextStep.params);
                    setNextStep({});
                }
            }}
        >
            {children}
        </ReactSortable>
    );
};
