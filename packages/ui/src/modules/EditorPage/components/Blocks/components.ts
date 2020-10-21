let componentMap = {};
export const getComponent = () => componentMap;

export const setComponent = (value: any) => {
    componentMap = {
        ...componentMap,
        ...value,
    };
};
