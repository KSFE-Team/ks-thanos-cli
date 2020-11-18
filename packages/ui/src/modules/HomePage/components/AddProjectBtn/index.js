import React, { Fragment } from 'react';
import { actions } from 'kredux';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { PlusOutlined, ImportOutlined } from '@ant-design/icons';
import SelectPathModal from 'Src/components/SelectPathModal';
import InitModal from '../InitModal';

export default (props) => {
    const { homepage, global } = useSelector((store) => ({
        homepage: store.homepage,
        global: store.global,
    }));
    const { initModalVisible, projects } = homepage;
    const { isShowFolder, currentPath } = global;

    const handleSelectProject = (add = '') => {
        actions.global.selectFolder({
            path: currentPath + add
        });
    };

    return (
        <Fragment>
            <Button
                onClick={() => {
                    handleSelectProject('');
                }}
            >
                <ImportOutlined />导入项目
            </Button>
            <Button
                className='mar-l-16'
                type='primary'
                onClick={() => {
                    actions.homepage.setReducers({
                        initModalVisible: true
                    });
                }}
            >
                <PlusOutlined />创建项目
            </Button>
            {/* 项目初始化弹框 */}
            {
                isShowFolder && <SelectPathModal
                    preCheckFunc={() => {
                        const { fileList } = global;
                        const pass = fileList.some(({name}) => name === 'package.json');
                        return {
                            pass,
                            msg: pass ? '' : '请选择正确的项目根目录'
                        };
                    }}
                    onSubmit={() => {
                        // let { projects, currentPath } = getState().global;
                        const name = currentPath.substring(currentPath.lastIndexOf('/') + 1);
                        /* 没有重复路径 */
                        if (projects.every(({ path }) => path !== currentPath)) {
                            projects.push({
                                path: currentPath,
                                name
                            });
                        }
                        actions.homepage.setReducers({
                            currentPath,
                            cwd: currentPath,
                        });
                        actions.homepage.updateProjectList({
                            replace: projects
                        });
                    }}
                />
            }
            {/* 项目初始化弹框 */}
            {
                initModalVisible && <InitModal/>
            }
        </Fragment>
    );
};
