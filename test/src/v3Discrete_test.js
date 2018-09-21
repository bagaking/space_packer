const V3Discrete = require('../../src/dataStructure/v3Discrete').V3Discrete
const Vector3 = require('../../src/dataStructure/Vector3')
const should = require('should');

let v3 = null

describe('lib/dataStructure/v3Discrete', function () {
    beforeEach(async () => {
        v3 = new V3Discrete(20, 21.5, 22)
    })

    it('create', function () {
        v3.x.should.equal(20)
        v3.y.should.equal(21)
        v3.z.should.equal(22)
    })

    it('scl', function () {
        let nV3 = v3.scl(1.5)
        v3.x.should.equal(20)
        v3.y.should.equal(21)
        v3.z.should.equal(22)
        nV3.x.should.equal(30)
        nV3.y.should.equal(31)
        nV3.z.should.equal(33)
    })

    it('add', function () {
        let nV3 = v3.add(V3Discrete.prefab.one)
        v3.x.should.equal(20)
        v3.y.should.equal(21)
        v3.z.should.equal(22)
        nV3.x.should.equal(21)
        nV3.y.should.equal(22)
        nV3.z.should.equal(23)
        let v3_1_5 = Vector3.prefab.one.scl(1.5)
        v3_1_5.x.should.equal(1.5)
        v3_1_5.y.should.equal(1.5)
        v3_1_5.z.should.equal(1.5)
        let nV32 = v3.add(v3_1_5)
        nV32.x.should.equal(21)
        nV32.y.should.equal(22)
        nV32.z.should.equal(23)
    })

})

