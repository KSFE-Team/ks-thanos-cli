import { EffectConfig, Effect } from './index';
import Model from '../index';
import { ListEffect } from './listEffect';
import { DeleteEffect } from './deleteEffect';
import { CreateEffect } from './createEffect';
import { UpdateeEffect } from './updateEffect';
import { ItemEffect } from './itemEffect';

export class EffectManager {
    static create(stateName: string, model: Model, config: EffectConfig): Effect {
        switch(config.actionType) {
            case 'save':
                return new CreateEffect(stateName, model, config);
            case 'update':
                return new UpdateeEffect(stateName, model, config);
            case 'delete':
                return new DeleteEffect(stateName, model, config);
            case 'get':
                if(config.responseType === 'list') {
                    return new ListEffect(stateName, model, config);
                }
                return new ItemEffect(stateName, model, config);
        }
    }
}
