const path = require('path')
const glob = require('glob')
const webpack = require('webpack')

process.env.LANG = process.env.LANG || 'cs'

module.exports = {
    exportPathMap: function () {
        return {
            '/': {page: '/'},
        }
    },
    assetPrefix: `/${process.env.LANG}`,
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

        // config.output.publicPath = `/${process.env.LANG}`

        config.plugins.push(new webpack.DefinePlugin({
            'TRANSLATION_LANG': JSON.stringify(process.env.LANG)
        }))

        return config
    }
}
