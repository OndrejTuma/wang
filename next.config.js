const path = require('path')
const glob = require('glob')
const webpack = require('webpack')

module.exports = {
    exportPathMap: function () {
        return {
            '/': {page: '/'},
        }
    },
    webpack: (config, {dev}) => {
        config.module.rules.push(
            {
                test: /\.s(a|c)ss$/,
                use: ['babel-loader', 'raw-loader', 'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['styles', 'node_modules']
                                .map((d) => path.join(__dirname, d))
                                .map((g) => glob.sync(g))
                                .reduce((a, c) => a.concat(c), [])
                        }
                    }
                ]
            }
        )

        config.plugins.push(new webpack.DefinePlugin({
            'TRANSLATION_LANG': JSON.stringify(process.env.LANG) || 'cs'
        }))

        return config
    }
}
