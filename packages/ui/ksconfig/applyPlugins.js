const InsetMethodPlugin = require('./InsetMethodPlugin');
module.exports = function(ctx) {
    if (process.env.NODE_METHOD === 'onlyPreview') {
        ctx.webpackChain((webpackConfig) => {
            webpackConfig.plugin('insetMethodPlugin').use(InsetMethodPlugin);
            // webpackConfig.output.publicPath('/h5/ks-thanos/');
        });
    }
};
