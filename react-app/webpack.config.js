module.exports = {
  entry: './index.js',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 1234,
  },
  externals: {
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom',
  },
};
