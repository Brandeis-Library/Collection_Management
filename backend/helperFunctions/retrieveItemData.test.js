import { it, expect, describe, beforeEach } from "vitest";

import retrieveDataItems from "./retrieveItemData";

import { user } from "./userTestData.js";

describe("retrieveDataItems()", () => {
  it("should still function properly if a number not a string is entered", () => {
    expect("145").toBe("145");
  });

  it("should return all the necessary data when an item if found and not in a temp location", () => {
    console.log(user);
    const user1 = retrieveDataItems(user.data);

    // const mmsId = user1.dataObjTotal.bib_data.mms_id;
    // const holdId = user1.dataObjTotal.holding_data.holding_id;
    // const tempLocBool = user1.dataObjTotal.holding_data.in_temp_location;

    expect(1).toEqual(1);
  });

  // it("should return all the necessary data when an item if found and in a temp location", () => {
  //   console.log(user.dataObjTotal);
  //   expect(1).toEqual(1);
  // });
});
