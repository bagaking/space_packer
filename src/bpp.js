"using strict"

let _methods = {
    cpvec : "cpvec",
    cparr : "cparr",
    ccvec : "ccvec",
    ccarr : "ccarr",
    cshard : "cshard",
    mref : "mref",
}


let _encoders = {
    cpvec : null,
    cparr : null,
    ccvec : null,
    ccarr : "ccarr",
    cshard : null,
    mref : null,
}


class Bpp {

    static get METHODS() {
        return _methods
    }

    constructor(method, data) {
        this.version = "1.0"
        this.method = method
        this.data = data
    }

    get encoder (){
        _encoders[this.method]
    }

    get string() {
        return JSON.stringify(this)
    }
}

module.exports = Bpp