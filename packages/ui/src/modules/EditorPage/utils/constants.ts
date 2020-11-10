import Dynamicnect from 'Src/components/Dynamicnect';

export const componentsMap: {
    [key: string]: any;
} = {};

export const setComponents = (key: string, value: any) => {
    const result = {
        ...value,
        component: Dynamicnect(value.component, true),
        config: Dynamicnect(value.config, false),
    };
    componentsMap[key] = result;
};

export const getComponents = () => componentsMap;

export const getContainerComponents = () => filterComponentsByType('container');

export const getBasicComponents = () => filterComponentsByType('basic');

export const getContentComponents = () => filterComponentsByType('content');

export const getBizComponents = () => filterComponentsByType('biz');

const filterComponentsByType = (type: string) =>
    Object.keys(componentsMap).reduce((prev: any[], key: string) => {
        const { tools } = componentsMap[key];
        const { getTools } = tools;
        const componentTools = getTools();
        if (componentTools.groupType === type) {
            return [...prev, componentTools];
        }
        return prev;
    }, []);

export const ACTION = {
    ADD: 'ADD',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
};

export const ONLYCOMPONENT = ['Form', 'Table', 'relationTable'];

/**
 * 表单布局
 */
export const FORMITEM_LAYOUT = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

/* 配置 - 是否必填 - 常量 */
export const ISREQUIRED_TYPE = [
    { VALUE: true, LABEL: '必填' },
    { VALUE: false, LABEL: '非必填' },
];

/* 配置 - true false - 常量 */
export const BOOLEAN_TYPE = [
    { VALUE: true, LABEL: 'true' },
    { VALUE: false, LABEL: 'false' },
];

/**
 * 表单配置常量定义
 */
export const ALIAS = {
    KEY: '表单绑定Key', // 表单绑定key
    LABEL: '表单展示Label', // 表单对应展示名称
    PLACEHOLDER: 'Placeholder',
    DATE_FORMAT: '日期格式',
    SHOW_TIME: '是否有选择时间功能',
    TIME_FORMAT: '时间格式',
    TYPE: '类型',
    ISREQUIRED: '是否必填',
    DEFAULTVALUE: '默认值',
};

/* 表单常用绑定字段 */
export const FIELD_DICT = {
    KEY: 'key',
    LABEL: 'label',
    ISREQUIRED: 'isRequired',
    TYPE: 'type',
};

// biz类型
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
