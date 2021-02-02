const InsetMethodPlugin = require('./InsetMethodPlugin');
module.exports = function(ctx) {
    console.log('process.env.NODE_METHOD', process.env.NODE_METHOD);
    ctx.webpackChain((webpackConfig) => {
        webpackConfig.plugin('insetMethodPlugin').use(InsetMethodPlugin, [{
            method: process.env.NODE_METHOD
        }]);
    });
};
