const fs = require('fs/promises');
import { it, expect, describe, beforeEach, vi } from "vitest";
vi.mock('fs');

import retrieve538aString from './string583a';
//import { } from './583aTestDataNone.xml';

describe("retrieve538aString()", () => {

    it("returns ---- when there is no 538a field.", async () => {

        // await fs.readFileSync('./583aTestDataNone.xml', { encoding: 'utf-8' }, (error) => {
        //     if (error) throw error

        // });
        let xmlData;
        console.log(__dirname);
        await fs.readFile(__dirname + '/583aTestDataNone.xml',
            //{ encoding: 'utf16le', flag: 'r' },
            'utf16le',
            async function (err, data) {
                // if (err) {
                //     console.log(err);
                //     return;
                // }


                xmlData = await data;
                console.log("data inside if----------------------", await data);
            });


        console.log("xmldata-------------", xmlData);
        expect(xmlData).toBeTypeOf('string');
    });


    //it("should fail")
});