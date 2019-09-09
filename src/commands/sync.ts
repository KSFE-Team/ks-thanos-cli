import Debug from 'Src/utils/debugger';
import { infoText, successText, errorText } from 'Src/utils/log';
import { getPage } from 'Src/services/getPage';
import { createPage } from 'Src/factories/page/createPage';
import { createModel } from 'Src/factories/model/createModel';
import { updateConfigFile } from 'Src/utils/updateConfigFile';

const debug = Debug(__filename);

export async function runSync(options: {
    projectPath: string;
    pageName: string;
}) {
    const { pageName, projectPath } = options;
    debug(`Sync args: projectPath: ${projectPath}, pageName: ${pageName}`);

    try {
        console.log(infoText(`正在获取页面:${pageName}`));
        const pageConfig = await getPage(pageName);

        console.log(infoText(`获取页面成功，正在生成页面`));
        const page = await createPage({
            pageName,
            projectPath,
            pageConfig
        });

        console.log(infoText(`生成页面成功，正在生成 Model`));
        await createModel({
            page,
            projectPath
        });

        await updateConfigFile({
            projectPath,
            pageName
        });

        console.log(successText(`${pageName} 生成成功！`));
    } catch (err) {
        console.log(errorText(err));
    }
}
