const path = require('path')
const _ = require('lodash')
const webpack = require('webpack')
const dotenvFlow = require('dotenv-flow')
const dotenvExpand = require('dotenv-expand')

const env = dotenvFlow.config({ default_node_env: 'development' })
dotenvExpand(env)

module.exports = {
  target: 'electron-main',
  entry: path.resolve(__dirname, './src/main/index.js'),
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: [
          path.resolve(__dirname,'./src'),
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  electron: process.env.npm_package_devDependencies_electron
                },
                useBuiltIns: 'entry',
                corejs: 3
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(_.keys(env.parsed).concat(['NODE_ENV']))
  ]
}
