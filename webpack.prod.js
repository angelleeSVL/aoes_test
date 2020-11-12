const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const EncodingPlugin = require('webpack-encoding-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: path.resolve(__dirname, './src') + '/index.tsx',
    output: {
        /*Webpack producing results*/
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js"
    },
    plugins: [
      new EncodingPlugin({
      encoding: 'iso-8859-1'
      }),
    ],
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },
    
});