"using strict"

const CodeMapper = require('./codeMapper')

class Ccarr {

    constructor() {
        this.cm = new CodeMapper(null)
    }

    serialize(arr, formationHint) {
        let data = ""
        for (let ind = 0; ind < arr.length; ind++) {
            let v = arr[ind];
            let count = 0;
            while (count + 1 && ind + 1 < arr.length && v == arr[ind + 1]) {
                ind++;
                count++;
            }
            data += this.cm.encode(v);
            if (count != 0) data += count;
        }
        data = formationHint + "," + data
        return data;
    }

    deserialize(content, fnSet) {
        let totalSet = 0;
        let indPoses = []
        for (let i = 0; i < content.length; i++) {
            let c = content[i];
            let value = this.cm.decode(c);
            let count = 0;
            for (let k = 1; k + i < content.length;) {
                let next_c = content[i + k]
                if (next_c < '0' || next_c > '9') break;
                count = count * 10 + parseInt(next_c);
                i++;
            }
            for (let k = 0; k <= count; k++) {
                let ind = totalSet + k
                fnSet(ind, value)
                if (value != 0) {
                    indPoses.push(ind)
                }
            }
            totalSet += count + 1;
        }
        return indPoses;
    }
}

module.exports = Ccarr