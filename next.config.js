const withCSS = require("@zeit/next-css")
const withImages = require("next-optimized-images")

module.exports = withImages(
  withCSS({
    webpack(config, options) {
      config.module.rules.push({
        test: /\.worker\.js$/,
        loader: "worker-loader",
        options: {
          name: "static/[hash].worker.js",
          publicPath: "/_next/",
        },
      })
      // Overcome webpack referencing `window` in chunks
      config.output.globalObject = `(typeof self !== 'undefined' ? self : this)`

      return config
    },
  }),
)
