const express = require('express')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const webpackOptions = require('./webpack.config.js') // webpack 配置文件的路径

// 本地的开发环境默认就是使用 development mode
webpackOptions.mode = 'development'

const compiler = webpack(webpackOptions)
const app = express()

app.use(middleware(compiler, {
  // ...
}))

// 其他 Web 服务中间件
// app.use(...)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
