const { resolve } = require("path");
const { defineConfig } = require("@vue/cli-service");

const alias = {
  "@": resolve(__dirname, ".", "packages")
};

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: "examples/main.ts",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  configureWebpack: {
    target: "electron-renderer",
    resolve: {
      alias
    }
  },
  css: {
    extract: false
  },
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: "./",
      nodeIntegration: true
    }
  }
});
