import React from 'react';
import { connect, actions } from 'kredux';
import AddProjectBtn from './components/AddProjectBtn';
import ProjectCard from './components/ProjectCard';
import { getObjectStorage } from 'Src/utils';
import './style.scss';

@connect(({project}) => ({
    project
}))
export default class Homepage extends React.Component {

    componentDidMount() {
        const projects = getObjectStorage('projects') || [];
        actions.project.setReducers({
            projects
        });
    }

    getContent = () => {
        const projects = getObjectStorage('projects') || [];
        const isEmpty = !projects.length;
        if (isEmpty) {
            return <div className={'homepage-empty-project'}>
                您还没有使用灭霸管理项目，赶快使用起来吧。
                <div className='homepage-add-project'>
                    <AddProjectBtn/>
                </div>
            </div>;
        } else {
            return <div className='homepage-projects'>
                {
                    projects.map((project) => {
                        return <ProjectCard key={project.name} item={project}/>;
                    })
                }
            </div>;
        }
    }

    getActions = () => {
        const projects = getObjectStorage('projects') || [];
        const isEmpty = !projects.length;
        if (isEmpty) {
            return null;
        }
        return <div className='homepage-title-actions'>
            <AddProjectBtn/>
        </div>;
    }

    render() {
        return (
            <div className={'homepage-background'}>
                <div className={'homepage-title'}>
                    <span className='homepage-title-text'>Thanos</span>
                    {this.getActions()}
                </div>
                {this.getContent()}
            </div>
        );
    }
}
