import { ComponentConfig } from '../basic/index';
import { EffectConfig } from 'Src/factories/model/effect';
export interface CheckboxConfig extends ComponentConfig {
    stateName: string;
    componentName: string;
    source: string;
    default: boolean;
    label: string;
    props: {
        [key: string]: string | boolean;
        disabled: boolean;
    };
    defaultValue?: string | number;
    options: OptionData[];
    key: string;
    dependencies: EffectConfig;
}

export interface OptionData {
    props: {
        disabled: boolean;
        checked: boolean;
        value: string | number;
    },
    text: string | number;
}

export interface PropsConfig {
    [key: string]: any;
    disabled?: boolean;
    checked?: boolean;
    value?: string | number;
}

