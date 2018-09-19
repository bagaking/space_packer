const Ccarr = require('../src/encoding/ccarr')
const khspace = require('../src/khspace')
const assert  = require('assert')
const should = require('should')

describe('kh_space', function(){
    let s = new khspace(20,21,22, new Ccarr())
    describe('initial', function(){
        it('size', function() {
            s.size.width.should.equal(20)
            s.size.height.should.equal(21)
            s.size.depth.should.equal(22)
        })
    })
})