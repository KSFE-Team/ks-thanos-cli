"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("./page");
const file_1 = require("../../utils/file");
const path_1 = __importDefault(require("path"));
const component_1 = require("../component/component");
function createPage(options) {
    const { pageName, pageConfig, projectPath } = options;
    const pagePath = path_1.default.join(projectPath, 'pages', pageName, 'index.js');
    const pageInstance = new page_1.Page(pageName);
    const { components = [] } = pageConfig;
    if (components.length) {
        components.forEach((component) => {
            pageInstance.addImports({
                name: component.name,
                source: component.source,
                defaultImport: component.default
            });
            pageInstance.addComponents([
                new component_1.ComponentInjection(component)
            ]);
        });
    }
    file_1.writeFile(pagePath, pageInstance.toCode());
    return pageInstance;
}
exports.createPage = createPage;
//# sourceMappingURL=createPage.js.map