const path = require('path');

module.exports = {
    entry: {
        spaceout : './src/space.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'cheap-module-source-map', // inline-source-map eval-source-map cheap-module-source-map
};