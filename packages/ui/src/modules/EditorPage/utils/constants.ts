import Dynamicnect from 'Src/components/Dynamicnect';

const componentsMap: {
    [key: string]: any;
} = {};

export const setComponents = (key: string, value: any) => {
    const result = {
        ...value,
        component: Dynamicnect(value.component),
    };
    componentsMap[key] = result;
};

export const getComponents = () => componentsMap;
