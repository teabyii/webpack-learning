const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    main: './src/index.js', // 指定构建入口文件
  },

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
    filename: 'bundle.js', // 指定构建生成的文件名
  },

  module: {
    rules: [
      {
        test: /\.jsx?/, // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
        include: [
          path.resolve(__dirname, 'src'), // 指定哪些路径下的文件需要经过 loader 处理
        ],
        use: {
          loader: 'babel-loader', // 指定使用的 loader
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {},
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css' // 这里也可以使用 [hash]
    }), // 将 css 文件单独抽离的 plugin
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }), // 生成 html 的 plugin
  ],

  devtool: 'eval-cheap-source-map', // 开发时使用，便于 debug 时查看源码和断点

  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // 开发服务器启动路径
  },
}
