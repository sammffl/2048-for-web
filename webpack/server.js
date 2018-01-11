/**
 * Created by SamMFFL on 2017/10/11.
 */
import express from 'express';
import webpack from 'webpack';
import webPackDevMiddleware from 'webpack-dev-middleware';
import c from 'child_process';
import ip from 'ip';
import config from './webpack.dev.babel';
import colors from 'colors';

const app = express();
const compiler = webpack(config);

app.use(webPackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
}));

app.listen(3000, function () {
    console.log('app listening on port 3000!\n');
    const link = 'http://' + ip.address() + ':3000';
    c.exec('open ' + link);
    console.info('==> 🌎 Listening on  ' + (ip.address() + ':3000').blue);
});
