import { it, expect, describe } from "vitest";

import { replacementCost } from "./replacementCost";

describe("replacementCost()", () => {
  it("should return a price of 100 if no price is intered"),
    () => {
      const result = replacementCost(price);

      expect(result).toBe(100);
    };
});
