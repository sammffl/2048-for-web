/**
 * Created by SamMFFL on 2017/10/11.
 */
import merge from 'webpack-merge';
import common from './webpack.common';
import webpack from 'webpack';
import path from 'path';

const rootPath = path.resolve(__dirname, '../');

export default merge(common, {
    entry:{
        app:path.join(rootPath, './src/index.js'),
    },
    output: {
        filename: "[name].bundle.js",
        path: path.join(rootPath, '/dist/'),
        publicPath: "/",
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        compress: true,
        port: 9000,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            },
        }),
    ]
})