import ThanosUi from '@ks-thanos/ui-server/ui';
import { constants } from '@ks-thanos/utils';
const { ENV_PRODUCTION } = constants;
// const debug = Debug(__filename);
/**
 * 运行页面同步命令
 * @param options 参数
 */
export async function runUi(config: any) {
    let { env = ENV_PRODUCTION, uiEnv, serverEnv, serverPort, uiPort } = config;
    uiEnv = uiEnv || env;
    serverEnv = serverEnv || env;
    const thanosUi = await new ThanosUi({
        env,
        uiEnv,
        serverEnv,
        serverPort,
        uiPort
    });
    await thanosUi.start();
}
