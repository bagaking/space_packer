const Vector3 = require('./vector3')

class V3D extends Vector3 {

    get strict() {
        this[0] = this[0] | 0
        this[1] = this[1] | 0
        this[2] = this[2] | 0
        return this
    }

    get x(){
        return this[0] | 0
    }

    get y(){
        return this[1] | 0
    }

    get z(){
        return this[2] | 0
    }

    constructor(x, y, z) {
        super(x, y, z)
        this.strict
    }

    toString(compress = false) {
        return super.toString(compress)
    }

    inspect() {
        return "v3d:" + this.toString()
    }

    /**
     * forEach From To
     * @param fnEach - fn (i,j,k)=> void
     * @param {V3D} from - start position
     * @param {V3D} to - end position
     */
    static forEachFromTo(fnEach, from, to) {
        let min = { x: Math.min(from.x, to.x), y: Math.min(from.y, to.y), z: Math.min(from.z, to.z)};
        let max = { x: Math.max(from.x, to.x), y: Math.max(from.y, to.y), z: Math.max(from.z, to.z)};

        for (let i = min.x; i <= max.x; i++) {
            for (let j = min.y; j <= max.y; j++) {
                for (let k = min.z; k <= max.z; k++) {
                    fnEach(i, j, k);
                }
            }
        }
    }
}

module.exports = V3D