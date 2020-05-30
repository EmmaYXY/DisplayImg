"use strict";
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

module.exports = {
  devtool: "source-map",
  entry: "./src/index.js", //入口文件，就是上步骤的src目录下的index.js文件，
  // cheap-module-eval-source-map is faster for development
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' 
    }
  },
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: "warning",
    host: HOST,
    port: PORT,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
        loader: "url-loader",
        query: {
          limit: 30000,
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  plugins: [
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
  ],
};
