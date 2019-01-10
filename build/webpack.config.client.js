const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const merge =  require('webpack-merge')
const baseConfig= require('./webpack.config.base')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const devServer = {
    port: 8000,
    host: '0.0.0.0',  // 以任何方式访问
    overlay: {
        errors: true,
    },
    headers: {'Access-Control-Allow-Origin': '*'},
    hot: true
}



const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin({
        template:path.join(__dirname, 'template.html')
    })
]

let config

if (isDev) {
    config= merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        devServer,
        resolve: {
          alias: {
              'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
          }
        },
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
} else {
    config= merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/index.js'),
            vendor: ['vue']
        },
        output: {
          filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            }),
            new webpack.NamedChunksPlugin(),  // 配置异步组件 代码分割 文件名 0.hash.js  1.hash.js
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, '../static'),
                    to: path.join(__dirname, '../dist'),
                    ignore: ['.*','*.scss']//增加了一个忽略.scss文件
                }
            ])
        ])
    })
}

module.exports = config
