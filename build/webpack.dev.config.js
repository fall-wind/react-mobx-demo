const path = require('path')
const webpackConfig = require('./base')

module.exports = {
    ...webpackConfig,
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        port: 9000
    },
    devtool: "eval-source-map",
}