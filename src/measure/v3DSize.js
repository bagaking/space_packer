const V3D = require('./v3D')

class V3DSize extends V3D {

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
     * @param {V3D} origin
     * @param {V3D} pos
     */
    pos2Ind(origin, pos) {
        let posOffset = pos.sub(origin)
        return posOffset.y * this.plat + posOffset.x * this.depth + posOffset.z;
    }

    /**
     * convert ind to pos
     * @param {V3D} origin
     * @param {number} ind
     */
    ind2Pos(origin, ind) {
        let realInd = ind >= this.total ? this.total - 1 : ind
        return new V3DSize(
            Math.floor(realInd % this.plat) / this.plat,
            Math.floor(realInd / this.plat),
            ind % this.plat
        )
    }

    inspect() {
        return "v3size:" + this.toString()
    }

}

module.exports = V3DSize