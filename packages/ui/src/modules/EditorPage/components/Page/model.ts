import { actions } from 'kredux';
// import { message } from 'antd';
// import Api from 'Src/utils/request';

/**
 * 首页页面的业务模块
 */
const projectModel = {
    namespace: 'page', // 项目命名空间,

    initialState: {
        pageJson: {},
    },

    effects: {
        /**
         * 初始化
         */
        init() {
            actions.page.setReducers({
                name: 'caic',
            });
        },
    },
};

export default projectModel;
