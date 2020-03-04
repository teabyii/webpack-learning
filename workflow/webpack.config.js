const path = require('path');
const merge = require('webpack-merge');
const base = require('./config/webpack.base');
const productionConfig = require('./config/webpack.production');
const developmentConfig = require('./config/webpack.development');
const testConfig = require('./config/webpack.test');

module.exports = (env) => {
  let target = developmentConfig;
  if (env.production) target = productionConfig;
  if (env.test) target = testConfig;

  let service = 'http://localhost:8080';

  if (env.proxy === 'test') {
    // ...
    console.log('应用 test 的服务地址')
  }

  if (env.proxy === 'production') {
    // ...
    console.log('应用 production 的服务地址')
  }

  const devServer = {
    contentBase: path.resolve(__dirname, 'dist'), // 开发服务器启动路径

    proxy: {
      '/api': {
        target: service,
        pathRewrite: { '^/api': '' },
      },
    }
  };

  return merge.smartStrategy({
    entry: 'prepend',
    'module.rules': 'prepend'
  })(
    { mode: target === developmentConfig ? 'development' : 'production', devServer },
    base,
    target
  );
};
