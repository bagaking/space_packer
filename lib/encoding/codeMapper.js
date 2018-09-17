const _65code = [
    '_', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'x', 'y', 'z', '~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '+', '/',
];

function createDecodeMap(codeMap) {
    let decodeMap = {}
    for (let i = 0; i < codeMap.length; i++) {
        decodeMap[codeMap[i]] = i;
    }
    return decodeMap
}

class CodeMapper {

    static get defaultCodeArray() {
        return _65code
    }

    /**
     * Create a code mapper
     * @param {Array} codeArray - array of code(char). get CodeMapper.defaultCodeArray if input is null
     */
    constructor(codeArray) {
        if(codeArray !== null && codeArray instanceof Array) {
            this._codeArray = codeArray
        } else {
            this._codeArray = CodeMapper.defaultCodeArray
        }
        this._decodeArray = createDecodeMap(this._codeArray)
    }

    get length() {
        return this._codeArray.length()
    }

    /**
     * encode a unsigned int number to code
     * @param {number} value - the unsigned int number, which is short than this.length
     * @returns {string} char
     */
    encode(value) {
        return this._codeArray[value]
    }

    /**
     * decode a char to unsigned int number
     * @param {string} letter - the char
     * @returns {number} int
     */
    decode(letter) {
        return this._decodeArray[letter]
    }

}

module.exports = CodeMapper


