var path = require('path');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        "style-loader", "css-loader", "sass-loader"
      ]
    }]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 4000
  }

};