import Koa from 'koa';
import { openBrowser, createSplash } from './utils';

/**
 * ui界面的构造函数
 */
export default class ThanosUi {
    constructor(config = {}) {
        this.init();
        this.config = {
            port: 3000,
            ...config,
        };
    }

    async init() {
        this.app = new Koa();
        this.app.use((ctx) => {
            // let content = null;
            ctx.body = 'hello world';
        });
    }

    async start() {
        const { port } = this.config;
        this.server = this.app.listen(port, () => {
            const url = `http://localhost:${port}/`;
            createSplash('THANOS UI CLIENT');
            console.log(`server listening on ${port}...`);
            console.log(`🚀 Starting thanos ui\n⛽️ Ready on ${url}`);
            openBrowser(url);
        });
    }
}
