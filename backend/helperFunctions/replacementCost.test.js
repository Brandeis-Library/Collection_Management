import { it, expect, describe } from "vitest";

import replacementCost from "./replacementCost.js";

describe("replacementCost()", () => {
  it("should return a price of 100 if no price is entered", () => {
    const result = replacementCost();

    expect(result).toBe("100");
  });

  it("should return 100 if the price entered if less than 100", () => {
    const price = "45";
    const result = replacementCost(price);

    expect(result).toBe("100");
  });
});
