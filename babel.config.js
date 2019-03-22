module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3
        }
      ],
      '@babel/preset-react'
    ],
    plugins: [
      'react-hot-loader/babel',
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-class-properties',
      '@babel/proposal-object-rest-spread',
      [
        'babel-plugin-react-css-modules',
        {
          generateScopedName: '[local]-[hash:base64:6]',
          filetypes: {
            '.scss': {
              syntax: 'postcss-scss'
            }
          }
        }
      ],
      /**
       * babel-plugin-react-css-modules 不支持 webpack 的 alias
       * 使用 babel-plugin-module-resolver 替代
       */
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': './src'
          }
        }
      ]
    ]
  }
}
