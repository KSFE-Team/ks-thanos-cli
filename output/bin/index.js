#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const debugger_1 = __importDefault(require("../src/utils/debugger"));
const index_1 = require("../src/index");
const debug = debugger_1.default(__filename);
const ownPkgJSON = require('../../package.json');
commander_1.default
    .description('凯叔前端灭霸系统工具')
    .version(ownPkgJSON.version)
    .usage('<command> [command-options]');
commander_1.default
    .command('sync [pageName]')
    .description('同步页面')
    .action(async (pageName) => {
    debug(`Sync page from ${pageName}`);
    const projectPath = process.cwd();
    await index_1.runSync({
        projectPath,
        pageName
    });
});
commander_1.default.parse(process.argv);
if (!commander_1.default.args.length) {
    commander_1.default.help();
}
//# sourceMappingURL=index.js.map