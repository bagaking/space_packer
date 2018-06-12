let space_packer = require('../src/space_packer.js')
let assert  = require('assert');
let fs = require('fs');
 
describe('space_packer', function(){
	describe('#printMsg()', function(){
  	it('should print msg', function(){
      assert.equal(space_packer.printMsg(), "This is a message from the space packer"); 
		})
	})
}); 
