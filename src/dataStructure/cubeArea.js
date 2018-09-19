const V3SizeDiscrete = require('./v3Discrete').V3SizeDiscrete
const V3Discrete = require('./v3Discrete').V3SizeDiscrete

class CubeArea {

    /**
     * Create a cubeArea
     * @param {V3Discrete} v3Origin
     * @param {V3SizeDiscrete} v3Size
     */
    constructor(v3Origin, v3Size) {
        this._origin = v3Origin
        this._size = v3Size
    }

    /**
     * get size
     * @returns {V3SizeDiscrete|*}
     */
    get size() {
        return this._size
    }

    /**
     * get origin pos
     * @returns {V3Discrete|*}
     */
    get origin() {
        return this._origin
    }

    /**
     * shrink the pos in the box
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {V3SizeDiscrete}
     */
    posInBox(x, y, z) {
        let pMin = this.origin
        let pMax = this.origin.add(this.size).sub(V3Discrete.prefab.one)
        let m = (min, max, v) => Math.min(max, Math.max(min, v))
        return new V3Discrete(
            m(pMin.x, pMax.x, x), m(pMin.y, pMax.y, y), m(pMin.z, pMax.z, z)
        )
    }

    /**
     * convert pos to index = y * width * depth + x * depth + z
     * @param {V3SizeDiscrete} pos
     * @returns {number} uint
     */
    posToInd(pos) {
        return this.size.pos2Ind(this.origin, pos)
    }

    /**
     * convert index to pos
     * @param ind
     * @returns {V3SizeDiscrete}
     */
    indToPos (ind) {
        return this.size.indToPos(this.origin, ind)
    }

}

module.exports = CubeArea