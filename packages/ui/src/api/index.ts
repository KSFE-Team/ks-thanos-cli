// const server = window.location.origin;
// const server = 'http://localhost:3012';
import { formatServerPort } from 'Src/utils';

/* 服务器统一线上地址 */
const SERVER_BASE = 'http://kaishufe.kaishustory.com';
/* thanos 资产后端 */
// const THANOS_SERVER = `${SERVER_BASE}/api/ks-thanos/v1`;
const THANOS_SERVER = 'http://localhost:3012/api/ks-thanos/v1';
/* cloudComponent 云组件后端 */
const CLOUD_COMPONENT_SERVER = `${SERVER_BASE}/api/ks-component-cloud/v1`;
/* 本地服务port解析 */
const LOCAL_SERVER_PORT = formatServerPort();
export const LOCAL_SERVER_ORIGIN = `http://localhost:${LOCAL_SERVER_PORT}`;
/* 本地ui 联动服务 */
const LOCAL_SERVER = `${LOCAL_SERVER_ORIGIN}/api/ks-thanos-ui-server/v1`;
/* permission后端 */
const PERMISSION_SERVER = 'http://t.kms.kaishustory.com/permission-server';

export const API = {
    page: {
        query: `${THANOS_SERVER}/page/list`,
        get: `${THANOS_SERVER}/page/get`,
        addOrUpdate: `${THANOS_SERVER}/page/addOrUpdate`, // 保存更新JSON
        delete: `${THANOS_SERVER}/page/delete`, // 删除模版
    },
    template: {
        query: `${THANOS_SERVER}/template/list`,
        get: `${THANOS_SERVER}/template/get`,
        addOrUpdate: `${THANOS_SERVER}/template/addOrUpdate`, // 保存更新JSON
        delete: `${THANOS_SERVER}/template/delete`, // 删除模版
    },
    // 云组件
    cloudComponent: {
        query: `${CLOUD_COMPONENT_SERVER}/component/thanosList`, // 列表
    },
    /* ui 本地API */
    uiApi: {
        test: `${LOCAL_SERVER}/test`,
        file: `${LOCAL_SERVER}/file`,
        runNpmCommand: `${LOCAL_SERVER}/runNpmCommand`,
        runCommand: `${LOCAL_SERVER}/runCommand`,
        thanos: `${LOCAL_SERVER}/thanos`,
        thanosSync: `${LOCAL_SERVER}/thanosSync`,
        getProjectProcess: `${LOCAL_SERVER}/getProjectProcess`,
        getProjectConfig: `${LOCAL_SERVER}/projectConfig/get`,
        updateProjectConfig: `${LOCAL_SERVER}/projectConfig/update`,
    },
    dashboard: {
        get: `${THANOS_SERVER}/dashboard/sumAnalysis`, // 汇总信息
        query: `${THANOS_SERVER}/dashboard/query`, // 汇总信息
        getListByProject: `${THANOS_SERVER}/dashboard/getListByProject`, // 获取每个项目下使用灭霸生成的模块数量
        getSystem: `${PERMISSION_SERVER}/public/systemList`, // 获取系统列表
        getSystemDetail: `${PERMISSION_SERVER}/public/resourceList`, // 获取系统详情
    },
    thanosLog: {
        create: `${THANOS_SERVER}/log/create`, // 新增log
        get: `${THANOS_SERVER}/log/list`, // log列表
        update: `${THANOS_SERVER}/log/update`, // log更新
    },
};
