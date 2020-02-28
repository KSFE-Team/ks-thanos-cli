// import Koa from 'koa';
// import axios from 'axios';
import { constants } from '@ks-thanos/utils';
import { openBrowser, createSplash } from './utils'; ;
const { ENV_PRODUCTION } = constants;
/**
 * ui界面的构造函数
 */
export default class ThanosUi {
    constructor(config = {}) {
        this.init();
        this.config = {
            port: 8001, // CLI可视化服务端口
            ...config,
            initPath: '/project/'
        };
    }

    /**
     * 初始化 代理转发
     */
    async init() {
        // const { env, uiPort } = this.config;
        // if (env === 'production') {
        //     this.app = new Koa();
        //     this.app.use(async(context) => {
        //         if (env === 'production') {
        //             console.log('requestUrl', `http://localhost:${uiPort}${context.path}`);
        //             const response = await axios(`http://localhost:${uiPort}${context.path}`, {
        //                 method: 'get'
        //             });
        //             const { data } = response;
        //             context.set('Content-Type', 'text/html');
        //             context.body = data;
        //         } else {
        //             context.body = 'hello world';
        //         }
        //         // let content = null;
        //     });
        // }
    }

    async start() {
        const { port, env, initPath } = this.config;
        const url = `http://localhost:${port}${initPath}`;
        if (env === ENV_PRODUCTION) {
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
