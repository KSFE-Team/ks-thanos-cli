let SERVER = 'http://localhost:3000/api/ks-thanos-ui-server/v1';
export default {
    test: `${SERVER}/test`,
    file: `${SERVER}/file`,
    runNpmCommand: `${SERVER}/runNpmCommand`,
    runCommand: `${SERVER}/runCommand`,
    thanos: `${SERVER}/thanos`
};
