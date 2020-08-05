import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import { actions } from 'kredux';
import { projectContainer } from 'Models/project';
import SelectPathModal from '../SelectPathModal';

@projectContainer
export default class SelectPathInput extends Component {
    static propTypes = {
        project: PropTypes.object,
        onChange: PropTypes.func,
        value: PropTypes.string
    }

    handleSelectProject = (add = '') => {
        const { currentPath } = this.props.project;
        actions.project.selectFolder({
            path: currentPath + add
        });
    }

    onChange = (value) => {
        const { onChange } = this.props;
        onChange && onChange(value);
    }

    render() {
        const { isShowFolder } = this.props.project;
        const { value } = this.props;
        return (
            <Fragment>
                <Input
                    placeholder={'选择路径'}
                    value={value}
                    allowClear
                    onChange={(e) => {
                        const { value } = e.target;
                        this.onChange(value);
                    }}
                    addonAfter={<Icon
                        type={'folder'}
                        theme={'filled'}
                        // style={{color: 'rgba(135, 207, 246)'}}
                        style={{color: '#1890ff'}}
                        onClick={() => { this.handleSelectProject(); }}
                    />}
                />
                { isShowFolder && <SelectPathModal
                    onSubmit={(value) => {
                        this.onChange(value);
                    }}
                /> }
            </Fragment>
        );
    }
}
