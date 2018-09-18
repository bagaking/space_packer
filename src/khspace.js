
let Vector3 = require('./dataStructure/vector3')
let V3Discrete = require('./dataStructure/v3Discrete').V3Discrete
let V3SizeDiscrete = require('./dataStructure/v3Discrete').V3SizeDiscrete
let CubeArea = require('./dataStructure/cubeArea')
let CodeMapper = require('./encoding/codeMapper')

class khspace {

    constructor(width, height, depth) {
        this.cube = new CubeArea(V3Discrete.fromV3(Vector3.prefab.one), new V3SizeDiscrete(width, height, depth))
    }

    get algorithm() {
        return "kh_masked"
    }

    get size() {
        return this.cube.size
    }
    get width() {
        return this.size.width
    }
    get height() {
        return this.size.height
    }
    get depth() {
        return this.size.depth
    }

    get plat_total() {
        return this.size.plat
    }
    get total() {
        return this.size.total
    }
    get str_size() {
        return `${this.width},${this.height},${this.depth}`
    }


    get existed() {
        return this._existed
    }
}