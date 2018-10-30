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
        return this.posB2Ind(pos.sub(origin));
    }

    /**
     * box pos to ind
     * @param {V3D | array} pos
     */
    posB2Ind(pos) {
        if (pos instanceof Array) {
            return pos[1] * this.plat + pos[0] * this.depth + pos[2];
        } else {
            return pos.y * this.plat + pos.x * this.depth + pos.z;
        }
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

    /**
     * scroll origin in the box
     * @param {V3D} posB - pos in box
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
        console.log(" - ", start, end);
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