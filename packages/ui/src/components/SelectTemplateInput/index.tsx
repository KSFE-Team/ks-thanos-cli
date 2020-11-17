import React from 'react';
import { Input } from 'antd';
import { ReadFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { actions } from 'kredux';
import SelectTemplateModal from './SelectTemplateModal';

interface SelectTemplateInputProps {
    value?: string | undefined;
    onChange?(value: string | undefined): void;
}

export default (props: SelectTemplateInputProps) => {
    const { value, onChange } = props;
    const { global } = useSelector((store: any) => ({
        global: store.global,
    }));
    const { selectTemplateModalVisible } = global;

    const handleChange = (newValue: string) => {
        if (onChange) {
            onChange(newValue);
        }
    };
    return (
        <div>
            <Input
                placeholder="选择模版"
                value={value}
                allowClear
                onChange={(e) => {
                    const { value: inputValue } = e.target;
                    if (onChange) {
                        onChange(inputValue);
                    }
                }}
                addonAfter={
                    <ReadFilled
                        style={{ color: '#1890ff' }}
                        onClick={() => {
                            actions.global.setReducers({
                                selectTemplateModalVisible: true,
                            });
                        }}
                    />
                }
            />
            {selectTemplateModalVisible && (
                <SelectTemplateModal
                    onSubmit={(newValue) => {
                        handleChange(newValue);
                    }}
                />
            )}
        </div>
    );
};
