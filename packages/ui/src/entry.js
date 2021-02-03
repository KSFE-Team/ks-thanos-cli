import { isOnlyPreview } from 'Src/utils';
/* eslint-disable camelcase,no-undef */
// __webpack_public_path__ = '/';
// 乾坤下运行
// if (process.env.NODE_ENV === 'development') {
// 开发环境
if (!isOnlyPreview()) {
    __webpack_public_path__ = '/';
}
// __webpack_public_path__ = 'http://localhost:8001/';
