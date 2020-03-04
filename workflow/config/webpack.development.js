module.exports = {
  module: {
    rules: [
      {
        test: /\.css/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },

  devtool: 'eval-cheap-source-map', // 开发时使用，便于 debug 时查看源码和断点
};
