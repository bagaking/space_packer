const Bpp = require("../src/bpp");
const khspace = require("../src/khspace");

const uIpfs = require("../src/utils/ipfsUtil");
const assert  = require('assert');
const should = require('should');


describe("bpp", function () {

    let data = "21,21,21,_3278B_30B_8B_378F5B_11G_30G_8G_21F6B_200D4B_57F5B_78G_12HA14H_3H1A12H1_3HA14H_10G_59F5B_54D4B_78E_19E1_18E2_17E3_16E3_16E4_2C_11E5_1C1_10E5_1C2_4HA8_A5B1_1D2A6GA3GAB3HA13_AB1_6E5_1C2_9E5_1C1_10E4_2C_11E3_16E2_17E_19E_245HA14B_3HA11G3B1_1HA14B_393G3_5E3_5G4_16G3_395G1_6E2_8G1_18G1_405E1_438E_2433";

    describe("#test ccarr", function () {
        it.skip("should assert ccarr", async function () {
            let bpp = new Bpp("ccarr", data);
            let arr = bpp.unpack();
            console.log(arr);
            await bpp.pack();
            should(bpp.data).equal(data);
        })
    });


    describe("#test mref with sub mref hash", function () {
        it("should assert mref serialize", async function () {
            let bpp1 = new Bpp("ccarr", data);
            bpp1.unpack();
            let lst = data.split(",");
            let x = lst[0];
            let y = lst[1];
            let z = lst[2];

            let refs = [];
            refs.push({
                "position": `${x},${y},${z}`,
                "type": "ccarr",
                "data": bpp1.string
            });
            let bpp2 = new Bpp("mref");
            let space1 = new khspace(0, 0, 0, bpp2.encoder, refs);
            await bpp2.pack(space1);

            let ret = {};
            ret[`p_${x},${y},${z}`] = await uIpfs.getIpfsHash(bpp1.string);
            should(JSON.stringify(bpp2.data)).equal(JSON.stringify(ret));
            console.log(bpp2.string);

            refs.push({
                "position": `0,0,0`,
                "type": "mref",
                "data": bpp2.string
            });

            let bpp3 = new Bpp("mref");
            let space2 = new khspace(0, 0, 0, bpp3.encoder, refs);
            await bpp3.pack(space2);

            ret[`p_0,0,0`] = await uIpfs.getIpfsHash(bpp2.string);

            console.log(ret);
            console.log(bpp3.data);

            should(JSON.stringify(bpp3.data)).equal(JSON.stringify(ret));

            console.log(bpp3.string);


        });


        it("should assert mref deserialize", async function () {
            let bpp1 = new Bpp("ccarr", data);
            bpp1.unpack();
            let lst = data.split(",");
            let x = lst[0];
            let y = lst[1];
            let z = lst[2];

            let refs = [];
            refs.push({
                "position": `${x},${y},${z}`,
                "type": "ccarr",
                "data": bpp1.string
            });
            let bpp2 = new Bpp("mref");
            let space1 = new khspace(0, 0, 0, bpp2.encoder, refs);
            await bpp2.pack(space1);

            let ret = {};
            ret[`p_${x},${y},${z}`] = await uIpfs.getIpfsHash(bpp1.string);
            should(JSON.stringify(bpp2.data)).equal(JSON.stringify(ret));
            console.log(bpp2.string);

            refs.push({
                "position": `0,0,0`,
                "type": "mref",
                "data": bpp2.string
            });

            let bpp3 = new Bpp("mref");
            let space2 = new khspace(0, 0, 0, bpp3.encoder, refs);
            await bpp3.pack(space2);

            ret[`p_0,0,0`] = await uIpfs.getIpfsHash(bpp2.string);

            console.log(ret);
            console.log(bpp3.data);

            should(JSON.stringify(bpp3.data)).equal(JSON.stringify(ret));

            console.log(bpp3.string);



            let supply = {
                "QmNfkDqfAGWp96EeTy2xZzCzwnrt2RG3a8vgBjH8WqRCQ1": bpp1,
                "QmZdPQ8nJPFDkRoHQrosZJfVv4s2FE8ZCp9YL8g1BF1hGU": bpp2
            };

            ret = bpp3.unpack(supply);

            console.log(ret);

            let bpp4 = new Bpp("mref");
            await bpp4.pack(bpp3.space);
            console.log("bpp4: ", bpp4);
        })

    });










});