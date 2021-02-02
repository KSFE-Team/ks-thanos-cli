const HtmlWebpackPlugin = require('html-webpack-plugin');

class InsetMethodPlugin {
    constructor(options = {}) {
        this.options = {
            method: options.method
        };
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('InsetMethodPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit
                .tapAsync(
                    'InsetMethodPlugin',
                    (data, cb) => {
                        if (this.options.method === 'onlyPreview') {
                            data.html = data.html.replace(
                                '<body>',
                                `<body><script>window.METHOD = 'onlyPreview'</script>`
                            );
                        }
                        cb(null, data);
                    }
                );
        });
    }
}

module.exports = InsetMethodPlugin;
