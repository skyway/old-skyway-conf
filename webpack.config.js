const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const rootPath = path.resolve('');
const nodeEnv = process.env.NODE_ENV || 'development';

const config = {
  context: rootPath,
  entry: {
    index: './src/index/main.jsx',
    conf: './src/conf/main.jsx',
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react'],
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
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
  ],
  devServer: {
    contentBase: `${rootPath}/docs`,
    watchContentBase: true,
    host: '0.0.0.0',
    port: 9000,
  },
};

if (nodeEnv === 'production') {
  config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;
