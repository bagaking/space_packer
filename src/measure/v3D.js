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

}

module.exports = V3D