import React from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default (props: { img: string; cls: string }) => {
    const { cls, img } = props;
    return (
        <>
            <Button
                className={cls}
                onClick={() => {
                    window.open(img);
                }}
            >
                <EyeOutlined />
            </Button>
        </>
    );
};
