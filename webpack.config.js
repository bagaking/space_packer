const path = require('path');

module.exports = {
    entry: {
        space_packer : './src/space.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
};