const path = require('path');

module.exports = {
    entry: {
        spaceout : './src/space.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
};