
const uIpfs = require("../utils/ipfsUtil");


class Mref {


    /**
     *
     * @param refs sample like [{"position": , "type": , "data"}, ...]
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
                if (bpp.method === "ccarr") {
                    data[`p_${ref.position}`] = await uIpfs.getIpfsHash(bpp.string);
                }
                else if (bpp.method === "mref") {
                    for (let key of Object.keys(bpp.data)) {
                        let subBpp = bpp.data[key];
                        try {
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