import { parseQueryString } from 'ks-utils';

const queryString = parseQueryString(window.location.search);
const serverPort = queryString.serverPort;

const SERVER = `http://localhost:${serverPort}/api/ks-thanos-ui-server/v1`;
export default {
    test: `${SERVER}/test`,
    file: `${SERVER}/file`,
    runNpmCommand: `${SERVER}/runNpmCommand`,
    runCommand: `${SERVER}/runCommand`,
    thanos: `${SERVER}/thanos`,
    thanosSync: `${SERVER}/thanosSync`,
};
