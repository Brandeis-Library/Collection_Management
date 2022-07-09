import { it, expect, describe, beforeEach } from "vitest";

import retrieveDataItems from "./retrieveItemData";

import { item } from "./itemTestData.js";

describe("retrieveDataItems()", () => {
 

  it("should return should return the barcode broken out from the original data obj", () => {
    //console.log("-------------", item);
    const item1 = retrieveDataItems(item.data);
    //console.table(item1);
    // const mmsId = user1.dataObjTotal.bib_data.mms_id;
    // const holdId = user1.dataObjTotal.holding_data.holding_id;
    // const tempLocBool = user1.dataObjTotal.holding_data.in_temp_location;

    expect(item1.barcode).toEqual(item.data.item_data.barcode);
  });

  it("should return all the necessary data when an item if found and not in a temp location", () => {
    const item1 = retrieveDataItems(item.data);
    expect(item1.tempLib).toBe("-----");
  });


  it("should return all the necessary data when an item if found and in a temp location", () => {
    item.data.holding_data.in_temp_location = true;
    item.data.holding_data.temp_library = { desc: "Main" };
    item.data.holding_data.temp_location = { desc: "Display" };

    const item1 = retrieveDataItems(item.data);
    expect(item1.tempLib).toBe("Main");
  });
});
