const glob = require('glob');

module.exports = {
    entry: [
        './src/js/main.js',
    ].concat(glob.sync(
        './src/sass/**/*.sass',
    )),
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'css/',
                            name: '[name].min.css',
                        }
                    },
                    'sass-loader'
                ],
            },
        ],
    },
};