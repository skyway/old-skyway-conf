const path = require('path');

const rootPath = path.resolve('');

const config = {
  mode: 'development',
  devtool: false,
  context: rootPath,
  entry: {
    index: './src/index/main.tsx',
    // conf: './src/conf/main.tsx',
  },
  output: {
    path: `${rootPath}/docs`,
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.json', '.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: ['babel-loader'],
      },
    ],
  },
  devServer: {
    contentBase: `${rootPath}/docs`,
    watchContentBase: true,
    host: '0.0.0.0',
    port: 9000,
    inline: false,
  },
};

module.exports = config;
