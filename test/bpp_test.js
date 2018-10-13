const Bpp = require("../src/bpp");

const assert  = require('assert');
const should = require('should');


describe("bpp", function () {


    describe("#test ccarr", function () {
        it("should return ", function () {
            let data = "21,21,21,_3278B_30B_8B_378F5B_11G_30G_8G_21F6B_200D4B_57F5B_78G_12HA14H_3H1A12H1_3HA14H_10G_59F5B_54D4B_78E_19E1_18E2_17E3_16E3_16E4_2C_11E5_1C1_10E5_1C2_4HA8_A5B1_1D2A6GA3GAB3HA13_AB1_6E5_1C2_9E5_1C1_10E4_2C_11E3_16E2_17E_19E_245HA14B_3HA11G3B1_1HA14B_393G3_5E3_5G4_16G3_395G1_6E2_8G1_18G1_405E1_438E_2433";
            let bpp = new Bpp("ccarr", data);
            let arr = bpp.unpack();
            console.log(arr);
            should(bpp.pack().data).equal(data);
        })
    })

});