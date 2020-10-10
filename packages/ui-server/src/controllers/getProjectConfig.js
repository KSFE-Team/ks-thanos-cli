import { getConfig } from '../utils';
const sleep = (timer) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, timer);
});
export default async function(context) {
    const { cwd } = context.query;
    const config = getConfig(cwd);
    await sleep(500);
    context.body = {
        code: 0,
        result: config
    };
};
