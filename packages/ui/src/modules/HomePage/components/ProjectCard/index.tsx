import React from 'react';
import { FolderOpenFilled, DeleteFilled } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { goto, setObjectStorage } from 'Src/utils';
import { ProjectItem } from '../../types';

import './style.scss';

interface ProjectCard {
    item: ProjectItem;
}

export default (props: ProjectCard) => {
    const { homepage } = useSelector((store: any) => ({ homepage: store.homepage }));
    const { item } = props;
    const { projects } = homepage;
    return (
        <div
            className="homepage-project"
            onClick={() => {
                setObjectStorage('currentProject', item);
                actions.homepage.setReducers({
                    currentPath: item,
                });
                goto.push('/workspace/');
            }}
        >
            <div className="project-title">{item.name}</div>
            <div className="project-desc">{item.path}</div>
            <div className="project-tools">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        actions.global.runCommand(`open ${item.path}`);
                    }}
                    className="project-tools-btn project-tools-folder"
                >
                    <FolderOpenFilled />
                </div>
                <div className="project-tools-split" />
                <Popconfirm
                    title={
                        <div>
                            <div>
                                <div>确认要删除此项目?</div>
                                <div>仅在灭霸管理中删除记录，并不直接删除文件。</div>
                            </div>
                        </div>
                    }
                    onConfirm={(e) => {
                        if (e) {
                            e.stopPropagation();
                        }
                        const filterProjects = projects.filter(({ name }: ProjectItem) => {
                            return name !== item.name;
                        });
                        actions.homepage.updateProjectList({
                            replace: filterProjects,
                        });
                    }}
                    onCancel={(e) => {
                        if (e) {
                            e.stopPropagation();
                        }
                    }}
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="project-tools-btn project-tools-delete"
                    >
                        <DeleteFilled />
                    </div>
                </Popconfirm>
            </div>
        </div>
    );
};
