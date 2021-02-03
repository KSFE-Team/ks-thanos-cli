import { isOnlyPreview } from './index';

export const FILE_TYPE = [
    {
        key: 'file',
        name: '文件',
        icon: 'File',
        color: '',
    },
    {
        key: 'dir',
        name: '文件夹',
        icon: 'Folder',
        color: 'rgba(135, 207, 246)',
    },
];

export const PATH_NAME = isOnlyPreview() ? '/h5/ks-thanos' : '';
