const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015","react"],
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /(\.css)$/,
                use: [
                    {
                        loader: "style-loader"
                    },{
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },{
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9',
                                    ],
                                })
                            ]
                        }
                    }
                ]
            },{
	            test: /\.scss$/,
	            use: extractSass.extract({
	                use: [{
	                    loader: "css-loader"
	                }, {
	                    loader: "sass-loader"
	                }],
	                // use style-loader in development
	                fallback: "style-loader"
	            })
	        },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'build/media/[name].[hash:8].[ext]',
                },
            },
        ]
    },
    plugins: [
     	extractSass,
        new webpack.BannerPlugin('我的版权我做主！！'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmp1.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css")
    ],

};

