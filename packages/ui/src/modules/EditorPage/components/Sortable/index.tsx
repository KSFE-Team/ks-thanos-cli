import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { message } from 'antd';
import { handlePageJson, HandlePageJson, checkAddComponent } from '../../utils';
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
            // chosenClass="chosen"
            group={{
                name: 'materials',
                pull: 'clone',
            }}
            onChange={(eva) => {
                console.log('onchange', eva);
                const { clone, to } = eva;
                const checkResult = checkAddComponent(page.pageJson, clone.dataset, to.id);
                const warningdom = document.getElementsByClassName('warning');
                const adddom = document.getElementsByClassName('add');
                if (warningdom && warningdom.length > 0) {
                    warningdom[0].className = className;
                }
                if (adddom && adddom.length > 0) {
                    adddom[0].className = className;
                }
                if (checkResult !== true) {
                    to.className = `${className} warning`;
                } else {
                    to.className = `${className} add`;
                }
                setTimeout(() => {
                    to.className = className;
                }, 1000);
            }}
            onAdd={(eva) => {
                const { clone, newIndex, oldIndex, from, path } = eva;
                const [parent] = path;
                const checkResult = checkAddComponent(page.pageJson, clone.dataset, parent.id);
                /* 从物料区过来则是添加节点，否则为更新节点 */
                if (clone.className.includes('thanos-editor-block-item')) {
                    if (checkResult === true) {
                        handlePageJson({
                            type: ACTION.ADD,
                            componentName: clone.dataset.name,
                            index: newIndex,
                            parentId: parent.id,
                            pageJson: page.pageJson,
                        });
                    } else {
                        message.warning(checkResult);
                    }
                } else if (checkResult === true) {
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
                } else {
                    message.warning(checkResult);
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
