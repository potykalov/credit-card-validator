import CardValidator from "./components/CardValidator/CardValidator.js";

document.addEventListener("DOMContentLoaded", () => {
  const containerEl = document.querySelector(".container");
  const cardValidator = new CardValidator(containerEl);

  cardValidator.bindToDom();
});
