const webpackStream = require('webpack-stream');

module.exports = {
    entry: {
        app: './source/js/app.js',
        admin: './source/js/admin.js',
    },
    output: {
        filename: '[name].min.js'
    },
    devtool: '#eval-source-map',
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader' 
            }
        ]
    }
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpackStream.webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpackStream.webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpackStream.webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}