import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'kredux';
import Page from './class';
import './style.scss';
import Blocks from '../Blocks';

export default () => {
    const { page } = useSelector((store: any) => ({ page: store.page }));
    const { pageJson } = page;
    const { components = [] } = pageJson;
    useEffect(() => {
        actions.page.setReducers({
            pageJson: Page.getInitJson(),
        });
    }, []);
    return (
        <div className="thanos-editor-page">
            {pageJson.title}
            <div>
                {components.map((config: any) => (
                    <Blocks {...config} />
                ))}
            </div>
        </div>
    );
};
