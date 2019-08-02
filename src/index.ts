import Debug from './utils/debugger';
import { getPage } from './services/getPage';
import { createPage } from './factories/page/createPage';
import { createModel } from './factories/model/createModel';

const debug = Debug(__filename);

export async function runSync(options: {
    projectPath: string;
    pageName: string;
}) {
    const { pageName, projectPath } = options;
    debug(`Sync args: projectPath: ${projectPath}, pageName: ${pageName}`);

    const pageConfig = await getPage(pageName);

    const page = await createPage({
        pageName,
        projectPath,
        pageConfig
    });

    await createModel({
        page,
        projectPath
    });
}
