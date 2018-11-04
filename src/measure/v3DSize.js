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
     * @param {V3D} posB - pos in box
     * @return {V3D} posB
     */
    scroll(posB) {
        return new V3DSize(
            posB.x >= 0 ? (posB.x % this.width) : ((posB.x % this.width + this.width) % this.width),
            posB.y >= 0 ? (posB.y % this.height) : ((posB.y % this.height + this.height) % this.height),
            posB.z >= 0 ? (posB.z % this.depth) : ((posB.z % this.depth + this.depth) % this.depth),
        )
    }

    /**
     * for each ind in the box
     * @param fnEach
     */
    forEachPosB(fnEach, from = V3D.prefab.zero, to = V3D.prefab.minusOne) {
        let start = this.scroll(from);
        let end = this.scroll(to);

        for (let i = start.x; i <= end.x; i++) {
            for (let j = start.y; j <= end.y; j++) {
                for (let k = start.z; k <= end.z; k++) {
                    fnEach(this.posB2Ind([i, j, k]), i, j, k);
                }
            }
        }
    }


    inspect() {
        return "v3size:" + this.toString()
    }

}

module.exports = V3DSize