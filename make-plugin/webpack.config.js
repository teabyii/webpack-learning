const path = require('path');
const FileListPlugin = require('./plugin/file-list');
const FlowPlugin = require('./plugin/flow');

module.exports = {
  mode: 'development',

  entry: './src/index.js', // 指定构建入口文件

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
    filename: 'bundle.js', // 指定构建生成的文件名
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 开发服务器启动路径
  },

  plugins: [
    new FileListPlugin(), // 添加我们自己开发的 plugin
    new FlowPlugin(),
  ],
}
