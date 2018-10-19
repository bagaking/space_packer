const {
    space,
    parse,
    from_general_data,
    to_general_data,
    code_to_img
} = require('./src/space')

module.exports = {
    space,
    parse,
    from_general_data,
    to_general_data,
    code_to_img,
    khspace: require("./src/khspace"),
    Bpp: require("./src/bpp")
};