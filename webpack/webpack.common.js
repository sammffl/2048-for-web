/**
 * Created by SamMFFL on 2017/10/11.
 */
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const rootPath = path.resolve(__dirname, '../');
const nodeModulesPath = path.resolve(rootPath, "node_modules");
const publicPath = {
    dev: '/',
    test: 'https://i0stg.yztcdn.com/app_js/h5/events/zigong/xxf/',
    production: 'https://i0.yztcdn.com/app_js/h5/events/',
};

export {
    publicPath,
};
export default {
    resolve: {
        alias: {
            "jquery": path.join(nodeModulesPath, "/jquery/dist/jquery.min"),
            "flexible": path.join(nodeModulesPath, "/amfe-flexible/index.min"),
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]?[hash:4]',
                            publicPath: publicPath[process.env.NODE_ENV]
                        },
                    },
                    // {
                    //     loader: 'url-loader',
                    //     options: {
                    //         limit: 8192,
                    //     },
                    // }
                ]
            },
            {test: /\.(woff|woff2|eot|ttf|otf)$/i, use: ['file-loader',]},
            {test: /\.xml$/, use: ['xml-loader'],},
            {test: /\.(csv|tsv)$/, use: ['csv-loader']},
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {loader: 'autoprefixer-loader'},
                        {
                            loader: "sass-loader",
                            // options: {
                            //     data: "$env: red;$width: 100px;$height: 300px; $margin: auto auto;$border:10px solid gray;"
                            // }
                        }]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env',]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['/dist/']),
        new webpack.ProvidePlugin({
            $: "jquery",
            flexible: "flexible"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'My test new feature',
            template: 'html-withimg-loader!./src/index.tpl.html',
            hash: true,
            cache: false,
        }),
        new ExtractTextPlugin('app.css?[hash]'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js?[hash]'
        }),
    ]
};