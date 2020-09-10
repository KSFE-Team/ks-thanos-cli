import React from 'react';
import PropTypes from 'prop-types';
import { FolderOpenFilled, DeleteFilled } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { connect, actions } from 'kredux';
import { goto, setObjectStorage } from 'Src/utils';
import './style.scss';

@connect(({project}) => ({
    project
}))
export default class ProjectCard extends React.Component {

    static propTypes = {
        project: PropTypes.object,
        item: PropTypes.object,
    }

    render() {
        const { item } = this.props;
        return (
            <div
                className='homepage-project'
                onClick={() => {
                    setObjectStorage('', item);
                    goto.push('/project/');
                }}
            >
                <div className='project-title'>
                    {item.name}
                </div>
                <div className='project-desc'>
                    {item.path}
                </div>
                <div className='project-tools'>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            actions.project.runCommand(`open ${item.path}`);
                        }}
                        className='project-tools-btn project-tools-folder'
                    >
                        <FolderOpenFilled />
                    </div>
                    <div className='project-tools-split'></div>
                    <Popconfirm
                        title={<div>
                            <div>
                                确认要删除此项目?
                            </div>
                            <div>
                                仅在灭霸管理中删除记录，并不直接删除文件。
                            </div>
                        </div>}
                        onConfirm={(e) => {
                            e.stopPropagation();
                            const { projects } = this.props.project;
                            const filterProjects = projects.filter(({name}) => {
                                return name !== item.name;
                            });
                            actions.project.updateProjectList({
                                replace: filterProjects
                            });
                        }}
                        onCancel={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className='project-tools-btn project-tools-delete'
                        >
                            <DeleteFilled />
                        </div>
                    </Popconfirm>
                </div>
            </div>
        );
    }
}
