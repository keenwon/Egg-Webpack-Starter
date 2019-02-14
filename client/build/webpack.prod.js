const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const common = require('./webpack.common.js')

const getAbsolutePath = p => path.resolve(__dirname, p)

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  entry: {
    app: getAbsolutePath('../src/index.js')
  },
  output: {
    path: getAbsolutePath('../../app/public/static'),
    publicPath: '/public/static/',
    hashDigestLength: 8,
    filename: '[name].[chunkhash:8].js'
  },
  plugins: [
    new ManifestPlugin(),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      allChunks: true
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]-[hash:base64:6]'
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
})
