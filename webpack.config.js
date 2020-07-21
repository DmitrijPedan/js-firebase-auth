const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');  // require html-webpack-plugin for html template
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // clean old files from output path

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.[chunkhash].js',          // add hash to bundle files
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
}
