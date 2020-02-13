const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: 'production',
  mode: 'development',

  entry: {
    index: './src/index.js',
    page: './src/page.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
    filename: '[name].bundle.js', // 指定构建生成的文件名
    chunkFilename: '[name].[hash:8].js' // 指定分离出来的代码文件的名称
  },

  optimization: {
    // minimize: true,
    // minimizer: [new TerserPlugin()],
    usedExports: true,
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      // chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      // name: 'common',

      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: path.resolve(__dirname, "node_modules"), // 路径在 node_modules 目录下的都作为公共部分
          name: "vendor", // 使用 vendor 入口作为公共部分
          enforce: true,
        },
      },
   },
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
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [ // 返回 postcss 的插件列表
                require('cssnano')(), // 使用 cssnano
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { // 压缩 jpeg 的配置
                progressive: true,
                quality: 65
              },
              optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                enabled: false,
              },
              pngquant: { // 使用 imagemin-pngquant 压缩 png
                quality: '65-90',
                speed: 4
              },
              gifsicle: { // 压缩 gif 的配置
                interlaced: false,
              },
              webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                quality: 75
              },
            },
          },
        ],
      },
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //         fallback: 'file-loader',
      //       },
      //     },
      //   ],
      // },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css' // 这里也可以使用 [hash]
    }), // 将 css 文件单独抽离的 plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['vendor', 'index'],
      template: 'src/index.html',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true
      },
    }), // 生成 html 的 plugin
    new HtmlWebpackPlugin({
      filename: 'page.html',
      chunks: ['vendor', 'page']
    }),
  ],

  devtool: false, // 方便查看源码

  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // 开发服务器启动路径
  },
}
