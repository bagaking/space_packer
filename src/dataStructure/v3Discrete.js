const Vector3 = require('./vector3')


class V3Discrete extends Vector3 {

    constructor(x, y, z) {
        super(Math.floor(x), Math.floor(y), Math.floor(z))
    }

}

class V3SizeDiscrete extends V3Discrete {

    /**
     * convert from vector3
     * @param {Vector3} v3
     */
    static fromV3(v3){
        return new V3Discrete(v3.x, v3.y, v3.z)
    }

    constructor(x, y, z) {
        super(Math.max(0,x), Math.max(0,y), Math.max(0,z))
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
    pos2Ind(origin, pos){
        let posOffset = pos.sub(origin)
        return posOffset.y * this.plat + posOffset.x * this.depth + posOffset.z;
    }

    /**
     * convert ind to pos
     * @param {V3Discrete} origin
     * @param {number} ind
     */
    indToPos(origin, ind){
        let realInd = ind >= this.total ? this.total - 1 : ind
        return V3SizeDiscrete(
            Math.floor(realInd % this.plat) / this.plat,
            Math.floor(realInd / this.plat),
            ind % this.plat
        )
    }
}

module.exports = {
    V3Discrete,
    V3SizeDiscrete
}