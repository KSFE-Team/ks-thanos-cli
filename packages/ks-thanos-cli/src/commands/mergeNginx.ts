/**
 * 运行拉取nginx配置命令
 */
export async function runMergeNginx() {
    const path = require('path');
    const fs = require('fs');
    const os = require('os');
    const { execSync } = require('child_process');
    const homePath = path.join(os.homedir());
    const thanosPath = path.join(homePath, '.thanos');
    const nginxConfigPath = path.join(thanosPath, 'nginxConf');
    const commonFilePath = path.join(nginxConfigPath, 'ks-pcweb-cms-common-file');
    const nginxPath = `/usr/local/etc/nginx`;
    const nginxConDirPath = path.join(nginxPath, 'conf');
    const gitUrl = 'http://gitlab.devops.kaishustory.com/ks_h5_kms/ks-pcweb-cms-common-file.git';
    
    /* 检测目录 */
    const checkDir = (path: string) => {
        let stat;
        try {
            stat = fs.statSync(path);
            return !!stat.isDirectory();
        } catch (err) {
        // console.log('err', err);
            return false;
        }
    };
    
    /* 创建目录 */
    const createDir = (path: string) => {
        execSync(`mkdir -p ${path}`);
    };
    
    /* 如果没有thanos目录则创建目录 */
    if (!checkDir(thanosPath)) {
        createDir(thanosPath);
    }
    
    /* 如果没有nginxConf目录则创建目录 */
    if (!checkDir(nginxConfigPath)) {
        createDir(nginxConfigPath);
    }
    
    /* 如果没有公共项目 */
    if (!checkDir(commonFilePath)) {
        execSync(`cd ${nginxConfigPath} && git clone ${gitUrl}`);
    }
    
    /* 拉去最新代码 */
    execSync(`cd ${commonFilePath} && git pull`);
    console.log('拉取最新代码');
    
    /* 如果nginx目录没有创建其目录 */
    if (!checkDir(nginxConDirPath)) {
        createDir(nginxConDirPath);
    }
    
    /* 删除配置文件 */
    execSync(`rm -rf ${nginxConDirPath}/*`);
    /* 转移配置 */
    execSync(`cp -r ${commonFilePath}/* ${nginxConDirPath}`);
    /* 重启nginx */
    execSync(`sudo nginx -s reload`);
    console.log('已重启nginx');
}