const Vector3 = require('./vector3')

class V3Discrete extends Vector3 {

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

class V3SizeDiscrete extends V3Discrete {

    constructor(x, y, z) {
        super(Math.max(0, x), Math.max(0, y), Math.max(0, z))
    }

    get width() {
        return this.x
    }

    get height() {
        return this.y
    }

    get depth() {
        return this.z
    }

    get plat() {
        return this.width * this.depth;
    }

    get total() {
        return this.plat * this.height;
    }

    /**
     * convert pos to ind
     * @param {V3Discrete} origin
     * @param {V3Discrete} pos
     */
    pos2Ind(origin, pos) {
        let posOffset = pos.sub(origin)
        return posOffset.y * this.plat + posOffset.x * this.depth + posOffset.z;
    }

    /**
     * convert ind to pos
     * @param {V3Discrete} origin
     * @param {number} ind
     */
    indToPos(origin, ind) {
        let realInd = ind >= this.total ? this.total - 1 : ind
        return V3SizeDiscrete(
            Math.floor(realInd % this.plat) / this.plat,
            Math.floor(realInd / this.plat),
            ind % this.plat
        )
    }

    inspect() {
        return "v3size:" + this.toString()
    }

}

module.exports = {
    V3Discrete,
    V3SizeDiscrete
}