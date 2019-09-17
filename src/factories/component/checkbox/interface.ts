import { ComponentConfig } from '../basic/index';
import { EffectConfig } from 'Src/factories/model/effect';
export interface CheckboxConfig extends ComponentConfig {
    stateName: string;
    componentName: string;
    source: string;
    default: boolean;
    label: string;
    props: {
        disabled: boolean;
        [key: string]: string | boolean;
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
    };
    text: string | number;
}

export interface PropsConfig {
    disabled?: boolean;
    checked?: boolean;
    value?: string | number;
    [key: string]: any;
}

