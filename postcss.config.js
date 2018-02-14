const path = require('path');

const rootPath = path.resolve('');

module.exports = {
  context: rootPath,
  entry: {
    index: './src/index/main.css',
    conf: './src/conf/main.css',
  },
  output: {
    path: `${rootPath}/public`,
    filename: '[name].bundle.css',
  },
  plugins: {
    'postcss-easy-import': {},
    'postcss-nested': {},
    'cssnano': {},
  },
};
