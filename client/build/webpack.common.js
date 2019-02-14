const path = require('path')

const getAbsolutePath = p => path.resolve(__dirname, p)

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': getAbsolutePath('../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}
