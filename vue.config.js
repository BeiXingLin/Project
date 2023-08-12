'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const { off } = require('process')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' 

const port =  38000 

module.exports = {

  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 38000,
    open: true,
    https:false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:30081'
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    externals: {
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'cos-js-sdk-v5': 'COS'
    }
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    config.plugins.delete('prefetch')

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' 
                },
                elementUI: {
                  name: 'chunk-elementUI', 
                  priority: 20, 
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ 
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), 
                  minChunks: 3, 
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
