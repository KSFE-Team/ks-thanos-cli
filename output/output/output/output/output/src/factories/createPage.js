"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("../page");
const file_1 = require("../utils/file");
function createPage(options) {
    const { pagePath, pageName, pageConfig } = options;
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
                {
                    name: component.name,
                    props: component.props
                }
            ]);
        });
    }
    file_1.writeFile(pagePath, pageInstance.toCode());
}
exports.createPage = createPage;
//# sourceMappingURL=createPage.js.map