import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect, actions } from 'kredux';
import { Button } from 'antd';
import { PlusOutlined, ImportOutlined } from '@ant-design/icons';
import SelectPathModal from '../../../project/SelectPathModal';
import InitModal from '../../../project/InitModal';

@connect(({project}) => ({
    project
}))
export default class AddProjectBtn extends React.Component {

    static propTypes = {
        project: PropTypes.object,
    }

    handleSelectProject = (add = '') => {
        const { currentPath } = this.props.project;

        actions.project.selectFolder({
            path: currentPath + add
        });
    }

    render() {
        const { isShowFolder, initModalVisible } = this.props.project;
        return (
            <Fragment>
                <Button
                    onClick={() => {
                        this.handleSelectProject('');
                    }}
                ><ImportOutlined />导入项目</Button>
                <Button
                    className='mar-l-16'
                    type='primary'
                    onClick={() => {
                        actions.project.setReducers({
                            initModalVisible: true
                        });
                    }}
                ><PlusOutlined />创建项目</Button>
                {
                    isShowFolder && <SelectPathModal
                        preCheckFunc={() => {
                            const { fileList } = this.props.project;
                            const pass = fileList.some(({name}) => name === 'package.json');
                            return {
                                pass,
                                msg: pass ? '' : '请选择正确的项目根目录'
                            };
                        }}
                        onSubmit={() => {
                            actions.project.confirmFilePath();
                        }}
                    />
                }
                {/* 项目初始化弹框 */}
                {
                    initModalVisible && <InitModal/>
                }
            </Fragment>
        );
    }
}
