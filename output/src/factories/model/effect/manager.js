"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listEffect_1 = require("./listEffect");
const deleteEffect_1 = require("./deleteEffect");
class EffectManager {
    static create(stateName, model, config) {
        switch (config.actionType) {
            case 'delete':
                return new deleteEffect_1.DeleteEffect(stateName, model, config);
            default:
                return new listEffect_1.ListEffect(stateName, model, config);
        }
    }
}
exports.EffectManager = EffectManager;
//# sourceMappingURL=manager.js.map