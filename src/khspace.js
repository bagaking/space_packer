const V3Discrete = require('./dataStructure/v3Discrete').V3Discrete
const V3SizeDiscrete = require('./dataStructure/v3Discrete').V3SizeDiscrete
const CubeArea = require('./dataStructure/cubeArea')

class khspace {

    constructor(width, height, depth, encoder) {
        this._encoder = encoder
        this.reset(width, height, depth)
    }

    reset(width, height, depth) {
        this.cube = new CubeArea(V3Discrete.prefab.zero, new V3SizeDiscrete(width, height, depth))
        this._values = Array.apply(null, Array(this.cube.size.total))
        this.clear();
    }

    get size() {
        return this.cube.size
    }

    get existed() {
        return this._existed
    }

    get count() {
        return this._values.length
    }

    clear() {
        this._existed
        this._values = this._values.map(Number.prototype.valueOf, 0)
    }

    set(ind, v) {
        if (this._values[ind] == 0 && v != 0) this._existed += 1;
        else if (this._values[ind] != 0 && v == 0) this._existed -= 1;
        this._values[ind] = v;
        return this
    }

    get(ind) {
        return this._values[ind];
    }

    serialize() {
        return this._encoder.serialize(this.size.string(), data);
    }

    deserialize(data) {
        let args = data.split(",");
        let content = args[3]
        let self = this
        this.reset(args[0], args[1], args[2]);
        return this._encoder.deserialize(content, (ind, val) => self.set(ind, val))
    }


}

module.exports = khspace