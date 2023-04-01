const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
 
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader"
            }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'jquery': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}