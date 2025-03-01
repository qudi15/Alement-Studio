const webpackConfig = require('./webpack.config')

module.exports = {
  /**
   *  这里是静态资源的地址，非页面url
   *  /mf-platform-vue/ -> http:/xxx/mf-platform-vue/
   *  /                 -> http:/xxx/
   */
  publicPath: process.env.NODE_ENV === 'production'
    ? '/mf-application-master-data/'
    : '//localhost:10000/',
  // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
  css: {
    extract: false
  },
  configureWebpack: webpackConfig,
  devServer: {
    contentBase: './',
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://bp.surrounding.api',
        ws: false,
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
