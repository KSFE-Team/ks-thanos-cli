"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
exports.delay = delay;
//# sourceMappingURL=delay.js.map