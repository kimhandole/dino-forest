module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: __dirname
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ],
    }
};