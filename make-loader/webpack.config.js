const path = require('path');

module.exports = {
  mode: 'development',

  entry: './src/index.js', // 指定构建入口文件

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
    filename: 'bundle.js', // 指定构建生成的文件名
  },

  module: {
    rules: [
      {
        test: /\.md$/,
        exclude: /node_modules/,
        loader: path.resolve('./loader/index.js'), // 使用本地的 ./loader/index.js 作为 loader
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          path.resolve('./loaders/async')
        ],
      },
      {
        test: /\.test\.js$/,
        exclude: /node_modules/,
        use: [
          path.resolve('./loaders/pitch/a.js'),
          path.resolve('./loaders/pitch/b.js'),
          path.resolve('./loaders/pitch/c.js')
        ],
      }
    ],
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // 开发服务器启动路径
  }
}
