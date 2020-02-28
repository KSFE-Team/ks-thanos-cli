import ThanosUi from '@ks-thanos/ui-server/output/ui';
import { constants } from '@ks-thanos/utils';
const { ENV_PRODUCTION } = constants;

// const debug = Debug(__filename);
/**
 * 运行页面同步命令
 * @param options 参数
 */
export async function runUi(config: any) {
    const { env = ENV_PRODUCTION } = config;
    const thanosUi = new ThanosUi({
        env
    });
    thanosUi.start();
}
