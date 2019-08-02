#!/usr/bin/env node

import commander from 'commander';
import Debug from '../src/utils/debugger';
import { runSync } from '../src/index';

const debug = Debug(__filename);

const ownPkgJSON = require('../../package.json');

commander
    .description('凯叔前端灭霸系统工具')
    .version(ownPkgJSON.version)
    .usage('<command> [command-options]');

commander
    .command('sync [pageName]')
    .description('同步页面')
    .action(async(
        pageName: string
    ) => {
        debug(`Sync page from ${pageName}`);
        const projectPath = process.cwd();
        await runSync({
            projectPath,
            pageName
        });
    });

commander.parse(process.argv);

if (!commander.args.length) {
    commander.help();
}