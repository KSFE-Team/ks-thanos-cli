import { ComponentConfig } from '../basic/index';
import { EffectConfig } from 'Src/factories/model/effect';
export interface SelectConfig extends ComponentConfig {
    stateName: string;
    componentName: string;
    source: string;
    default: boolean;
    label: string;
    props: {
        [key: string]: string | boolean;
        disabled: boolean;
        placeholder: string;
        showSearch: boolean;
        allowClear: boolean;
    };
    defaultValue?: string | number;
    options: OptionData[];
    optGroup: OptGroupData[];
    key: string;
    dependencies: EffectConfig;
}

export interface OptionData {
    props: {
        disabled: boolean;
        key: string;
        title: string;
        value: string | number;
        className: string;
    },
    lable: string | number;
}

export interface OptGroupData {
    key: string;
    laber: string;
    options: OptionData[];
}

export interface PropsConfig {
    [key: string]: any;
    placeholder?: string;
    showSearch?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
    key?: string;
    title?: string;
    value?: string | number;
    className?: string;
}

