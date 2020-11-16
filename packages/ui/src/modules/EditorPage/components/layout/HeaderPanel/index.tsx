import React from 'react';
import { RollbackOutlined, SaveOutlined, EnterOutlined } from '@ant-design/icons';
// import { actions } from 'kredux';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import Logo from 'Src/components/Logo';
import Button from 'Src/components/Button';
import { goto } from 'Src/utils';
import { getValidator, getPageData } from '../../../utils';

export default () => {
    const page = useSelector((store: any) => store.page);
    const { pageJson } = page;
    return (
        <div className="thanos-editor-header">
            <Button
                className="thanos-editor-back"
                onClick={() => {
                    goto.go(-1);
                }}
            >
                <EnterOutlined />
            </Button>
            <Logo className="thanos-editor-logo" />
            <div className="thanos-editor-actions">
                <Button title="undo" disabled>
                    <RollbackOutlined />
                </Button>
                <Button title="redo">
                    <RollbackOutlined
                        style={{
                            transform: 'scaleX(-1)',
                        }}
                    />
                </Button>
                <Button
                    title="发布"
                    className="thanos-editor-primary"
                    onClick={() => {
                        const { components, pageName } = pageJson;
                        console.log('components', components);
                        if (!pageName) {
                            message.error('请填写页面名称');
                            return;
                        }
                        getValidator(components)
                            .then(() => {
                                const pageJSON = getPageData(components);
                                console.log('pageJSON', pageJSON);
                                // actions.page.save();
                            })
                            .catch((err) => {
                                console.log('err', err);
                                message.error(err.message);
                            });
                    }}
                >
                    <SaveOutlined />
                </Button>
            </div>
        </div>
    );
};
