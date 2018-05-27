const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const styleLoader = (isScss = true) => {
    const isProd = process.env.NODE_ENV === 'production'
    const commonLoaders = [
        {
            loader: 'css-loader',
            options: {
                minimize: isProd,
                importLoaders: 1
            }
        }
    ]
    if (isScss) {
        commonLoaders.push('sass-loader')
    }
    if (isProd) {
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

const commonPlugins = () => ([
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
        template: './index.html',
        favicon: './favicon.png'
    })
])

module.exports = () => {
    const plugins = commonPlugins()
    if (process.env.NODE_ENV === 'production') {
        plugins.unshift(new CleanWebpackPlugin(['public/*.*']))
        plugins.unshift(new ExtractTextPlugin('styles.[hash].css'))
    }
    return {
        mode: process.env.NODE_ENV,
        entry: ['./app/index.jsx'],
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: '[name].[hash].js',
            chunkFilename: '[name].[hash].js',
            publicPath: '/'
        },
        resolve: {
            symlinks: false,
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
                            'babel-plugin-transform-object-rest-spread',
                            'babel-plugin-syntax-dynamic-import'
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
                    use: styleLoader(false)
                },
                {
                    test: /\.scss$/,
                    use: styleLoader()
                }
            ]
        },
        plugins
    }
}
