// const server = window.location.origin;
// const server = 'http://localhost:3012';
const server = 'http://kaishufe.kaishustory.com';
const thanosServer = server + '/api/ks-thanos/v1';
export const API = {
    page: {
        query: thanosServer + '/page/list',
        get: thanosServer + '/page/get',
        addOrUpdate: thanosServer + '/page/addOrUpdate', // 保存更新JSON
        delete: thanosServer + '/page/delete', // 删除模版
    },
    template: {
        query: thanosServer + '/template/list',
        get: thanosServer + '/template/get',
        addOrUpdate: thanosServer + '/template/addOrUpdate', // 保存更新JSON
        delete: thanosServer + '/template/delete', // 删除模版
    },
    // 云组件
    cloudComponent: {
        query: server + '/api/ks-component-cloud/v1/component/thanosList', // 列表
    }
};
