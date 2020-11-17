import React from 'react';
import { useSelector } from 'react-redux';
import Logo from 'Src/components/Logo';
import AddProjectBtn from './components/AddProjectBtn';
import ProjectCard from './components/ProjectCard';
import { ProjectItem } from './types';
import './style.scss';

export default () => {
    const { homepage } = useSelector((store: any) => ({ homepage: store.homepage }));
    const { projects } = homepage;

    const getContent = () => {
        const isEmpty = !projects.length;
        if (isEmpty) {
            return (
                <div className="homepage-empty-project">
                    您还没有使用灭霸管理项目，赶快使用起来吧。
                    <div className="homepage-add-project">
                        <AddProjectBtn />
                    </div>
                </div>
            );
        }
        return (
            <div className="homepage-projects">
                {projects.map((project: ProjectItem) => {
                    return <ProjectCard key={project.name} item={project} />;
                })}
            </div>
        );
    };

    const getActions = () => {
        const isEmpty = !projects.length;
        if (isEmpty) {
            return null;
        }
        return (
            <div className="homepage-title-actions">
                <AddProjectBtn />
            </div>
        );
    };

    return (
        <div className="homepage-background">
            <div className="homepage-title">
                <Logo className="homepage-logo" />
                {getActions()}
            </div>
            {getContent()}
        </div>
    );
};
