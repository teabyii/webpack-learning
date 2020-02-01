const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  // entry: './src/index.js', // 指定构建入口文件

  entry: {
    main: './src/index.js' // 指定构建入口文件
  },

  output: {
    path: path.join(__dirname, 'dist/[hash]/'), // 使用 hash
    filename: '[name].js', // 使用 entry 名称
  },

  module: {
    rules: [
      {
        test: /\.jsx?/, // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
        include: [
          path.resolve(__dirname, 'src') // 指定哪些路径下的文件需要经过 loader 处理
        ],
        use: {
          loader: 'babel-loader', // 指定使用的 loader
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  plugins: [
    new CopyPlugin([
      { from: 'src/public', to: 'public' },
    ]),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // 开发服务器启动路径
  }
}
