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
        this._x = x
        /**@type {number} */
        this._y = y
        /**@type {number} */
        this._z = z
        this.self = this.strict
    }

    /**
     * get x
     * @returns {number}
     */
    get x() {
        return this._x
    }

    /**
     * get y
     * @returns {number}
     */
    get y() {
        return this._y
    }

    /**
     * get z
     * @returns {number}
     */
    get z() {
        return this._z
    }

    get strict(){
        return this
    }

    /**
     * get a clone of this vector3
     * @returns {*}
     */
    clone() {
        return new this.constructor(this._x, this._y, this._z)
    }

    /**
     * scale with a factor
     * @param {number} scalar - the factor to multiply
     * @param {boolean} inPlace - is it a mutable operation
     * @returns {Vector3} result - in inPlace or new vector3
     */
    scl(scalar, inPlace = false) {
        let ret = inPlace ? this : this.clone()
        ret._x *= scalar
        ret._y *= scalar
        ret._z *= scalar
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
     * @param {Vector3} v3 - another vector3
     * @param {boolean} inPlace - is it a mutable operation
     * @returns {Vector3} result - in inPlace or new vector3
     */
    add(v3, inPlace = false) {
        let ret = inPlace ? this : this.clone()
        ret._x += v3._x
        ret._y += v3._y
        ret._z += v3._z
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
        ret._x -= v3._x
        ret._y -= v3._y
        ret._z -= v3._z
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
        ret._x *= v3.x
        ret._y *= v3.y
        ret._z *= v3.z
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
        ret._x = ret._x < min ? min : ret._x > max ? max : ret._x;
        ret._y = ret._y < min ? min : ret._y > max ? max : ret._y;
        ret._z = ret._z < min ? min : ret._z > max ? max : ret._z;
        return ret.strict
    }


    /**
     * dot operation
     * @param {Vector3} v3
     * @returns {number}
     */
    dot(v3) {
        return (
            this.x * v3.x +
            this.y * v3.y +
            this.z * v3.z
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
        return compress ? `${this._x ? this._x : ''},${this._y ? this._y : ''},${this._z ? this._z : ''}` : `(${this._x},${this._y},${this._z})`
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

