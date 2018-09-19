"using strict"

class V3Prefab {

    constructor(factor = 1) {
        this._factor = factor
    }

    get zero() {
        return new Vector3(0, 0, 0)
    }

    get one() {
        return new Vector3(this._factor, this._factor, this._factor)
    }

    get left() {
        return new Vector3(-this._factor, 0, 0)
    }

    get right() {
        return new Vector3(this._factor, 0, 0)
    }

    get down() {
        return new Vector3(0, -this._factor, 0)
    }

    get up() {
        return new Vector3(0, this._factor, 0)
    }

    get back() {
        return new Vector3(0, 0, -this._factor)
    }

    get forward() {
        return new Vector3(0, 0, this._factor)
    }
}

const _v3prefab = new V3Prefab()

/**
 * Vector3
 */
class Vector3 {

    static get prefab() {
        return _v3prefab
    }

    constructor(x, y, z) {
        /**@type {number} */
        this._x = x
        /**@type {number} */
        this._y = y
        /**@type {number} */
        this._z = z
    }

    /**
     * get x
     * @returns {number}
     */
    get x() { return this._x }

    /**
     * get y
     * @returns {number}
     */
    get y() { return this._y }

    /**
     * get z
     * @returns {number}
     */
    get z() { return this._z }

    /**
     * get a clone of this vector3
     * @returns {Vector3}
     */
    clone() {
        return new Vector3(this._x, this._y, this._z)
    }


    /**
     * inverse the vector3
     * @param {boolean} situ - is it a mutable operation
     * @returns {Vector3} result - in situ or new vector3
     */
    inverse(situ = false) {
        let ret = situ ? this : this.clone()
        ret._x = -ret._x
        ret._y = -ret._y
        ret._z = -ret._z
        return ret
    }

    /**
     * add a vector3
     * @param {Vector3} v3 - another vector3
     * @param {boolean} situ - is it a mutable operation
     * @returns {Vector3} result - in situ or new vector3
     */
    add(v3, situ = false) {
        let ret = situ ? this : this.clone()
        ret._x += v3._x
        ret._y += v3._y
        ret._z += v3._z
        return ret
    }

    /**
     * sub a vector3
     * @param {Vector3} v3 - another vector3
     * @param {boolean} situ - is it a mutable operation
     * @returns {Vector3} result - in situ or new vector3
     */
    sub(v3, situ = false) {
        let ret = situ ? this : this.clone()
        ret._x -= v3._x
        ret._y -= v3._y
        ret._z -= v3._z
        return ret
    }

    /**
     * times a factor
     * @param {number} factor - the factor to multiply
     * @param {boolean} situ - is it a mutable operation
     * @returns {Vector3} result - in situ or new vector3
     */
    mul(factor, situ = false) {
        let ret = situ ? this : this.clone()
        ret._x *= factor
        ret._y *= factor
        ret._z *= factor
        return ret
    }

    /**
     * get the vector string
     * @param {boolean} compressed - should be compress ?
     * @returns {string} result - the string
     */
    string(compressed = false) {
        if (compressed) {
            return `${this._x === 0 ? '' : this._x},${this._y === 0 ? '' : this._y},${this._z === 0 ? '' : this._z}`
        } else {
            return `${this._x},${this._y},${this._z}`
        }
    }

    toArray(){
        return [this.x, this.y, this.z]
    }

    // todo : parse(compressed)
}

module.exports = Vector3

