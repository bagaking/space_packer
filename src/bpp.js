"using strict"


const khspace = require("./khspace");
const Ccarr = require("./encoding/ccarr");
const Mref = require("./encoding/mref");

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
    ccarr : new Ccarr(),
    cshard : null,
    mref : new Mref()
}


class Bpp {

    static get METHODS() {
        return _methods
    }

    constructor(method, data) {
        this.version = "1.0"
        this.method = method
        this.data = data
        this._space = null
    }

    get encoder() {
        return _encoders[this.method]
    }

    get space() {
        return this._space;
    }

    get string() {
        return JSON.stringify({
            version: this.version,
            method: this.method,
            data: this.data
        })
    }

    async pack(sp) {
        this._space = sp || this._space;
        this.data = await this._space.serialize();
        return this
    }

    unpack(supply) {
        if (this.method === "ccarr") {
            this._space = new khspace(0, 0, 0, this.encoder, null);
            return this._space.deserialize(this.data);
        }
        else {
            this._space = new khspace(0, 0, 0, this.encoder, []);
            return this._space.deserialize(this.data, supply);
        }

    }





}

module.exports = Bpp