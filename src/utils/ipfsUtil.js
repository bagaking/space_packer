/** @see {@url https://medium.com/swapynetwork/generating-ipfs-multihash-offline-2edb2618b93b} */

const ipfs = require("ipfs-api");
const Unixfs = require('ipfs-unixfs');
const {DAGNode} = require('ipld-dag-pb');

let PromiseFunctionCall = (fn, ...args) => {
    return new Promise((resolve, reject) => {
        let cb = (err, res) => {
            return err ? reject(err) : resolve(res)
        };
        fn(...args, cb);
    })

};


class Ipfs {
    static async getIpfsHash(data) {
        const unixFs = new Unixfs('file', data);
        let dagNode = await PromiseFunctionCall(DAGNode.create, unixFs.marshal());
        return dagNode.toJSON().multihash;

    }

}

module.exports = Ipfs;