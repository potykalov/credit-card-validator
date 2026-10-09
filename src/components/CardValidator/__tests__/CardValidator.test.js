import CardValidator from "../CardValidator.js";

describe("CardValidator.validateBadgesStatus", () => {
  test("should return Visa is true", () => {
    const container = document.querySelector(".container");

    const cardValidator = new CardValidator(container);
    cardValidator.field.value = "42342342323423";

    console.log(cardValidator.validateBadgesStatus());
  });
});
