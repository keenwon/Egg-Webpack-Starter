const devConfig = require('./client/build/webpack.dev')
const prodConfig = require('./client/build/webpack.prod')

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig
