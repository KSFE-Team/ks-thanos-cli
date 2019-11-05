// import request from '../utils/request';
// import API from '../utils/request/api';

export async function getPage(pageName: string) {
    // const response = await request({
    //     url: API.template,
    //     params: {
    //         pageName
    //     }
    // });

    const response = {
        "pageData": "{\"components\":[{\"stateName\":\"blockTest\",\"componentName\":\"Form\",\"source\":\"antd\",\"default\":false,\"type\":\"normal\",\"key\":\"\",\"label\":\"\",\"id\":\"avep7g383f\",\"componentSelected\":true,\"configVisible\":false,\"components\":[{\"stateName\":\"blockTest\",\"componentName\":\"Input\",\"source\":\"antd\",\"default\":false,\"key\":\"aa\",\"label\":\"aa\",\"id\":\"uw0a45ikzok\",\"formType\":\"normal\",\"componentSelected\":true,\"configVisible\":false,\"props\":{\"placeholder\":\"aa\"}},{\"stateName\":\"blockTest\",\"componentName\":\"Fragment\",\"source\":\"\",\"showKey\":\"status\",\"showValue\":\"1\",\"default\":false,\"blockName\":\"block12\",\"key\":\"\",\"label\":\"\",\"components\":[{\"stateName\":\"\",\"componentName\":\"Input\",\"source\":\"antd\",\"default\":false,\"key\":\"bb\",\"label\":\"bb\",\"id\":\"bmyswpexbep\",\"componentSelected\":true,\"configVisible\":false,\"props\":{\"placeholder\":\"bb\"}},{\"stateName\":\"\",\"componentName\":\"InputNumber\",\"source\":\"antd\",\"default\":false,\"key\":\"cc\",\"label\":\"数字框\",\"props\":{\"disabled\":false,\"precision\":0,\"step\":1,\"placeholder\":\"cc\"},\"id\":\"4zfj9iefjn\",\"componentSelected\":true,\"configVisible\":false},{\"stateName\":\"\",\"componentName\":\"Radio\",\"source\":\"antd\",\"default\":false,\"defaultValue\":1,\"isRequired\":true,\"key\":\"status\",\"label\":\"状态\",\"options\":[{\"value\":1,\"disabled\":false,\"rowKey\":1,\"text\":\"启用\"},{\"value\":0,\"disabled\":false,\"rowKey\":2,\"text\":\"禁用\"}],\"id\":\"92q1im40sz\",\"componentSelected\":true,\"configVisible\":false}],\"id\":\"11uognd0gkpf\",\"componentSelected\":true,\"configVisible\":false,\"formType\":\"normal\"}],\"props\":{},\"activeEvents\":[{\"eventType\":\"request\",\"dependencies\":{\"type\":\"fetch\",\"api\":{\"key\":\"save\",\"value\":\"a/b\"},\"actionType\":\"save\",\"responseType\":\"object\",\"method\":\"post\"}},{\"eventType\":\"request\",\"dependencies\":{\"type\":\"fetch\",\"api\":{\"key\":\"update\",\"value\":\"a/b\"},\"actionType\":\"update\",\"responseType\":\"object\",\"method\":\"post\"}},{\"eventType\":\"request\",\"dependencies\":{\"type\":\"fetch\",\"api\":{\"key\":\"get\",\"value\":\"a/c\"},\"actionType\":\"get\",\"responseType\":\"object\",\"method\":\"get\"}}],\"saveApi\":\"a/b\",\"updateApi\":\"a/b\",\"getApi\":\"a/c\",\"paramKey\":\"a\"}],\"paramKey\":\"a\"}",
        "pageName": "blockTest",
        "id": "5dbfe8c475815603bbe1f754"
    };
    const pageData = JSON.parse(response.pageData);
    return pageData;
}
