const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const config = {
    mode: 'development',
    devtool: '#eval-source-map',
    entry: {
        app: './source/js/app.js',
        admin: './source/js/admin.js'
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ],
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
};

if (process.env.NODE_ENV === "production") {
    config.devtool = "#source-map";
    config.mode = 'production';
    config.output= {
        filename: '[name].min.js'
    };
}

module.exports = config;