"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function formatFile(filePath) {
    child_process_1.spawnSync(`npx`, [
        'eslint',
        filePath,
        '--fix'
    ]);
}
exports.formatFile = formatFile;
//# sourceMappingURL=format.js.map