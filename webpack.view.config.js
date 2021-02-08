const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = { 
  mode: process.env.NODE_ENV || 'development',
  entry: path.resolve(__dirname, './src/view/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    // publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'entry',
                corejs: 3
              }
            ]
          ]
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    alias: {
      'vue': '@vue/runtime-dom',
      '@': path.resolve(__dirname, './src/view')
    },
    extensions: [ '.js', '.vue' ]
  },
  externals: {
    'electron': 'commonjs2 electron'
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/view/template.html'),
      favicon: './src/view/assets/images/logo.ico',
      filename: 'index.html'
    })
  ],
  devServer: {
    port: 8080
  }
}
