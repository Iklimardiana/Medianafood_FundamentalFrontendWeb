const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
 
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /styles/,
        use: [
          'to-string-loader', 
          'css-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  resolve: {
    alias: {
      // Ubah path untuk modul bootstrap
      bootstrap: "bootstrap/dist/js/bootstrap.bundle.js",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}