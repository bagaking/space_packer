"using strict"

class V3Prefab {

    constructor(factor = 1, constructor = null) {
        this._factor = factor
        this._type = constructor
    }

    get zero() {
        return this._zero || (this._zero = new this._type(0, 0, 0))
    }

    get one() {
        return new this._type(this._factor, this._factor, this._factor)
    }

    get minusOne() {
        return new this._type(-this._factor, -this._factor, -this._factor)
    }

    get left() {
        return new this._type(-this._factor, 0, 0)
    }

    get right() {
        return new this._type(this._factor, 0, 0)
    }

    get down() {
        return new this._type(0, -this._factor, 0)
    }

    get up() {
        return new this._type(0, this._factor, 0)
    }

    get back() {
        return new this._type(0, 0, -this._factor)
    }

    get forward() {
        return new this._type(0, 0, this._factor)
    }
}

let symV3Prefab = Symbol("symV3Prefab")
let _g = global
if(_g === undefined || _g === null) _g = window
if(_g === undefined || _g === null) _g = {}
_g[symV3Prefab] = {}

/**
 * Vector3
 */
class Vector3 {

    static get prefab() {
        let pref = _g[symV3Prefab][Symbol.for(this)]
        if(pref === undefined || pref === null){
            pref = _g[symV3Prefab][Symbol.for(this)] = new V3Prefab(1, this)
        }
        return pref
    }

    constructor(x, y, z) {
        /**@type {number} */
        this[0] = x
        /**@type {number} */
        this[1] = y
        /**@type {number} */
        this[2] = z
        this.self = this.strict
    }

    /**
     * get x
     * @returns {number}
     */
    get x() {
        return this[0]
    }

    /**
     * get y
     * @returns {number}
     */
    get y() {
        return this[1]
    }

    /**
     * get z
     * @returns {number}
     */
    get z() {
        return this[2]
    }

    get strict(){
        return this
    }

    /**
     * get a clone of this vector3
     * @returns {*}
     */
    clone() {
        return new this.constructor(this[0], this[1], this[2])
    }

    /**
     * scale with a factor
     * @param {number} scalar - the factor to multiply
     * @param {boolean} inPlace - is it a mutable operation
     * @returns {Vector3} result - in inPlace or new vector3
     */
    scl(scalar, inPlace = false) {
        let ret = inPlace ? this : this.clone()
        ret[0] *= scalar
        ret[1] *= scalar
        ret[2] *= scalar
        return ret.strict
    }

    /**
     * inverse the vector3
     * @param {boolean} inPlace - is it a mutable operation
     * @returns {Vector3} result - in inPlace or new vector3
     */
    inverse(inPlace = false) {
        return this.scl(-1, inPlace)
    }

    /**
     * add a vector3
     * @param {Vector3 | Array} v3 - another vector3
     * @param {boolean} inPlace - is it a mutable operation
     * @returns {Vector3} result - in inPlace or new vector3
     */
    add(v3, inPlace = false) {
        let ret = inPlace ? this : this.clone()
        ret[0] += v3[0]
        ret[1] += v3[1]
        ret[2] += v3[2]
        return ret.strict
    }

    /**
     * sub a vector3
     * @param {Vector3} v3 - another vector3
     * @param {boolean} inPlace - is it a mutable operation
     * @returns {Vector3} result - in inPlace or new vector3
     */
    sub(v3, inPlace = false) {
        let ret = inPlace ? this : this.clone()
        ret[0] -= v3[0]
        ret[1] -= v3[1]
        ret[2] -= v3[2]
        return ret.strict
    }

    /**
     * multiply (正片叠底)
     * @param {Vector3} v3
     * @param {boolean} inPlace - is it a mutable operation
     * @returns {Vector3} result - in inPlace or new vector3
     */
    mul(v3, inPlace = false) {
        let ret = inPlace ? this : this.clone()
        ret[0] *= v3[0]
        ret[1] *= v3[1]
        ret[2] *= v3[2]
        return ret.strict
    }

    /**
     * lerp to
     * @param {Vector3} v3
     * @param {number} factor - form: 0, to: 1
     * @param {boolean} inPlace - is it a mutable operation
     * @returns {Vector3} result - in inPlace or new vector3
     */
    lerp(v3, factor = 0.5, inPlace = false) {
        return this.scl(1 - factor, inPlace).add(v3.scl(factor), true);
    }

    /**
     * clamp x,y,z
     * @param {number} min
     * @param {number} max
     * @param {boolean} inPlace
     * @returns {Vector3} result - in inPlace or new vector3
     */
    clamp(min, max, inPlace = false) {
        let ret = inPlace ? this : this.clone()
        ret[0] = ret[0] < min ? min : ret[0] > max ? max : ret[0];
        ret[1] = ret[1] < min ? min : ret[1] > max ? max : ret[1];
        ret[2] = ret[2] < min ? min : ret[2] > max ? max : ret[2];
        return ret.strict
    }


    /**
     * dot operation
     * @param {Vector3} v3
     * @returns {number}
     */
    dot(v3) {
        return (
            this[0] * v3[0] +
            this[1] * v3[1] +
            this[2] * v3[2]
        );
    }


    /**
     * get norm
     * @returns {Vector3}
     */
    get norm() {
        const mag = Math.sqrt(this.dot(this));
        return new Vector3(
            this.x / mag,
            this.y / mag,
            this.z / mag
        );
    }

    /**
     * get the vector string
     * @param {boolean} compressed - should be compress ?
     * @returns {string} result - the string
     */
    toString(compress = false) {
        return compress ? `${this.x ? this.x : ''},${this.y ? this.y : ''},${this.z ? this.z : ''}` : `(${this.x},${this.y},${this.z})`
    }

    toArray() {
        return [this.x, this.y, this.z]
    }

    inspect() {
        return "v3:" + this.toString()
    }

    // todo : parse(compressed)
}

module.exports = Vector3

