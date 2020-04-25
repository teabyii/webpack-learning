const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const threadLoader = require('thread-loader');

// const threadLoaderOptions = {
//   // 这里填写对应 thread-loader 的配置
//   // 预热时的配置和使用 thread-loader 时的配置要一致，所以这里统一使用一个变量来管理
//   // 配置参考官方文档：https://github.com/webpack-contrib/thread-loader
// }

// // thread-loader 的预热，可以加速启动
// threadLoader.warmup(threadLoader, [
//   'babel-loader',
//   // 更多其他需要使用 thread-loader 的 loader
// ]);

module.exports = {
  mode: 'development',

  entry: {
    main: './src/index.js', // 指定构建入口文件
  },

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
    filename: 'bundle.js', // 指定构建生成的文件名
  },

  resolve: {
    alias: {
      // 让 jquery 走 src 路径下的源码进行构建，而不是 dist 下构建好的文件
      jquery: path.resolve(__dirname, 'node_modules/jquery/src/jquery.js'),
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?/, // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: threadLoaderOptions
          // },
          {
            loader: 'babel-loader', // 指定使用的 loader
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ]
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
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist/manifest.json'),
      // 指定需要用到的 manifest 文件，
      // webpack 会根据这个 manifest 文件的信息，分析出哪些模块无需打包，直接从另外的文件暴露出来的内容中获取
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css' // 这里也可以使用 [hash]
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // 将外部 dll 添加到 html 中
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './dist/*.dll.js'),
    }),
  ],

  devtool: 'eval-cheap-source-map', // 开发时使用，便于 debug 时查看源码和断点

  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // 开发服务器启动路径
  },
}
