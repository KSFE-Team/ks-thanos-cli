import { EffectConfig, Effect } from './index';
import Model from '../index';
import { ListEffect } from './listEffect';
import { DeleteEffect } from './deleteEffect';

export class EffectManager {
    static create(stateName: string, model: Model, config: EffectConfig): Effect {
        switch (config.actionType) {
            case 'delete':
                return new DeleteEffect(stateName, model, config);
            default:
                return new ListEffect(stateName, model, config);
        }
    }
}