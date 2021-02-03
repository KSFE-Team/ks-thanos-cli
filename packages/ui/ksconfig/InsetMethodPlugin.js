const HtmlWebpackPlugin = require('html-webpack-plugin');

class InsetMethodPlugin {

    apply(compiler) {
        compiler.hooks.compilation.tap('InsetMethodPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit
                .tapAsync(
                    'InsetMethodPlugin',
                    (data, cb) => {
                        data.html = data.html.replace(
                            '<body>',
                            `<body><script>window.METHOD = 'onlyPreview'</script>`
                        );
                        cb(null, data);
                    }
                );
        });
    }
}

module.exports = InsetMethodPlugin;
