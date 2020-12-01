import React from 'react';
import { Modal } from 'antd';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { getComponents } from 'Src/modules/EditorPage/utils/constants';
import { handlePageJson } from '../../utils';
import { ACTION } from '../../utils/constants';
import './style.scss';

const Confirm = Modal.confirm;

export default (props: any) => {
    const componentMap = getComponents();
    const ComponentByName = componentMap[props.componentName].component;
    const page = useSelector((store: any) => store.page);
    const id = page.selectedId.split('_')[0];
    return (
        <div
            className={`${props.id === id ? 'component-container-active' : 'component-container'}`}
            onClick={(e) => {
                e.stopPropagation();
                if (page.selectedId !== `${props.id}_${props.componentName}`) {
                    actions.page.setReducers({
                        selectedId: `${props.id}_${props.componentName}`,
                    });
                }
            }}
        >
            <ComponentByName {...props} key={props.id} />
            <span
                className="close_item"
                onClick={(e) => {
                    e.stopPropagation();
                    Confirm({
                        title: '请确认删除组件',
                        content: '删除后其配置会消失，请谨慎操作',
                        onOk: () => {
                            handlePageJson({
                                type: ACTION.DELETE,
                                id: props.id,
                                pageJson: page.pageJson,
                                undoStack: page.undoStack,
                            });
                        },
                    });
                }}
            >
                X
            </span>
        </div>
    );
};
