const path = require('path');

const rootPath = path.resolve('');

module.exports = {
  context: rootPath,
  entry: {
    index: './src/index/main.css',
    room: './src/room/main.css',
  },
  output: {
    path: `${rootPath}/public`,
    filename: '[name].bundle.css',
  },
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
  }
};
