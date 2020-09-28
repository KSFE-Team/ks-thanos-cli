let store = {};

export const getStore = (namespace) => {
    if (namespace) {
        return store[namespace] || {};
    } else {
        return store;
    }
};

export const setStore = (namespace, data) => {
    store[namespace] = data || {};
};
