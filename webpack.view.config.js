const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = { 
  mode: process.env.NODE_ENV ? 'production' : 'development',
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
  externals: [],
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '.view/assets/src/logo.ico'),
          to: 'logo.ico'
        }
      ]
    })
  ],
  devServer: {
    port: 8080
  }
}
