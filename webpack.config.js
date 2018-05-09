const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const styleLoader = (env, isScss = true) => {
    const commonLoaders = [
        {
            loader: 'css-loader',
            options: {
                minimize: env.production,
                importLoaders: 1
            }
        }
    ]
    if (isScss) {
        commonLoaders.push('sass-loader')
    }
    if (env.production) {
        return ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: commonLoaders
        })
    }
    return [
        'style-loader',
        ...commonLoaders
    ]
}

const commonPlugins = (env) => ([
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.production ? 'production' : 'development')
    }),
    new HtmlWebpackPlugin({
        template: './index.html',
        favicon: './favicon.png'
    })
])

module.exports = env => {
    const plugins = commonPlugins(env)
    if (env.production) {
        plugins.unshift(new webpack.optimize.UglifyJsPlugin())
        plugins.unshift(new CleanWebpackPlugin(['public/*.*']))
        plugins.unshift(new ExtractTextPlugin('styles.[hash].css'))
    }
    return {
        entry: {
            main: ['./app/index.jsx']
        },
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: '[name].[hash].js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.js', '.json', '.jsx']
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules|bower_components)/,
                    options: {
                        plugins: [
                            'babel-plugin-transform-object-rest-spread'
                        ],
                        presets: [
                            [
                                'babel-preset-env',
                                {
                                    targets: {
                                        browsers: ['last 2 versions']
                                    }
                                }
                            ],
                            'babel-preset-react'
                        ]
                    }
                },
                {
                    test: /\.css$/,
                    use: styleLoader(env, false)
                },
                {
                    test: /\.scss$/,
                    use: styleLoader(env)
                }
            ]
        },
        plugins
    }
}
