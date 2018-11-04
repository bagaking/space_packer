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
     * @param {V3D | array} origin
     * @param {V3D | array} pos
     */
    pos2Ind(origin, pos) {
        return this.posB2Ind([
            pos[0] - origin[0],
            pos[1] - origin[1],
            pos[2] - origin[2]
        ]);
    }

    /**
     * box pos to ind
     * @param {V3D | array} pos
     */
    posB2Ind(pos) {
        return pos[1] * this.plat + pos[0] * this.depth + pos[2];
    }

    /**
     * box pos to ind
     * @param {V3D | array} pos
     */
    posBInside(pos) {
        return pos[0] >= 0 && pos[0] < this.width &&
            pos[1] >= 0 && pos[1] < this.height &&
            pos[2] >= 0 && pos[2] < this.depth
    }


    /**
     * convert ind to box pos
     * @param {number} ind
     * @return {V3D} posB
     */
    ind2PosB(ind) {
        let realInd = ind >= this.total ? this.total - 1 : ind
        return new V3D(
            Math.floor(realInd % this.plat) / this.plat,
            Math.floor(realInd / this.plat),
            ind % this.plat
        )
    }

    /**
     * scroll origin in the box
     * @param {V3D | Array} posB - pos in box
     * @return {V3D} posB
     */
    scroll(posB) {
        return new V3D(
            posB[0] >= 0 ? (posB[0] % this.width) : ((posB[0] % this.width + this.width) % this.width),
            posB[1] >= 0 ? (posB[1] % this.height) : ((posB[1] % this.height + this.height) % this.height),
            posB[2] >= 0 ? (posB[2] % this.depth) : ((posB[2] % this.depth + this.depth) % this.depth),
        )
    }

    /**
     * for each ind in the box
     * @param fnEach
     * @param {V3D | Array}  from - default : V3D.prefab.zero
     * @param {V3D | Array}  to - default : V3D.prefab.minusOne
     */
    forEachPosB(fnEach, from = V3D.prefab.zero, to = V3D.prefab.minusOne) {
        let start = this.scroll(from);
        let end = this.scroll(to);
        V3D.forEachFromTo((i, j, k) => fnEach(this.posB2Ind([i, j, k]), i, j, k), start, end);
    }


    inspect() {
        return "v3size:" + this.toString()
    }

}

module.exports = V3DSize