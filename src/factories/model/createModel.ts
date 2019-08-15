import path from 'path';
import { writeFile } from '../../utils/file';
import Page from '../page';
import { formatFile } from '../../utils/format';

export async function createModel(
    options: {
        page: Page;
        projectPath: string;
    }
) {
    const { page, projectPath } = options;
    const modelPath = path.join(projectPath, 'pages', page.name, 'model.js');

    writeFile(modelPath, page.model.toCode());

    formatFile(modelPath);
}