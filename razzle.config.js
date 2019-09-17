"use strict";
const {TypedCssModulesPlugin} = require("typed-css-modules-webpack-plugin");

function typedCssModules(config, env, webpack, options) {
  config.plugins = [
    ...config.plugins,
    new TypedCssModulesPlugin({
      globPattern: "src/**/*.module.css",
    })
  ];
  return config;
}

module.exports = {
  plugins: ["typescript", typedCssModules],
}
