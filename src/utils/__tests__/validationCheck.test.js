import validationCheck from "../validationCheck.js";

describe("validationCheck", () => {
  test("should return VALID for card Visa", () => {
    const visaNumber = "4204423925613";
    expect(validationCheck(visaNumber)).toBe("VALID");
  });

  test("should return NO VALID for random invalid card number", () => {
    const invalidNumber = "2342342342342342";
    expect(validationCheck(invalidNumber)).toBe("NO VALID");
  });
});
