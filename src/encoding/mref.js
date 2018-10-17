
const uIpfs = require("../utils/ipfsUtil");


class Mref {


    /**
     *
     * @param refs sample like [{"position": x,y,z, "type": hash/ccarr/mref, "data": hash/bpp}, ...]
     * @returns {Promise<void>} {Object} sample like {p_x,y,z: hash, ...}
     */
    async serialize(refs) {
        let data = {};
        for (let ref of refs) {
            if (ref.type === "hash") {
                data[`p_${ref.position}`] = ref.data;
            }
            else {
                let bpp = ref.data;
                if (typeof bpp === "string") {
                    bpp = JSON.parse(bpp);
                }
                let Bpp = require("../bpp");
                bpp = new Bpp(bpp.method, bpp.data);
                if (bpp.method === "ccarr") { // return ipfs hash for bpp
                    data[`p_${ref.position}`] = await uIpfs.getIpfsHash(bpp.string);
                }
                else if (bpp.method === "mref") {
                    for (let key of Object.keys(bpp.data)) {
                        let subBpp = bpp.data[key];
                        try { // if data sample is {hash: object / json string}, then sub bpp call pack recursively
                            if (typeof subBpp === "string" && JSON.parse(subBpp)) {
                                subBpp = JSON.parse(subBpp);
                            }
                        }
                        catch (e) {
                            continue;
                        }
                        subBpp.unpack();
                        bpp.data[key] = await uIpfs.getIpfsHash(await subBpp.pack().string);
                    }
                    data[`p_${ref.position}`] = await uIpfs.getIpfsHash(bpp.string);
                }
                else {
                    throw new Error("bpp method not support");
                }
            }
        }
        return data;
    }


    /**
     *
     * @param {Object} data mref's data, sample like {
        "p_x,y,x": hash,
        ...
     }
     * @param {Object} supply {hash: bpp} sample like {
        "QmNfkDqfAGWp96EeTy2xZzCzwnrt2RG3a8vgBjH8WqRCQ1": bpp,
        ...
     }
     * @returns {Array} sample like [{position: x,y,z, type: hash/ccarr/mref, data: hash/ bpp object}, ...]
     */
    deserialize(data, supply) {
        let refs = [];

        for (let key of Object.keys(data)) {

            let position = key.split("_")[1];
            let hash = data[key];
            if (typeof supply === "object" && supply.hasOwnProperty(hash)) {
                let bpp = supply[hash];
                if (typeof bpp === "string") {
                    bpp = JSON.parse(bpp);
                }
                let Bpp = require("../bpp");
                bpp = new Bpp(bpp.method, bpp.data);
                let obj = {
                    "position": position,
                    "type": bpp.method,
                    "data": bpp
                };
                refs.push(obj);
            }
            else {
                let obj = {
                    "position": position,
                    "type": "hash",
                    "data": hash
                };
                refs.push(obj);
            }
        }
        return refs;
    }


}

module.exports = Mref;