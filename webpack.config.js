const webpack = require('webpack');
const path = require('path');

const rootPath = path.resolve('');

const config = {
  context: rootPath,
  entry: {
    index: './src/index/main.jsx',
    conf: './src/conf/main.jsx',
    conf_mobile: './src/conf_mobile/main.jsx',
  },
  output: {
    path: `${rootPath}/docs`,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: ['babel-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /react|react-dom|mobx|mobx-react/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [new webpack.DefinePlugin({})],
  devServer: {
    contentBase: `${rootPath}/docs`,
    watchContentBase: true,
    host: '0.0.0.0',
    port: 9000,
    // https://github.com/webpack/webpack-dev-server/issues/1592
    // https: true,
    inline: false,
  },
};

module.exports = config;
