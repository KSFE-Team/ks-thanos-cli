import request from '../utils/request';
import API from '../utils/request/api';

export async function getPage(pageName: string) {
    const templateConfig = await request({
        url: API.template,
        params: {
            pageName
        }
    });
    return templateConfig;
}
