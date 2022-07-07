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

  it("should return the price if the price entered if more than 100", () => {
    const price = "451";
    const result = replacementCost(price);

    expect(result).toBe("451");
  });

  it("should return 100 if the price entered if less than 0", () => {
    const price = "-1";
    const result = replacementCost(price);

    expect(result).toBe("100");
  });

  it("should still function properly if a number not a string is entered", () => {
    const price = 45;
    const price2 = 145;
    const result = replacementCost(price);
    const result2 = replacementCost(price2);

    expect(result).toBe("100");
    expect(result2).toBe("145");
  });
});

// will accept a number price
