const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'json']

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 1024,
        minRatio: 0.8
      })
    ]
  },
  devServer: {
    proxy: {
      '/api_template': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        secure: true,
        pathRewrite: { '^/api_template': '' }
      },
      '/api_map': {
        target: 'http://121.43.35.5:8805',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api_map': '' }
      },
      '/api_datav': {
        target: 'https://geo.datav.aliyun.com',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '^/api_datav': '' }
      }
    }
  }
})
