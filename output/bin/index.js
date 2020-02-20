#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const debugger_1 = __importDefault(require("../src/utils/debugger"));
const src_1 = require("../src");
const src_2 = require("../src");
const log_1 = require("../src/utils/log");
const debug = debugger_1.default(__filename);
const ownPkgJSON = require('../../package.json');
commander_1.default
    .description('凯叔前端灭霸系统工具')
    .version(ownPkgJSON.version)
    .usage('<command> [command-options]');
commander_1.default
    .command('sync')
    .description('同步页面')
    .action(async () => {
    debug(`Sync page`);
    const projectPath = process.cwd();
    await src_1.runSync({
        projectPath,
    });
});
commander_1.default
    .command('init')
    .description('初始化项目')
    .option('--force', `强制删除并重新初始化模板目录[${log_1.errorText('DANGROUS')}]`)
    .action(async (options) => {
    debug(`Init project`);
    const { force } = options;
    await src_2.runInit({
        isForce: force
    });
});
commander_1.default.parse(process.argv);
if (!commander_1.default.args.length) {
    commander_1.default.help();
}
//# sourceMappingURL=index.js.map