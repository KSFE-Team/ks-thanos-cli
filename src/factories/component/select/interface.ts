import { EffectConfig } from 'Src/factories/model/effect';
import { FormItemConfig } from '../form/formItem';
export interface SelectConfig extends FormItemConfig {
    props: {
        [key: string]: string | boolean;
        // disabled: boolean;
        // placeholder: string;
        // showSearch: boolean;
        // allowClear: boolean;
    };
    options: OptionData[];
    optGroup: OptGroupData[];
    dependencies: EffectConfig;
}

export interface OptionData {
    props: {
        disabled?: boolean;
        key?: string;
        title?: string;
        value: string | number;
    };
    label: string | number;
}

export interface OptGroupData {
    key: string;
    label: string;
    options: OptionData[];
}

export interface PropsConfig {
    [key: string]: string | number | boolean | undefined;
    // placeholder?: string;
    // showSearch?: boolean;
    // allowClear?: boolean;
    // disabled?: boolean;
    // key?: string;
    // title?: string;
    // value?: string | number;
    // className?: string;
}

