
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
    namespace: 'test',

    state: { ...STATE },

    effects: {
        
        async loadTableList(payload, getState) {
            try {
                const state = getState().test.table;

                let postData = {
                    size: state.limit,
                    page: state.page,
                };

                const response = await request('/api/ser', { 
                    method: GET,
                    data: postData
                });

                if (response && response.code === 200) {
                    actions.test.setReducer({
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
        