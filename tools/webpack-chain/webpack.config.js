const path = require('path');
const Config = require('webpack-chain');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = new Config();

config
  .mode('development')
  .entry('main')
    .add('./src/index.js') // 指定构建入口文件
    .end()
  .output
    .path(path.resolve(__dirname, 'dist')) // 指定构建生成文件所在路径
    .filename('bundle.js'); // 指定构建生成的文件名

config
  .module
  .rule('style')
    .test(/.css$/)
    .use('style')
      .loader('style-loader')
      .end()
    .use('css')
      .loader('css-loader')
      .end();

config
  .plugin('html')
    .use(HtmlWebpackPlugin, [{ template: 'src/index.html' }]);

config
  .devServer
  .contentBase(path.resolve(__dirname, 'dist')); // 开发服务器启动路径

module.exports = config.toConfig();
