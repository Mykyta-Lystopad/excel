const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV = 'production'
const isDev = !isProd

const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const jsLoaders = () => {
    const loaders = [
        {
        loader: "babel-loader",
        options:
            {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
    ]
    if (isDev){
        loaders.push('eslint-loader')
    }
    return loaders
}

module.exports = {
    target: 'web', // for reloaded browser page webpack v.5 & up
    context: path.resolve(__dirname,'src'),
    mode: "development",
    entry: ['@babel/polyfill','./index.js',], // точка входа в приложение
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname,'dist')
    },
    // target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    devtool: isProd ? 'source-map' : false,
    devServer: {
        port: 8000,
        hot: isDev,

    },
    resolve: {
        extensions: ['.js'],
        alias: {                // сокращения путей к компонентам
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd, // удаляем коментарии
                collapseWhitespace: isProd // удаляем пробелы
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ],
        }),
        new MiniCssExtractPlugin(
            {
            filename: filename('css')
            }
        )
        ],

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            }

        ],
    },
}
