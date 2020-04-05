import { EffectConfig, Effect } from './index';
import Model from '../index';
import { ListEffect } from './listEffect';
import { DeleteEffect } from './deleteEffect';
import { CreateEffect } from './createEffect';
import { UpdateeEffect } from './updateEffect';
import { ItemEffect } from './itemEffect';

export class EffectManager {
    static create(effectName: string, stateName: string, model: Model, config: EffectConfig): Effect {
        switch(config.actionType) {
            case 'save':
                return new CreateEffect(effectName, stateName, model, config);
            case 'update':
                return new UpdateeEffect(effectName, stateName, model, config);
            case 'delete':
                return new DeleteEffect(effectName, stateName, model, config);
            case 'get':
                if(config.responseType === 'list') {
                    return new ListEffect(effectName, stateName, model, config);
                }
                return new ItemEffect(effectName, stateName, model, config);
        }
    }
}
