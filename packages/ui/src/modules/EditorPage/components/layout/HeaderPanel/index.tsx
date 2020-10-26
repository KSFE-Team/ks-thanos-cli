import React from 'react';
import { RollbackOutlined, SaveOutlined, EnterOutlined } from '@ant-design/icons';
import Logo from 'Src/components/Logo';
import Button from 'Src/components/Button';
import { getApp } from 'Src/app';
import { goto } from 'Src/utils';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { getComponents } from '../../../utils/constants';

const getValidator = (dataSource: any[]) =>
    new Promise((resolve, reject) => {
        let err: any;
        let times = dataSource.length;
        dataSource.forEach(async (item: any) => {
            if (!err) {
                const { componentName, id, components } = item;
                const componentMap = getComponents();
                // eslint-disable-next-line no-underscore-dangle
                const storeConfig = getApp()._store.getState()[id];
                const tempItem = {
                    ...item,
                    ...storeConfig,
                };
                const { validator } = componentMap[componentName];
                const result = await validator(tempItem);
                if (result) {
                    err = result;
                }

                if (!err && components) {
                    await getValidator(components).catch((error) => {
                        err = new Error(error);
                    });
                }
            }
            times -= 1;
        });
        const timer = setInterval(() => {
            if (!times) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
                if (timer) {
                    clearInterval(timer);
                }
            }
        }, 100);
    });

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
                        const { components } = pageJson;
                        getValidator(components)
                            .then(() => {})
                            .catch((err) => {
                                console.log('after error', err);
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
