const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'popup/generate-cpr': path.resolve(
      __dirname,
      'src',
      'popup',
      'generate-cpr.ts'
    ),
    background: path.resolve(__dirname, 'src', 'background.ts'),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'plugin'),
    filename: '[name].js',
  },
};
