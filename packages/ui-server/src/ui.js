import Koa from 'koa';
import { readFileSync } from 'fs';
import { constants, getYarnGlobalDir, message } from '@ks-thanos/utils';
import { openBrowser, createSplash } from './utils';
import checkUi from './checkUi';
import { startServer } from './index';
const staticServer = require('koa-static');
const { ENV_PRODUCTION } = constants;
const LOCAL_CONFIG_PATH = `${getYarnGlobalDir().data}/node_modules/@ks-thanos/ui`; // 配置根目录
/**
 * ui界面的构造函数
 */
export default class ThanosUi {
    constructor(config = {}) {
        this.config = {
            port: config.uiPort || 8001, // CLI可视化服务端口
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
        const { port, uiEnv, serverEnv, initPath, serverPort } = this.config;
        const url = `http://localhost:${port}${initPath}`;
        /* 生产模式将自动启服务 */
        if (serverEnv === ENV_PRODUCTION) {
            startServer(serverPort);
        }
        /* 生产环境启动端口监听 */
        if (uiEnv === ENV_PRODUCTION) {
            this.server = this.app.listen(port, () => {
                createSplash('THANOS UI');
                console.log(message.info(`server listening on ${port}...`));
                console.log(message.info(`🚀 Starting thanos ui\n⛽️ Ready on ${url}`));
                openBrowser(url);
            });
        } else {
            openBrowser(url);
        }
    }
}
