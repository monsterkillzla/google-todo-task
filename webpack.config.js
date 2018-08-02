const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(process.env.NODE_ENV);
console.log(NODE_ENV);

module.exports = {
    entry: [
        './src/main.js'
    ],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('bundle.css'),
        new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: JSON.stringify(NODE_ENV),
              BASE_URL: NODE_ENV == 'development' ? JSON.stringify('/') : JSON.stringify('/ReactRedux-GoogleTasks-MaterialUI/')
            },
        }),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        moduleTemplates: ['*', 'index'],
        extensions: ['', '.js', '.jsx'],
        root: __dirname + '/src'
    },
    resolveLoader: {
        modulesDirectories: ['node_modules', 'bower_components'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        contentBase: __dirname + '/public',
        inline: true,
        hot: true,
        historyApiFallback: true,
        stats: {
            colors: true,
            chunks: false,
            'normal': true
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader'],
                include: [
                    path.resolve(__dirname, 'src')
                ],
                plugins: ['transform-runtime']
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.less$/,
                loader: 'style' +
                '!css?sourceMap' +
                '!autoprefixer-loader?browsers=last 2 version' +
                '!less?sourceMap=source-map-less-inline'
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file?name=img/[path][name].[ext]'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
            }
        ]
    }
};


if (NODE_ENV == 'production') {
    console.log('WTF');
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:       false,
                drop_console:   true,
                unsafe:         true
            }
        }),
        new GhPagesWebpackPlugin({
            path: './public',
            options: {
                message: 'Update React Google Pages',
                user: {
                    name: 'Ivan',
                    email: 'i.andryanau97@gmail.com'
                }
            }
        })
    );
}
