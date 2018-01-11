/**
 * Created by SamMFFL on 2017/10/11.
 */
import merge from 'webpack-merge';
import webpack from 'webpack';
import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import common, {publicPath} from './webpack.common';
const rootPath = path.resolve(__dirname, '../');


export default merge(common, {
    entry: {
        app: path.join(rootPath, './src/index.js'),
    },
    output: {
        filename: "[name].js?[hash:4]",
        chunkFilename: 'chunk.[id].[hash:4].js',
        path: path.join(rootPath, '/dist/'),
        publicPath: publicPath[process.env.NODE_ENV]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            cache: false,
            compressor: {
                warnings: false,
                screw_ie8: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ]
})