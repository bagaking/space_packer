let space_packer = require('../src/space_packer.js')
let data = require('../res/data_org.json')

let pos_getter = item => item.position;
let pos_setter = (item, pos) => item.position = pos;
let value_getter = item => item.type.index;
let value_setter = (item, value) => item.type = {index: value};

let filled = space_packer.fill(data, pos_getter, pos_setter, value_getter, value_setter);
console.log(JSON.stringify(filled));
console.log(filled[0].data.length);

let result = space_packer.encode(data, pos_getter, pos_setter, value_getter, value_setter, true);
let decode = space_packer.decode(result, pos_setter, value_setter)

console.log(JSON.stringify(result));
console.log(JSON.stringify(decode));
console.log(JSON.stringify(decode[0].length));