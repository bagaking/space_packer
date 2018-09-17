/**
 * Vector3
 */
class Vector3 {

    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    /**
     * get a clone of this vector3
     * @returns {Vector3}
     */
    clone() {
        return new Vector3(this.x, this.y, this.z)
    }


    /**
     * inverse the vector3
     * @param {boolean} situ - is it a mutable operation
     * @returns {Vector3} result - in situ or new vector3
     */
    inverse(situ = false) {
        let ret = situ ? this : this.clone()
        ret.x = -ret.x
        ret.y = -ret.y
        ret.z = -ret.z
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
        ret.x += v3.x
        ret.y += v3.y
        ret.z += v3.z
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
        ret.x -= v3.x
        ret.y -= v3.y
        ret.z -= v3.z
        return ret
    }

    /**
     * multiply a factor
     * @param {number} factor - the factor to multiply
     * @param {boolean} situ - is it a mutable operation
     * @returns {Vector3} result - in situ or new vector3
     */
    mul(factor, situ = false){
        let ret = situ ? this : this.clone()
        ret.x *= factor
        ret.y *= factor
        ret.z *= factor
        return ret
    }

    /**
     * get the vector string
     * @param {boolean} compressed - should be compress ?
     * @returns {string} result - the string
     */
    string(compressed = false){
        if(compressed){
            return `${this.x === 0 ? '' : this.x},${this.y === 0 ? '' : this.y},${this.z === 0 ? '' : this.z}`
        }else{
            return `(${this.x},${this.y},${this.z})`
        }
    }

    // todo : parse(compressed)
}

module.exports = Vector3

