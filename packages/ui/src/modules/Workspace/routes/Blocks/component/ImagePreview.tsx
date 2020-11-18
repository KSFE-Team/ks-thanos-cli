import React from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const dataURLtoBlob = (dataurl: string) => {
    const arr: string[] = dataurl.split(',') || [];
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
        n -= 1;
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};

export default (props: { img: string; cls: string }) => {
    const { cls, img } = props;
    return (
        <>
            <Button
                className={cls}
                onClick={() => {
                    const imgBlob = dataURLtoBlob(img);
                    const url = URL.createObjectURL(imgBlob);
                    window.open(url);
                }}
            >
                <EyeOutlined />
            </Button>
        </>
    );
};
