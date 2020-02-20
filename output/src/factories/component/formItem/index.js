"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../basic/index");
const getPropValue_1 = require("Src/utils/getPropValue");
class FormItem extends index_1.Component {
    initPageState() {
        if (this.config.formType === 'search') {
            const stateValue = getPropValue_1.getPropValue(this.config.initialValue);
            this.page.model.addInitialState(this.stateName, this.config.key, stateValue);
            this.page.model.listEffectRequestParams.push({
                name: this.config.key
            });
        }
    }
}
exports.FormItem = FormItem;
//# sourceMappingURL=index.js.map