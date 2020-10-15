import React from 'react';
import { Input } from 'antd';
import { selector } from 'recoil';

const inputState = selector({
    key: 'inputState',
    get: ({ get }) => {
        const;
    },
});
// import { pageState } from '../../../atoms/page';

export default (props: any = {}) => {
    const [[page], setTitle] = useRecoilState(pageState);
    return (
        <div>
            <Input />
        </div>
    );
};
