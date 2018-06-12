let space = require('../src/space.js')
let data = require('../res/data_org.json')
let assert  = require('assert'); 

describe('space', function(){
    let space20 = space.create(20,21,22)
    describe('initial', function(){
        it('size', function() {
            assert.equal(space20._size._width, 20);
            assert.equal(space20._size._height, 21);
            assert.equal(space20._size._depth, 22);
            assert.equal(space20._size._plat_total, 20*22);
            assert.equal(space20._size._total, 20*21*22);
        });
        it('values', function() {
            assert.equal(space20._values.length, 20*21*22);
        });
        it('existed init', function() {
            assert.equal(space20._info._existed, 0);
        }); 
    });
    describe('set & get', function(){
        it('set', function() {
            space20.set(1,0,3,38)
            assert.equal(space20._values[25], 38);
        });
        it('get', function() {
            assert.equal(space20.get(1,0,3), 38);
        });
    });
    describe('serialize', function(){
        it('serialize', function() {
            assert.equal(space20.serialize(), '20,21,22,_24l_9213');
        });
        it('existed', function() {
            assert.equal(space20._info._existed, 1);
        });
        it('clear', function() {
            space20.clear()
            assert.equal(space20._info._existed, 0);
            assert.equal(space20.serialize(), space20._size._width + ',' + space20._size._height + ',' + space20._size._depth + ',_' + (space20._size._total - 1));
        });
        it('deserialize', function() {
            space20.deserialize('20,21,22,_24l_9213')
            assert.equal(space20.get(1,0,3), 38);
        });
    });
}); 

