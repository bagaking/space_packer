const {V3SizeDiscrete, V3Discrete} = require('./v3Discrete')

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
     * absolute position to box position
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @return {V3Discrete}
     */
    posA2B(x,y,z){
        return new V3Discrete(x - this.origin.x, y - this.origin.y, z - this.origin.z);
    }

    /**
     * box position to absolute position
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @return {V3Discrete}
     */
    posB2A(x,y,z){
        return new V3Discrete(x + this.origin.x, y + this.origin.y, z + this.origin.z);
    }


    /**
     * convert absolute pos to index = y * width * depth + x * depth + z
     * @param {V3SizeDiscrete} pos
     * @returns {number} uint
     */
    posA2Ind(pos) {
        return this.size.pos2Ind(this.origin, pos);
    }

    /**
     * convert index to absolute pos
     * @param ind
     * @returns {V3SizeDiscrete}
     */
    ind2PosA(ind) {
        return this.size.indToPos(this.origin, ind)
    }

    /**
     * convert box pos to index = y * width * depth + x * depth + z
     * @param {V3SizeDiscrete} pos
     * @returns {number} uint
     */
    posB2Ind(pos) {
        return this.size.pos2Ind(V3Discrete.prefab.zero, pos);
    }

    /**
     * convert index to box pos
     * @param ind
     * @returns {V3SizeDiscrete}
     */
    ind2PosB(ind) {
        return this.size.indToPos(V3Discrete.prefab.zero, ind)
    }


    inspect() {
        return `cube:<origin:${this.origin.toString()} ,size:${this.size.toString()}>`
    }

}

module.exports = CubeArea