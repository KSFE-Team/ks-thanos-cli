import fs from 'fs';
import { message } from '@ks-thanos/utils';
const childProcess = require('child_process');
/**
 * 检查ui文件
 */
export default function({
    uiGlobalDir, // ui全局路径
}) {
    /* 检查用户根目录下是否有thanos配置文件 */
    try {
        let PKGJSON = fs.readFileSync(`${uiGlobalDir}/package.json`, 'utf8');
        const { version } = JSON.parse(PKGJSON);
        /* 获取最新版本 */
        const yarnInfoExec = childProcess.spawnSync('yarn', [
            'info',
            '@ks-thanos/ui',
            '--json'
        ], { encoding: 'utf-8' });
        if (!yarnInfoExec.status) {
            const yarnInfo = JSON.parse(yarnInfoExec.stdout).data;
            const distTags = yarnInfo['dist-tags'];
            const newVersion = distTags['latest'];
            /* 版本比较 */
            if (checkVersion(newVersion, version)) {
                installLatestVersion();
            }
        }
    } catch (error) {
        /* 如果全局没有ui */
        console.log(message.info('thanos not found @ks-thanos/ui in yarn global dir'));
        console.log(message.info('thanos will be install @ks-thanos/ui'));
        installLatestVersion();
    }
};

/* 检查版本 */
const checkVersion = (newVersion, preVersion) => transferVersion(newVersion) > transferVersion(preVersion);
/* 匹配类似beta版本号 */
const DIST_TAGS_REG = /-[a-z].*\./g;

/* 转换版本号 */
const transferVersion = (version) => {
    const reg = new RegExp(DIST_TAGS_REG);
    if (reg.test(version)) {
        const [MAIN_VERSION, TEST_COUNT] = version.split(reg);
        return versionToNumber(MAIN_VERSION) + (TEST_COUNT - 0);
    }
    return versionToNumber(version);
};

/* 转化版本为数值 */
const versionToNumber = (version) => version.split('.').map((number) => number > 10 ? number : `0${number}`).join('') - 0;

/* 安装最新版本 */
const installLatestVersion = () => {
    childProcess.spawnSync('yarn', [
        'global',
        'add',
        '@ks-thanos/ui'
    ], { encoding: 'utf-8', stdio: 'inherit' });
};
