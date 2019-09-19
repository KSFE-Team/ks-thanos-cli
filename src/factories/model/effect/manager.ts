import { EffectConfig, Effect } from './index';
import Model from '../index';
import { ListEffect } from './listEffect';
import { DeleteEffect } from './deleteEffect';
import { CreateEffect } from './createEffect';
import { UpdateeEffect } from './updateEffect';

const REQUEST_EFFECT_MAP = {
    'save': CreateEffect,
    'update': UpdateeEffect,
    'delete': DeleteEffect,
    'get': ListEffect
};

export class EffectManager {
    static create(stateName: string, model: Model, config: EffectConfig): Effect {
        const RequestEffect = REQUEST_EFFECT_MAP[config.actionType];
        return new RequestEffect(stateName, model, config);
    }
}
