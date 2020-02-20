import ThanosUi from '@ks-thanos/ui-server/output/ui';
// import Debug from 'Src/utils/debugger';
// import { infoText, successText, errorText, createSplash } from 'Src/utils/log';
// import { getPage } from 'Src/services/getPage';
// import { createPage } from 'Src/factories/page/createPage';
// import { createModel } from 'Src/factories/model/createModel';
// import { updateConfigFile } from 'Src/utils/updateConfigFile';
// import { prompt } from 'inquirer';
// import { upperFirst, isEnglish, lowerFirst } from 'Src/utils/string';
// import path from 'path';
// import fsExtra from 'fs-extra';

// const debug = Debug(__filename);

/**
 * 运行页面同步命令
 * @param options 参数
 */
export async function runUi() {
    const thanosUi = new ThanosUi();
    thanosUi.start();
}
