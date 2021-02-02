module.exports = {
    'type': 'pcweb',
    'publicPath': '/',
    'useTs': true,
    'useTsCompt': true,
    port: 8001,
    plugins: [
        require.resolve('./applyPlugins')
    ]
};
