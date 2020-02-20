const path = require('path');

const SRC_PATH = path.resolve(__dirname, 'src');
const COMPONENTS_PATH = path.resolve(SRC_PATH, 'components');
const MEDIAS_PATH = path.resolve(SRC_PATH, 'medias');
const MODULES_PATH = path.resolve(SRC_PATH, 'modules');
const STYLES_PATH = path.resolve(SRC_PATH, 'styles');
const UTILS_PATH = path.resolve(SRC_PATH, 'utils');
const KS_UI_PATH = path.resolve(__dirname, 'node_modules/ks-ui/build/packages');
const SERVICES_PATH = path.resolve(SRC_PATH, 'services');
const REDUCERS_PATH = path.resolve(SRC_PATH, 'reducers');
const ACTIONS_PATH = path.resolve(SRC_PATH, 'actions');
const CONTAINERS_PATH = path.resolve(SRC_PATH, 'containers');
const MODELS_PATH = path.resolve(SRC_PATH, 'models');

module.exports = {
    resolve: {
        alias: {
            Components: COMPONENTS_PATH,
            Medias: MEDIAS_PATH,
            Modules: MODULES_PATH,
            Styles: STYLES_PATH,
            Utils: UTILS_PATH,
            Ksui: KS_UI_PATH,
            Services: SERVICES_PATH,
            Reducers: REDUCERS_PATH,
            Actions: ACTIONS_PATH,
            Containers: CONTAINERS_PATH,
            Models: MODELS_PATH,
            Src: SRC_PATH,
        }
    }
};
