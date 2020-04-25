const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'vendor',
  entry: ['react', 'react-dom'], // 这个例子我们打包 react & react-dom 作为公共类库

  output: {
    path: path.resolve(__dirname, "dll"),
    filename: "vendor.dll.js",
    library: "vendor_[hash]" // 打包后对外暴露的类库名称
  },

  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_[hash]',
      path: path.resolve(__dirname, "dist/manifest.json"), // 使用 DLLPlugin 在打包的时候生成一个 manifest 文件
    })
  ],
}
