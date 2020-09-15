/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'BizSelectModal',
    source: 'Src/materials/@ks/kms-bizselectmodal',
    default: false,
    componentType: 'cloud',
    props: {
        type: ''
    },
    key: '',
    label: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'BizSelectModal',
    icon: 'edit',
    componentName: 'BizSelectModal',
    cloudName: '@ks/kms-bizselectmodal'
});

/**
 * 初始化state
 */
export const initState = {
    formData: {
        type: ''
    },
    isTouch: false,
    current: {
        id: '',
        props: {}
    },
    inputType: ''
};

export const DEFAULT_OPTIONS = [
    {
        value: 'activity',
        name: '活动模板列表'
    },
    {
        value: 'adPicture',
        name: '素材图片',
    },
    {
        value: 'album',
        name: '专辑'
    },
    {
        value: 'appleProduct',
        name: '苹果商品'
    },
    {
        value: 'adPosition',
        name: '广告位'
    },
    {
        value: 'camp',
        name: '训练营'
    },
    {
        value: 'campCourse',
        name: '训练营课程'
    },
    {
        value: 'campStage',
        name: '训练营分期'
    },
    {
        value: 'contentPack',
        name: '内容礼包'
    },
    {
        value: 'coupon',
        name: '优惠券'
    },
    {
        value: 'discountSuit',
        name: '优惠套装'
    },
    {
        value: 'entityTuan',
        name: '实物拼团'
    },
    {
        value: 'file',
        name: '附件'
    },
    {
        value: 'giftPackage',
        name: '礼包'
    },
    {
        value: 'knowledge',
        name: '故事小知识'
    },
    {
        value: 'mallProduct',
        name: '自建商品'
    },
    {
        value: 'newLabel',
        name: '新标签系统'
    },
    {
        value: 'newUserTask',
        name: '新用户礼包'
    },
    {
        value: 'panguProduct',
        name: '盘古商品'
    },
    {
        value: 'previewStory',
        name: '试听故事'
    },
    {
        value: 'product',
        name: '商品'
    },
    {
        value: 'question',
        name: '题库题目'
    },
    {
        value: 'special',
        name: '专题'
    },
    {
        value: 'story',
        name: '故事'
    },
    {
        value: 'storyArticle',
        name: '故事文稿'
    },
    {
        value: 'subChannel',
        name: '子频道'
    },
    {
        value: 'usr',
        name: '用户'
    },
    {
        value: 'tag',
        name: '标签'
    },
    {
        value: 'vipCard',
        name: '会员卡'
    },
    {
        value: 'userGroup',
        name: '用户组'
    },
    {
        value: 'testUser',
        name: '测试人员'
    },
    {
        value: 'live',
        name: '直播管理'
    },
    {
        value: 'promotion',
        name: '白圭促销商品'
    },
    {
        value: 'attrbute',
        name: 'pms属性、规格'
    },
    {
        value: 'outAttrbute',
        name: '外部属性、规格'
    },
    {
        value: 'outAttrbuteValue',
        name: '外部属性值、规格值'
    },
    {
        value: 'virtualMedal',
        name: '勋章'
    },
    {
        value: 'task',
        name: '任务'
    },
    {
        value: 'warehouse',
        name: '仓库列表'
    }
];
