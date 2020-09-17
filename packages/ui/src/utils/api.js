import { formatServerPort } from 'Src/utils';

const serverPort = formatServerPort();
export const SERVER_ORIGIN = `http://localhost:${serverPort}`;

const SERVER = `${SERVER_ORIGIN}/api/ks-thanos-ui-server/v1`;
export default {
    test: `${SERVER}/test`,
    file: `${SERVER}/file`,
    runNpmCommand: `${SERVER}/runNpmCommand`,
    runCommand: `${SERVER}/runCommand`,
    thanos: `${SERVER}/thanos`,
    thanosSync: `${SERVER}/thanosSync`,
    getProjectProcess: `${SERVER}/getProjectProcess`,
};
