let Vector3 = require('../../lib/dataStructure/vector3')
let assert  = require('assert');

let v3 = null

describe('lib/dataStructure/Vector3', function(){
    beforeEach(async () => {
        v3 = new Vector3(20,21,22)
    })

    it('create', function(){
        assert.equal(v3.x, 20)
        assert.equal(v3.y, 21)
        assert.equal(v3.z, 22)
    })

    it('clone', function(){
        let c = v3.clone()
        assert.equal(c.x, 20)
        assert.equal(c.y, 21)
        assert.equal(c.z, 22)
        c.x += 1
        assert.equal(c.x, 21)
        assert.equal(v3.x, 20)
    })

    it('inverse', function(){
        let inv1 = v3.inverse()
        assert.equal(inv1.x, -20)
        assert.equal(v3.x, 20)
        assert.equal(inv1.y, -21)
        assert.equal(v3.y, 21)
        assert.equal(inv1.z, -22)
        assert.equal(v3.z, 22)
        let inv2 = v3.inverse(true)
        assert.equal(inv2.x, -20)
        assert.equal(inv2.y, -21)
        assert.equal(inv2.z, -22)
        assert.equal(v3, inv2)
    })

    it('add', function(){
        let c = new Vector3(1,1,1)
        let add1 = v3.add(c)
        assert.equal(add1.x, 21)
        assert.equal(v3.x, 20)
        assert.equal(add1.y, 22)
        assert.equal(v3.y, 21)
        assert.equal(add1.z, 23)
        assert.equal(v3.z, 22)
        let add2 = v3.add(c, true)
        assert.equal(add2.x, 21)
        assert.equal(add2.y, 22)
        assert.equal(add2.z, 23)
        assert.equal(v3, add2)
    })

    it('sub', function(){
        let c = new Vector3(-1,-1,-1)
        let add1 = v3.sub(c)
        assert.equal(add1.x, 21)
        assert.equal(v3.x, 20)
        assert.equal(add1.y, 22)
        assert.equal(v3.y, 21)
        assert.equal(add1.z, 23)
        assert.equal(v3.z, 22)
        let add2 = v3.sub(c, true)
        assert.equal(add2.x, 21)
        assert.equal(add2.y, 22)
        assert.equal(add2.z, 23)
        assert.equal(v3, add2)
    })

    it('add', function(){
        let add1 = v3.mul(2)
        assert.equal(add1.x, 40)
        assert.equal(add1.y, 42)
        assert.equal(add1.z, 44)
        assert.equal(v3.x, 20)
        assert.equal(v3.y, 21)
        assert.equal(v3.z, 22)
        let add2 = v3.mul(2, true)
        assert.equal(add2.x, 40)
        assert.equal(add2.y, 42)
        assert.equal(add2.z, 44)
        assert.equal(v3, add2)
    })

    it('string', function(){
        let str = v3.string()
        assert.equal(str, "(20,21,22)")
    })

    it('string compressed', function(){
        assert.equal(v3.string(true), "20,21,22")
        v3.x = 0
        assert.equal(v3.string(true), ",21,22")
        v3.z = 0
        assert.equal(v3.string(true), ",21,")
        v3.y = 0
        assert.equal(v3.string(true), ",,")
    })
})

