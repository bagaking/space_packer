
const ipfshash = require("ipfshash");

class Mref {


    /**
     *
     * @param refs sample like [{"position": , "type": , "data"}, ...]
     */
    serialize(refs) {
        let data = {};
        refs.forEach((ref) => {
            if (ref.type === "hash") {
                data[`p_${ref.position}`] = ref.data;
            }
            else {
                let bpp = ref.data;
                if (typeof ref.data === "string") {
                    bpp = JSON.parse(ref.data);
                }
                if (bpp.method === "ccarr") {
                    data[`p_${ref.position}`] = ipfshash.getIpfsHash(ref.data);
                }
                else if (bpp.method === "mref") {
                    data[`p_${ref.position}`] = ipfshash.getIpfsHash(bpp.unpack().serialize());
                }
            }
        });
        return data;
    }


    deserialize(data, supply) {
        let refs = [];
        for (let key of Object.keys(data)) {

            let postion = key.split("_")[1];
            let hash = data[key];

            if (supply.hasOwnProperty(hash)) {
                let obj = {
                    "postion": postion,
                    "type": "hash",
                    "data": hash
                };
                refs.push(obj);
                continue;
            }
            let bpp = supply[hash];
            if (typeof bpp === "string") {
                bpp = JSON.parse(bpp);
            }
            let obj = {
                "postion": postion,
                "type": bpp.method,
                "data": bpp
            };
            refs.push(obj);
        }
        return refs;
    }





}

module.exports = Mref;