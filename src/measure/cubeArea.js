const V3D = require('./v3D')
const V3DSize = require('./v3DSize')

class CubeArea {

    /**
     * Create a cubeArea
     * @param {V3D} v3Origin
     * @param {V3DSize} v3Size
     */
    constructor(v3Origin, v3Size) {
        this._origin = v3Origin
        this._size = v3Size
    }

    /**
     * get size
     * @returns {V3DSize|*}
     */
    get size() {
        return this._size
    }

    /**
     * get origin pos
     * @returns {V3D|*}
     */
    get origin() {
        return this._origin
    }

    /**
     * shrink the pos in the box
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {V3D}
     */
    posInBox(x, y, z) {
        let pMin = this.origin
        let pMax = this.origin.add(this.size).sub(V3D.prefab.one)
        let m = (min, max, v) => Math.min(max, Math.max(min, v))
        return new V3D(
            m(pMin.x, pMax.x, x), m(pMin.y, pMax.y, y), m(pMin.z, pMax.z, z)
        )
    }

    /**
     * absolute position to box position
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @return {V3D}
     */
    posA2B(x,y,z){
        return new V3D(x - this.origin.x, y - this.origin.y, z - this.origin.z);
    }

    /**
     * box position to absolute position
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @return {V3D}
     */
    posB2A(x,y,z){
        return new V3D(x + this.origin.x, y + this.origin.y, z + this.origin.z);
    }


    /**
     * convert absolute pos to index = y * width * depth + x * depth + z
     * @param {V3DSize} pos
     * @returns {number} uint
     */
    posA2Ind(pos) {
        return this.size.pos2Ind(this.origin, pos);
    }

    /**
     * convert index to absolute pos
     * @param ind
     * @returns {V3DSize}
     */
    ind2PosA(ind) {
        return this.size.ind2Pos(this.origin, ind)
    }

    /**
     * convert box pos to index = y * width * depth + x * depth + z
     * @param {V3DSize} pos
     * @returns {number} uint
     */
    posB2Ind(pos) {
        return this.size.pos2Ind(V3D.prefab.zero, pos);
    }

    /**
     * convert index to box pos
     * @param ind
     * @returns {V3DSize}
     */
    ind2PosB(ind) {
        return this.size.ind2Pos(V3D.prefab.zero, ind)
    }




    inspect() {
        return `cube:<origin:${this.origin.toString()} ,size:${this.size.toString()}>`
    }

}

module.exports = CubeArea