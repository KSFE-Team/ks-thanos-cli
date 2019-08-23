
import request from 'Src/utils/request';
export const STATE = {
    table: {
        name: '',
        list: [],
        page: 1,
        limit: 10,
        total: 0
    }
};

export default {
    namespace: 'home',

    state: { ...STATE },

    effects: {
        
        async loadTableList(payload, getState) {
            try {
                const state = getState().home.table;

                let postData = {
                    size: state.limit,
                    page: state.page,
                };

                const response = await request('/api/ser', { 
                    method: GET,
                    data: postData
                });

                if (response && response.code === 200) {
                    actions.home.setReducer({
                        table: {
                            ...state,
                            list: response.data.content,
                            page: response.data.pageNumber,
                            total: response.data.totalElements
                        }
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
};        
        