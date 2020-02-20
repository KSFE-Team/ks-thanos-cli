"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listEffect_1 = require("./listEffect");
const deleteEffect_1 = require("./deleteEffect");
const createEffect_1 = require("./createEffect");
const updateEffect_1 = require("./updateEffect");
const itemEffect_1 = require("./itemEffect");
class EffectManager {
    static create(stateName, model, config) {
        switch (config.actionType) {
            case 'save':
                return new createEffect_1.CreateEffect(stateName, model, config);
            case 'update':
                return new updateEffect_1.UpdateeEffect(stateName, model, config);
            case 'delete':
                return new deleteEffect_1.DeleteEffect(stateName, model, config);
            case 'get':
                if (config.responseType === 'list') {
                    return new listEffect_1.ListEffect(stateName, model, config);
                }
                return new itemEffect_1.ItemEffect(stateName, model, config);
        }
    }
}
exports.EffectManager = EffectManager;
//# sourceMappingURL=manager.js.map