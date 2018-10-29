const Vector3 = require('./vector3')

class V3D extends Vector3 {

    get strict() {
        this._x = this._x | 0
        this._y = this._y | 0
        this._z = this._z | 0
        return this
    }

    get x(){
        return this._x | 0
    }

    get y(){
        return this._y | 0
    }

    get z(){
        return this._z | 0
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