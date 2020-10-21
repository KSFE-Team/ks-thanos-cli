import React, { useState } from 'react';
import { RollbackOutlined, SaveOutlined, EnterOutlined } from '@ant-design/icons';
import Logo from 'Src/components/Logo';
import Button from 'Src/components/Button';
import { goto } from 'Src/utils';
import Bar from './components/Bar';
import Form from './components/Form';
import Page from './components/Page';
import * as CONSTANTS from './components/Blocks/constants';
import { setComponent } from './components/Blocks/components';
import './style.scss';

export default () => {
    useState(() => {
        Object.keys(CONSTANTS)
            .filter((key) => key !== 'default')
            .forEach((key) => {
                setComponent({
                    [key]: CONSTANTS[key],
                });
            });
    });
    return (
        <div className="thanos-editor-container">
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
                    <Button title="发布" className="thanos-editor-primary">
                        <SaveOutlined />
                    </Button>
                </div>
            </div>
            <div className="thanos-editor-content">
                <Bar />
                <Page />
                <Form />
            </div>
        </div>
    );
};
