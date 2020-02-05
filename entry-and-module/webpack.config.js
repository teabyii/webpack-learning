const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pagesRoot = path.resolve(__dirname, './src/pages');
const entries = fs.readdirSync(pagesRoot).reduce((entries, page) => {
  entries[page] = path.resolve(pagesRoot, page);
  return entries;
}, {});

module.exports = {
  mode: 'development',

  entry: entries,

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
    filename: '[name].bundle.js', // 指定构建生成的文件名
  },

  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.css'],

    alias: {
      utils: path.resolve(__dirname, 'src/utils') // 这里使用 path.resolve 和 __dirname 来获取绝对路径
    },
  },

  module: {
    rules: [
      {
        test: /\.css/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // 开发服务器启动路径
  }
}
