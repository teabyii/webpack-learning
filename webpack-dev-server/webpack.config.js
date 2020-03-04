const path = require('path');

module.exports = {
  mode: 'development',

  entry: './src/index.js', // 指定构建入口文件

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
    filename: 'bundle.js', // 指定构建生成的文件名
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 开发服务器启动路径

    before(app){
      app.get('/some/path', function(req, res) { // 当访问 /some/path 路径时，返回自定义的 json 数据
        res.json({ custom: 'response' })
      })
    },

    proxy: {
      '/api': {
        target: "http://localhost:8080", // 将 URL 中带有 /api 的请求代理到本地的 8080 端口的服务上
        pathRewrite: { '^/api': '' }, // 把 URL 中 path 部分的 `api` 移除掉
      },
    }
  }
}
