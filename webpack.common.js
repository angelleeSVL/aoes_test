const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: './src/index.tsx',
    entry:  [
        'babel-polyfill',
        './src/index.tsx'
      ]
    ,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          exclude: [
            path.resolve(__dirname,'node_modules')
          ],
          enforce: "pre",
        },
        { test: /\.tsx?$/, 
          loader: "ts-loader",
         exclude: /node_modules/ },
        {
          test: /\.(png|jpg|bmp)$/,
          use: [{
            loader: 'file-loader',
            options: {
              emitFile: true
            }
          }]
        }, 
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: '[name].js',
      sourceMapFilename: '[file].map',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: './index.html',
        filename: './index.html',
        inject: true,
        title: "AOES"
      }),
      
     
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: './',
      hot: true
   },
   
};

