const path = require("path");
const glob = require("glob");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry: glob.sync("./src/**/*.ts").reduce((acc, filePath) => {
        const entry = filePath.replace("/index.ts", "");
        acc[entry] = path.join(__dirname, ".", filePath);
        console.log(acc);
        return acc;
    }, {}),
    output: {
        path: path.resolve(__dirname, "./lib"),
        // filename: "index.js",
        libraryTarget: "commonjs",
        globalObject: "this",
        library: "plugin-sdk",
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    model: {
        rules: [

        ]
    },
    externals: {
    },
}
