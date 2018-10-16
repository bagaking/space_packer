const {V3Discrete, V3SizeDiscrete, CubeArea} = require('./measure')


class khspace {

    constructor(width, height, depth, encoder, refs) {
        this._encoder = encoder
        this._refs = refs
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

    async serialize() {
        if (typeof this._refs === "undefined" || this._refs === null) {
            //return this._encoder.serialize(this.size.string(), data); //？
            return this._encoder.serialize(this._values, this.size.string());
        }
        else {
            return (await this._encoder.serialize(this._refs));
        }

    }

    deserialize(data, supply) {
        if (typeof this._refs === "undefined" || this._refs === null) {
            let args = data.split(",");
            let content = args[3]
            let self = this
            this.reset(args[0], args[1], args[2]);
            return this._encoder.deserialize(content, (ind, val) => self.set(ind, val))
        }
        else {
            this._refs = this._encoder.deserialize(data, supply);
            return this._refs;
        }

    }




}

module.exports = khspace