const V3D = require('./v3D')
const V3DSize = require('./v3DSize')

class CubeArea extends V3DSize {

    /**
     * Create a cubeArea
     * @param {V3D} v3Origin
     * @param {V3DSize | Array} v3Size
     */
    constructor(v3Origin, size) {
        super(size[0], size[1], size[2]);
        this._origin = v3Origin
        this._size = this
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
     * shrink the absolute pos in the box
     * @param {V3D | array} absolute position
     * @returns {V3D} new absolute pos
     */
    restrictPosA(posA) {
        let posB = this.posA2B(posA);
        return this.restrictPosB(posB);
    }

    /**
     * absolute position to box position
     * @param {V3D | Array} pos
     * @return {V3D}
     */
    posA2B(pos) {
        return new V3D(pos[0] - this.origin.x, pos[1] - this.origin.y, pos[2] - this.origin.z);
    }

    /**
     * box position to absolute position
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @return {V3D}
     */
    posB2A(x, y, z) {
        return new V3D(x + this.origin.x, y + this.origin.y, z + this.origin.z);
    }

    /**
     * convert absolute pos to index = y * width * depth + x * depth + z
     * @param {V3DSize} pos
     * @returns {number} uint
     */
    posA2Ind(pos) {
        return this.size.posB2Ind(pos.sub(this.origin));
    }

    /**
     * convert index to absolute pos
     * @param ind
     * @returns {V3DSize}
     */
    ind2PosA(ind) {
        return this.origin.add(this.size.ind2PosB(ind));
    }


    /**
     * get if the absolute pos inside the cube
     * @param {V3D} posA
     * @return {boolean}
     */
    posAInside(posA) {
        return this.posBInside(pos.sub(this.origin))
    }


    inspect() {
        return `cube:<origin:${this.origin.toString()}, size:${V3DSize.prototype.toString.call(this)}>`
    }

}

module.exports = CubeArea