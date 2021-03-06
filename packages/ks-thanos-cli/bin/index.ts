#!/usr/bin/env node

import commander from 'commander';
import Debug from '../src/utils/debugger';
import { runSync, runInit, runUi, runMergeNginx, runChangeEnv } from '../src';
import { errorText } from '../src/utils/log';
import { message } from '@ks-thanos/utils';

const { info } = message;
const debug = Debug(__filename);
const ownPkgJSON = require('../../package.json');

commander
    .description(info('凯叔前端灭霸系统工具'))
    .version(ownPkgJSON.version)
    .usage('<command> [command-options]');

commander
    .command('sync')
    .description('同步页面')
    .option('--config [config]', '同步配置参数')
    .action(async(
        options: {
            config: string;
        }
    ) => {
        debug(`Sync page`);
        const { config } = options;
        const projectPath = process.cwd();
        await runSync({
            projectPath,
            config
        });
    });

commander
    .command('init')
    .description('初始化项目')
    .option('--force', `强制删除并重新初始化模板目录[${errorText('DANGROUS')}]`)
    .option('--config [config]', '初始化配置参数')
    .action(async(
        options: {
            force: boolean;
            config: string;
        }
    ) => {
        debug(`Init project`);
        const { force, config } = options;
        await runInit({
            isForce: force,
            config
        });
    });

commander
    .command('mergeNginx')
    .alias('mn')
    .description('拉取最新nginx配置')
    .action(async() => {
        debug(`merge nginx`);
        await runMergeNginx();
    });

commander
.command('changeEnv')
.alias('cv')
.description('修改ngnx代理环境')
.option('--config [config]', '修改参数')
    .action(async (
        options: {
            config: string;
        }
    ) => {
    const { config } = options;
    debug(`changeEnv`);
    await runChangeEnv({
        config
    });
});

commander
    .command('ui')
    .description('工具可视化')
    .option('--env [env]', `运行环境`)
    .option('--uiEnv [env]', `ui运行环境`)
    .option('--serverEnv [env]', `server运行环境`)
    .option('--uiPort [uiPort]', `ui界面端口`)
    .option('--serverPort [serverPort]', `ui服务器端口`)
    .action(async(
        options: {
            env: string;
            uiEnv: string;
            serverEnv: string;
            uiPort: string;
            serverPort: string;
        }
    ) => {
        debug(`start ui`);
        await runUi(options);
    });

commander.parse(process.argv);

if (!commander.args.length) {
    commander.help();
}
