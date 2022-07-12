import { it, expect, describe, beforeEach } from "vitest";

import retrieveDataItems from "./retrieveItemData";

import { itemObj } from "./itemTestData.js";

describe("retrieveDataItems()", () => {
  let item
//   console.log("item, itemObj", 'item', itemObj)
 beforeEach(()=> {
   item = itemObj
 })

it("should return the data fields needed for the application from the original data obj", () => {
 
  //const item = itemObj
  const item1 = retrieveDataItems(item.data);
  
  expect(item1.barcode).toEqual(item.data.item_data.barcode);
  expect(item1.title).toEqual(item.data.bib_data.title);
  expect(item1.mms_id).toEqual(item.data.bib_data.mms_id);
  expect(item1.holdingID).toEqual(item.data.holding_data.holding_id);
  expect(item1.itemID).toEqual(item.data.item_data.pid);
  expect(item1.status).toEqual(item.data.item_data.base_status.desc);
  expect(item1.callNum).toEqual(item.data.holding_data.call_number);
  expect(item1.permLib).toEqual(item.data.item_data.library.desc);
  expect(item1.permLoc).toEqual(item.data.item_data.location.desc);
  expect(item1.inventoryDate).toEqual(item.data.item_data.inventory_date || "None");
  expect(item1.internalNote3).toEqual(item.data.item_data.internal_note_3);
  expect(item1.replacementCost).toEqual(item.data.item_data.replacement_cost);
  expect(item1.provenance).toEqual(item.data.item_data.provenance);
  expect(item1.condition).toEqual(item.data.item_data.physical_condition);
  expect(false).toBe(item.data.holding_data.in_temp_location);
});

  it("should return '----' when an item if found and not in a temp location", () => {
    //const item = itemObj
    const item1 = retrieveDataItems(item.data);
    expect(item1.tempLib).toBe("-----");
  });


  it("should return the temp library when an item if found and in a temp location", () => {
    //const item = itemObj
    item.data.holding_data.in_temp_location = true;
    item.data.holding_data.temp_library = { desc: "Main" };
    item.data.holding_data.temp_location = { desc: "Display" };

    const item1 = retrieveDataItems(item.data);
    expect(item1.tempLib).toBe("Main");
  });

  it("should return the temp location when an item if found and in a temp location", () => {
    //const item = itemObj
    item.data.holding_data.in_temp_location = true;
    item.data.holding_data.temp_library = { desc: "Main" };
    item.data.holding_data.temp_location = { desc: "Display" };

    const item1 = retrieveDataItems(item.data);
    expect(item1.tempLoc).toBe("Display");
  });

 

  it("should return should return an eror if a barcode is not found", () => {
    //let errorMessage

   // const item = itemObj
    //console.log("item", item)
    delete item.data.item_data.barcode
    //console.log("item", item)
    // const func = () => { 
    //    retrieveDataItems(item.data)
    // };

      
    const item1 = retrieveDataItems(item.data);
    console.log('item post transform -----------------------------', item1)
    //expect(func).toThrowError()
    expect(item.data.item_data.barcode).toEqual(undefined)
  });

});
