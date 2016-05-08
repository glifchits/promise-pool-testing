var path = require("path");
module.exports = {
    entry: {
        app: ["./main.js"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/static/",
        filename: "bundle.js",
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                },
            },
        ],
    },
};
