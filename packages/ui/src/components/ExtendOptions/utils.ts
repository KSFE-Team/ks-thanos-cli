/**
 * 获取同级区域块
 */
export const getFragments = (components: any[] = [], stores: any = {}) => {
    if (!components.length) {
        return [];
    }
    const fragments: any[] = [];
    components.find(({ componentName, components: arr }) => {
        if (componentName === 'Form') {
            arr.forEach((it: any) => {
                if (it.componentName === 'Fragment' && stores[it.id] && stores[it.id].fragmentName) {
                    fragments.push({
                        name: stores[it.id].fragmentName,
                        id: it.id,
                    });
                }
            });
            return true;
        }
        return false;
    });
    return fragments;
};
