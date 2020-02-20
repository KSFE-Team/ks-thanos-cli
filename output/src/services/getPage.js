"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("../utils/request"));
const api_1 = __importDefault(require("../utils/request/api"));
async function getPage(pageName) {
    const response = await request_1.default({
        url: api_1.default.template,
        params: {
            pageName
        }
    });
    const pageData = JSON.parse(response.pageData);
    return pageData;
}
exports.getPage = getPage;
//# sourceMappingURL=getPage.js.map