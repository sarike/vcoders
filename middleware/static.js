const path = require('path')
const koaStatic = require('koa-static')
const webpack = require('webpack')
const webpackMiddleware = require('koa-webpack')
const webpackCfg = require('../webpack.config')

module.exports = () => {
    const isDev = process.env.NODE_ENV === 'development'
    if (!isDev) {
        const root = path.resolve(__dirname, '../public')
        return koaStatic(root, { defer: true })
    }
    const compiler = webpack(webpackCfg({ production: !isDev }))
    return webpackMiddleware({ compiler })
}
