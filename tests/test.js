let space_packer = require('../src/space_packer.js')
let assert  = require('assert');
let fs = require('fs');
let data = require('../res/data_org.json')

let base64code = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
  'Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
  'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v',
  'w','x','y','z','~','`','!','@','#','$','%','^','&','*','+','/',
];
let base64decode = {}
for(let i = 0; i < base64code.length; i ++){
  base64decode[base64code[i]] = i;
}
 
describe('space_packer', function(){
    let pos_getter = item => item.position;
    let pos_setter = (item, pos) => item.position = pos;
    let value_getter = item => item.type.index;
    let value_setter = (item, value) => item.type = {index: value};
    let fill = space_packer.fill(data, pos_getter, pos_setter, value_getter, value_setter)
    let result = space_packer.encode(data, pos_getter, pos_setter, value_getter, value_setter, true)
    let decode = space_packer.decode(result, pos_setter, value_setter)
	describe('basic methods', function(){ 
		it('encode verify', function() { 
			assert.equal(space_packer.base64code[1], "1");
			assert.equal(space_packer.base64code[10], "A");
		});
		it('decode verify', function() { 
			assert.equal(space_packer.base64decode["B"], 11);
		});
		it('test data verify', function() {
			assert.equal(data.length, 5);
		});
		
	})
	describe('encode', function(){  
		it('mask data mark_length and mark', function() {
			result.forEach(element => {
				let set = space_packer.split_data(element.data)
				assert.equal(element.mask_length, set.mask_length)
				assert.equal(element.mask, set.mask)
			}); 
		});
		it('combined data', function() {
			assert.equal(data.length, 5);
		});
	})
	describe('decode', function(){
		it('position count', function() {
			assert.equal(fill.length, decode.length);
			for(let i = 0; i < decode.length; i ++){
				assert.equal(fill[i].data.length, decode[i].length);
			}
		});

		let odata = space_packer.fill(data, pos_getter, pos_setter, value_getter, value_setter).map(o => o.data);
		it('position position ', function() {
            for(let i = 0; i < data.length; i ++){
                for(let j = 0; j < decode[i].length; j ++) {
                    odata[space_packer.pos_to_ind(decode[i][j].position, decode[i].width, decode[i].height, decode[i].depth, decode[i].minv)] =decode[i][j].value;
                }
			}
		});
		// it('position value', function() {
		// 	for(let i = 0; i < decode.length; i ++){
		// 		for(let j = 0; j < decode[i].length; j ++){
		// 			assert.equal(odata[i][j].value, decode[i][j].value);
		// 		}
		// 	}
		// });


    //     for(let i = 0; i < decode.length; i ++){
    //         for(let j = 0; j < decode[i].length; j ++){
    //             console.log("v " + odata[i][j].position.x + ',' + odata[i][j].position.y+ ',' + odata[i][j].position.z + " o " + decode[i][j].position.x + ',' + decode[i][j].position.y+ ',' + decode[i][j].position.z);
    //             // assert.equal(odata[i][j].position.x, decode[i][j].position.x);
    //             // assert.equal(odata[i][j].position.y, decode[i][j].position.y);
    //             // assert.equal(odata[i][j].position.z, decode[i][j].position.z);
    //         }
    //     }

	})
}); 
