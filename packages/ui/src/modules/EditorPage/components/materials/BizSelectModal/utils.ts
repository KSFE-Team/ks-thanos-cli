import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

interface BizSelectModalConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
    placeholder: string;
    componentType: string;
    type: string;
    source: string;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): BizSelectModalConfig => ({
    componentName: 'BizSelectModal',
    source: 'Src/components/@ks/kms-bizselectmodal',
    default: false,
    placeholder: '请选择对应内容',
    key: '',
    label: '',
    componentType: 'cloud',
    isRequired: REQUIRED,
    type: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'BizSelectModal',
    icon: 'calendar',
    componentName: 'BizSelectModal',
    cloudName: '@ks/kms-bizselectmodal',
    groupType: 'biz',
});

export const validator = (config: any) =>
    // eslint-disable-next-line consistent-return
    baseValidator(config).then(() => {
        if (!config.type) {
            return new Error('请选择类型');
        }
    });

export const toCode = (config: BizSelectModalConfig, formConfig: BizSelectModalConfig): BizSelectModalConfig => {
    const formObject = {
        ...config,
        ...formConfig,
        componentType: 'cloud',
        source: 'Src/components/@ks/kms-bizselectmodal',
        props: {
            placeholder: formConfig.label,
            type: formConfig.type,
        },
    };
    delete formObject.type;
    delete formObject.placeholder;
    return { ...formObject };
};
// 类型
export const DEFAULT_OPTIONS = [
    {
        value: 'activity',
        name: '活动模板列表',
    },
    {
        value: 'adPicture',
        name: '素材图片',
    },
    {
        value: 'album',
        name: '专辑',
    },
    {
        value: 'appleProduct',
        name: '苹果商品',
    },
    {
        value: 'adPosition',
        name: '广告位',
    },
    {
        value: 'camp',
        name: '训练营',
    },
    {
        value: 'campCourse',
        name: '训练营课程',
    },
    {
        value: 'campStage',
        name: '训练营分期',
    },
    {
        value: 'contentPack',
        name: '内容礼包',
    },
    {
        value: 'coupon',
        name: '优惠券',
    },
    {
        value: 'discountSuit',
        name: '优惠套装',
    },
    {
        value: 'entityTuan',
        name: '实物拼团',
    },
    {
        value: 'file',
        name: '附件',
    },
    {
        value: 'giftPackage',
        name: '礼包',
    },
    {
        value: 'knowledge',
        name: '故事小知识',
    },
    {
        value: 'mallProduct',
        name: '自建商品',
    },
    {
        value: 'newLabel',
        name: '新标签系统',
    },
    {
        value: 'newUserTask',
        name: '新用户礼包',
    },
    {
        value: 'panguProduct',
        name: '盘古商品',
    },
    {
        value: 'previewStory',
        name: '试听故事',
    },
    {
        value: 'product',
        name: '商品',
    },
    {
        value: 'question',
        name: '题库题目',
    },
    {
        value: 'special',
        name: '专题',
    },
    {
        value: 'story',
        name: '故事',
    },
    {
        value: 'storyArticle',
        name: '故事文稿',
    },
    {
        value: 'subChannel',
        name: '子频道',
    },
    {
        value: 'usr',
        name: '用户',
    },
    {
        value: 'tag',
        name: '标签',
    },
    {
        value: 'vipCard',
        name: '会员卡',
    },
    {
        value: 'userGroup',
        name: '用户组',
    },
    {
        value: 'testUser',
        name: '测试人员',
    },
    {
        value: 'live',
        name: '直播管理',
    },
    {
        value: 'promotion',
        name: '白圭促销商品',
    },
    {
        value: 'attrbute',
        name: 'pms属性、规格',
    },
    {
        value: 'outAttrbute',
        name: '外部属性、规格',
    },
    {
        value: 'outAttrbuteValue',
        name: '外部属性值、规格值',
    },
    {
        value: 'virtualMedal',
        name: '勋章',
    },
    {
        value: 'task',
        name: '任务',
    },
    {
        value: 'warehouse',
        name: '仓库列表',
    },
    {
        value: 'resourcePack',
        name: '资源包',
    },
    {
        value: 'newAudioStory',
        name: '音频故事',
    },
    {
        value: 'newVideoStory',
        name: '视频故事',
    },
    {
        value: 'newAudioAlbum',
        name: '音频专辑',
    },
    {
        value: 'newVideoAlbum',
        name: '视频专辑',
    },
    {
        value: 'content',
        name: '单个内容',
    },
];
