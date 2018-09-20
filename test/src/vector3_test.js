const Vector3 = require('../../src/dataStructure/vector3')
const assert  = require('assert');
const should = require('should');

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
        c._x += 1
        assert.equal(c.x, 21)
        assert.equal(v3.x, 20)
        c.y += 1
        assert.equal(c.y, 21)
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

    it('scl', function(){
        let add1 = v3.scl(2)
        assert.equal(add1.x, 40)
        assert.equal(add1.y, 42)
        assert.equal(add1.z, 44)
        assert.equal(v3.x, 20)
        assert.equal(v3.y, 21)
        assert.equal(v3.z, 22)
        let add2 = v3.scl(2, true)
        assert.equal(add2.x, 40)
        assert.equal(add2.y, 42)
        assert.equal(add2.z, 44)
        assert.equal(v3, add2)
    })

    it('string', function(){
        let str = v3.string()
        assert.equal(str, "20,21,22")
    })

    it('string compressed', function(){
        v3.string(true).should.equal("20,21,22")
        v3._x = 0
        v3.string(true).should.equal(",21,22")
        v3._z = 0
        v3.string(true).should.equal(",21,")
        v3._y = 0
        v3.string(true).should.equal(",,")
    })

    it('default value', function(){

        Vector3.prefab.zero.x.should.equal(0)
        Vector3.prefab.zero.y.should.equal(0)
        Vector3.prefab.zero.z.should.equal(0)

        Vector3.prefab.one.x.should.equal(1)
        Vector3.prefab.one.y.should.equal(1)
        Vector3.prefab.one.z.should.equal(1)

        Vector3.prefab.left.x.should.equal(-1)
        Vector3.prefab.left.y.should.equal(0)
        Vector3.prefab.left.z.should.equal(0)

        Vector3.prefab.right.x.should.equal(1)
        Vector3.prefab.right.y.should.equal(0)
        Vector3.prefab.right.z.should.equal(0)

        Vector3.prefab.down.x.should.equal(0)
        Vector3.prefab.down.y.should.equal(-1)
        Vector3.prefab.down.z.should.equal(0)

        Vector3.prefab.up.x.should.equal(0)
        Vector3.prefab.up.y.should.equal(1)
        Vector3.prefab.up.z.should.equal(0)

        Vector3.prefab.back.x.should.equal(0)
        Vector3.prefab.back.y.should.equal(0)
        Vector3.prefab.back.z.should.equal(-1)

        Vector3.prefab.forward.x.should.equal(0)
        Vector3.prefab.forward.y.should.equal(0)
        Vector3.prefab.forward.z.should.equal(1)
    })


})

