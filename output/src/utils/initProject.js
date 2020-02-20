"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("./debugger"));
const child_process_1 = require("child_process");
const log_1 = require("./log");
const fs_extra_1 = __importDefault(require("fs-extra"));
const debug = debugger_1.default(__filename);
function initProjectFolder(projectName) {
    const branchName = 'master';
    const projectRepo = 'http://gitlab.devops.kaishustory.com/ks_h5_kms/ks-pcweb-thanos-base.git';
    debug(`Init project from git: ${projectRepo} —— ${branchName}`);
    const cmdStr = `git clone ${projectRepo} ${projectName} && cd ${projectName} && git checkout ${branchName}`;
    debug(`CMD str: ${cmdStr}`);
    try {
        child_process_1.execSync(cmdStr, {
            encoding: 'utf-8'
        });
    }
    catch (err) {
        console.log(log_1.errorText(err));
        process.exit(1);
    }
    fs_extra_1.default.removeSync(`${projectName}/.git`);
}
exports.initProjectFolder = initProjectFolder;
function installDependencies(projectPath) {
    debug(`Install dependencies`);
    const cmdStr = `cd ${projectPath} && npm install`;
    try {
        child_process_1.execSync(cmdStr, {
            encoding: 'utf-8',
            stdio: 'inherit'
        });
    }
    catch (err) {
        console.log(log_1.errorText(err));
        process.exit(1);
    }
}
exports.installDependencies = installDependencies;
//# sourceMappingURL=initProject.js.map