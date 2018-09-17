const CodeMapper = require('../../src/encoding/codeMapper')
const assert  = require('assert');
const should = require('should');

let cm = null

describe('lib/encoding/CodeMapper', function(){
    beforeEach(async () => {
        cm = new CodeMapper(null)
    })

    it('encode', function(){
        cm.encode(1).should.equal('A')
    })

    it('encode', function(){
        cm.decode('A').should.equal(1)
    })
})

