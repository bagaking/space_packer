const V3D = require('./v3D')
const V3DSize = require('./v3DSize')

class CubeArea extends V3DSize{

    /**
     * Create a cubeArea
     * @param {V3D} v3Origin
     * @param {V3DSize | Array} v3Size
     */
    constructor(v3Origin, size) {
        if(size instanceof Array) {
            super(size[0], size[1], size[2]);
        }else{
            super(size.width, size.height, size.depth);
        }
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
     * shrink the pos in the box
     * @param {V3D | array} absolute position
     * @returns {V3D}
     */
    restrictPos(pos) {
        let pMin = this.origin
        let pMax = this.origin.add(this.size).sub(V3D.prefab.one)
        let m = (min, max, v) => Math.min(max, Math.max(min, v))
        if(pos instanceof  Array){
            return new V3D(
                m(pMin.x, pMax.x, pos[0]), m(pMin.y, pMax.y, pos[1]), m(pMin.z, pMax.z, pos[2])
            )
        } else {
            return new V3D(
                m(pMin.x, pMax.x, pos.x), m(pMin.y, pMax.y, pos.y), m(pMin.z, pMax.z, pos.z)
            )
        }
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