import axios from 'axios';

const gitBaseUrl = 'http://gitlab.devops.kaishustory.com/api/v4/projects';
const privateToken = 'A44JhWkEkax2zK_7k1at';

interface CommitIdProps {
    initCommitId: string;
    onLineCommitId: string;
}

interface CodeOnlineProps {
    codeDeleteCount: number;
    codeOnlineCount: number;
}

// 查询项目ID
async function searchProjectId(projectName: string) {
    const response = await axios.get(`${gitBaseUrl}?search=${projectName}&private_token=${privateToken}`);
    if (response.status === 200) {
        const { data } = response;
        const projectId = data[0].id;
        return projectId;
    }
    return '项目ID查询失败';
}

// 查询项目指定文件的初始和上线commitid
async function searchCommitId(projectId: number, templateName: string, pagePath: string) {
    const url = `${gitBaseUrl}/${projectId}/repository/commits?path=${pagePath}&ref_name=master&private_token=${privateToken}`;
    const response = await axios.get(url);
    if (response.status === 200) {
        const { data } = response;
        const initCommitId = data[data.length - 1].id;
        const onLineCommitId = data[0].id;
        return { initCommitId, onLineCommitId };
    }
    return 'commitId查询失败';
}

// 获取指定commitid(暂时不用了)
// function getCommitId(initMsg: string, onlineMsg: string, commitList: []) {
//     let commitId: CommitIdProps;
//     commitList.forEach((item: any) => {
//         if (item.message.indexOf(initMsg) > -1) {
//             commitId.initCommitId = item.id;
//         } else if (item.message.indexOf(onlineMsg) > -1) {
//             commitId.onLineCommitId = item.id;
//         }
//         return commitId;
//     });
// }

// 获取初始行数
// eslint-disable-next-line consistent-return
async function initCount(initCommitId: string, projectId: number) {
    const url = `${gitBaseUrl}/${projectId}/repository/commits/${initCommitId}?private_token=${privateToken}`;
    const response = await axios.get(url);
    let codeInitCount: number;
    if (response.status === 200) {
        const { data } = response;
        codeInitCount = data.stats.total;
        return codeInitCount;
    }
}
// 获取上线行数
// eslint-disable-next-line consistent-return
async function onlineCount(onLineCommitId: string, projectId: number) {
    const url = `${gitBaseUrl}/${projectId}/repository/commits/${onLineCommitId}?private_token=${privateToken}`;
    const response = await axios.get(url);
    if (response.status === 200) {
        const { data } = response;
        const codeOnlineCount = data.stats.total;
        const codeDeleteCount = data.stats.deletions;
        return { codeOnlineCount, codeDeleteCount };
    }
}

export const getEffectiveRate = async (params: any) => {
    const { projectName, templateName, pagePath } = params;
    const projectId = await searchProjectId(projectName);
    const commitId = await searchCommitId(projectId, templateName, pagePath);
    console.log(commitId);
    const { initCommitId, onLineCommitId } = commitId as any;
    const codeInitCount = await initCount(initCommitId, projectId);
    const codeOnline = await onlineCount(onLineCommitId, projectId);
    console.log(codeOnline);
    const { codeDeleteCount, codeOnlineCount } = codeOnline as CodeOnlineProps;
    const effectiveRate = `${(((codeInitCount - codeDeleteCount) / codeOnlineCount) * 100).toFixed(2)}%`;
    return { codeInitCount, effectiveRate, ...codeOnline };
};
