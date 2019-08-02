import path from 'path';
import { writeFile } from '../../utils/file';
import { Page } from '../page/page';
export async function createModel(
    options: {
        page: Page;
        projectPath: string;
    }
) {
    const { page, projectPath } = options;
    const { name: pageName, className: pageClassName } = page;
    const modelPath = path.join(projectPath, 'pages', page.name, 'model.js');

    const modelContent = `
import { message } from 'antd';
import { stringify } from 'qs';
import request from 'Src/utils/request';
import { API } from 'Src/api/api';

export const STATE = {
    ${pageName}List: [], // 裂变任务列表数据
    search${pageClassName}Form: {
        page: 1,
        total: 0,
        limit: 10,
    },
};

export default {
    namespace: '${pageName}',

    state: { ...STATE },

    effects: {
        async load${pageClassName}List(payload, getState) {
            try {
                const searchForm = getState().search${pageClassName}Form;

                let postData = {
                    size: searchForm.limit,
                    page: searchForm.page,
                };

                const response = await call(request, \`\${API.${pageName}.query}?\${stringify(postData)}\`)

                if (response && response.code === 200) {
                    actions.${pageName}.setReducer({
                        ${pageName}List: response.data.content,
                        search${pageClassName}Form: {
                            ...searchForm,
                            page: response.data.pageNumber,
                            total: response.data.totalElements
                        }
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

}
`;

    writeFile(modelPath, modelContent);
}