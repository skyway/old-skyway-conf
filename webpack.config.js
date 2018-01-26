const webpack = require('webpack');
const path = require('path');

const rootPath = path.resolve('');
const nodeEnv = process.env.NODE_ENV;

const config = {
  context: rootPath,
  entry: {
    app: './src/js/main.js',
  },
  output: {
    path: `${rootPath}/public`,
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
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
  ],
  devServer: {
    contentBase: `${rootPath}/public`,
    watchContentBase: true,
    host: '0.0.0.0',
    port: 9000,
  }
};

if (nodeEnv === 'production') {
  config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
}

module.exports = config;
