const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const getAbsolutePath = p => path.resolve(__dirname, p)

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client?path=http://127.0.0.1:9000/__webpack_hmr&reload=true',
      getAbsolutePath('../src/index.js')
    ]
  },
  output: {
    path: getAbsolutePath('../../app/public/static'),
    publicPath: '/public/static/',
    filename: '[name].js'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]-[hash:base64:6]'
            }
          },
          'sass-loader'
        ]
      }
    ]
  }
})
