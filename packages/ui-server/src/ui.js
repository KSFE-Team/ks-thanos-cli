import Koa from 'koa';
import { readFileSync } from 'fs';
import { constants } from '@ks-thanos/utils';
import { openBrowser, createSplash } from './utils';
import checkUi from './checkUi';
import { startServer } from './index';
const userHome = require('user-home');
const staticServer = require('koa-static');
const { ENV_PRODUCTION } = constants;
// const THANOS = '.thanos'; // 灭霸配置目录
const LOCAL_CONFIG_PATH = `${userHome}/.config/yarn/global/node_modules/@ks-thanos/ui`; // 配置根目录
/**
 * ui界面的构造函数
 */
export default class ThanosUi {
    constructor(config = {}) {
        this.config = {
            port: 8001, // CLI可视化服务端口
            ...config,
            initPath: '/project/'
        };
        this.init();
    }

    /**
     * 初始化 代理转发
     */
    async init() {
        const { uiEnv } = this.config;
        /* 生产环境进行ui环境检查,并且进行server初始配置 */
        if (uiEnv === ENV_PRODUCTION) {
            await checkUi({
                userHome,
                uiGlobalDir: LOCAL_CONFIG_PATH
            });
            this.app = new Koa();
            this.app.use(staticServer(`${LOCAL_CONFIG_PATH}/output/`));
            this.app.use(async(context) => {
                context.response.type = 'html';
                if (!this.content) {
                    this.content = readFileSync(`${LOCAL_CONFIG_PATH}/output/index.html`, 'utf-8');
                }
                context.response.body = this.content;
            });
        }
    }

    async start() {
        const { port, uiEnv, serverEnv, initPath } = this.config;
        const url = `http://localhost:${port}${initPath}`;
        /* 生产模式将自动启服务 */
        if (serverEnv === ENV_PRODUCTION) {
            startServer();
        }
        console.log('uiEnv', uiEnv);
        /* 生产环境启动端口监听 */
        if (uiEnv === ENV_PRODUCTION) {
            this.server = this.app.listen(port, () => {
                createSplash('THANOS UI');
                console.log(`server listening on ${port}...`);
                console.log(`🚀 Starting thanos ui\n⛽️ Ready on ${url}`);
                openBrowser(url);
            });
        } else {
            openBrowser(url);
        }
    }
}
