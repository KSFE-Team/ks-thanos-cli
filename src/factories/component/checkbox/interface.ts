import { EffectConfig } from 'Src/factories/model/effect';
import { FormItemConfig } from 'Src/factories/component/form/formItem';
export interface CheckboxConfig extends FormItemConfig {
    props: {
        disabled: boolean;
        [key: string]: string | boolean;
    };
    options: OptionData[];
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

