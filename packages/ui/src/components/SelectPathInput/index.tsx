import React from 'react';
import { useSelector } from 'react-redux';
import { Input } from 'antd';
import { FolderFilled } from '@ant-design/icons';
import { actions } from 'kredux';
import SelectPathModal from 'Src/components/SelectPathModal';

interface SelectPathInputProps {
    value?: string;
    onChange?(value: string): string;
}

export default (props: SelectPathInputProps) => {
    const { global } = useSelector((store: any) => ({
        global: store.global,
    }));
    const { value, onChange } = props;
    const { isShowFolder } = global;

    const handleSelectProject = (add = '') => {
        const { currentPath } = global;
        actions.global.selectFolder({
            path: currentPath + add,
        });
    };

    const onChangeHandler = (newValue: string) => {
        if (onChange) {
            onChange(newValue);
        }
    };
    return (
        <>
            <Input
                placeholder="选择路径"
                value={value}
                allowClear
                onChange={(e) => {
                    const { value: inputValue } = e.target;
                    onChangeHandler(inputValue);
                }}
                addonAfter={
                    <FolderFilled
                        // style={{color: 'rgba(135, 207, 246)'}}
                        style={{ color: '#1890ff' }}
                        onClick={() => {
                            handleSelectProject();
                        }}
                    />
                }
            />
            {isShowFolder && (
                <SelectPathModal
                    onSubmit={(newValue) => {
                        onChangeHandler(newValue);
                    }}
                />
            )}
        </>
    );
};
