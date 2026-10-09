import validationCheck from "../../utils/validationCheck.js";
import cardValidatorMarkup from "./card-validator.pug";

class CardValidator {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get formSelect() {
    return document.forms["form-validator"];
  }

  static get fieldSelect() {
    return this.formSelect["card-number"];
  }

  bindToDom() {
    this.parentEl.innerHTML = cardValidatorMarkup();

    this.form = CardValidator.formSelect;
    this.field = CardValidator.fieldSelect;
    this.button = this.parentEl.querySelector(".card-validator__form-submit");
    this.visaEl = this.parentEl.querySelector(
      ".card-validator__badges-item[data-id='visa']",
    );
    this.maestroEl = this.parentEl.querySelector(
      ".card-validator__badges-item[data-id='mastercard']",
    );
    this.amexEl = this.parentEl.querySelector(
      ".card-validator__badges-item[data-id='amex']",
    );
    this.discoverEl = this.parentEl.querySelector(
      ".card-validator__badges-item[data-id='discover']",
    );
    this.jcbEl = this.parentEl.querySelector(
      ".card-validator__badges-item[data-id='jcb']",
    );
    this.dinersEl = this.parentEl.querySelector(
      ".card-validator__badges-item[data-id='diners']",
    );
    this.mirEl = this.parentEl.querySelector(
      ".card-validator__badges-item[data-id='mir']",
    );

    this.field.addEventListener("input", this.onInput);
    this.form.addEventListener("submit", this.onSubmit);
  }

  sanitazeField() {
    this.field.value = this.field.value.replace(/\D/g, "");
  }

  checkButtonState() {
    const isDisabled =
      this.field.value.length >= 14 && this.field.value.length <= 19;

    this.button.disabled = !isDisabled;
  }

  validateBadgesStatus() {
    const firstTwoNumbers = this.field.value.slice(0, 2);
    const firstFourNumbers = this.field.value.slice(0, 4);
    const firstSixNumbers = this.field.value.slice(0, 6);

    return {
      isVisa: this.field.value[0] === "4",
      isMaestrocard:
        Number(firstTwoNumbers) >= 51 && Number(firstTwoNumbers) <= 55,
      isAmex: Number(firstTwoNumbers) === 34 || Number(firstTwoNumbers) === 37,
      isDiscover:
        Number(firstTwoNumbers) === 65 ||
        Number(firstFourNumbers) === 6011 ||
        (Number(firstFourNumbers) >= 644 && Number(firstFourNumbers) <= 649) ||
        (Number(firstSixNumbers) >= 622126 &&
          Number(firstSixNumbers) <= 622925),
      isJcb:
        Number(firstFourNumbers) >= 3528 && Number(firstFourNumbers) <= 3589,
      isDiners:
        Number(firstTwoNumbers) === 30 ||
        Number(firstTwoNumbers) === 36 ||
        Number(firstTwoNumbers) === 38 ||
        Number(firstTwoNumbers) === 39,
      isMir:
        Number(firstFourNumbers) >= 2200 && Number(firstFourNumbers) <= 2204,
    };
  }

  activateBagesStatus(status) {
    this.amexEl.classList.toggle(
      "card-validator__badges-item--active",
      status.isAmex,
    );
    this.visaEl.classList.toggle(
      "card-validator__badges-item--active",
      status.isVisa,
    );
    this.maestroEl.classList.toggle(
      "card-validator__badges-item--active",
      status.isMaestrocard,
    );
    this.discoverEl.classList.toggle(
      "card-validator__badges-item--active",
      status.isDiscover,
    );
    this.jcbEl.classList.toggle(
      "card-validator__badges-item--active",
      status.isJcb,
    );
    this.dinersEl.classList.toggle(
      "card-validator__badges-item--active",
      status.isDiners,
    );
    this.mirEl.classList.toggle(
      "card-validator__badges-item--active",
      status.isMir,
    );
  }

  onInput = () => {
    this.sanitazeField();

    this.checkButtonState();

    const validateStatus = this.validateBadgesStatus();

    this.activateBagesStatus(validateStatus);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const status = validationCheck(this.field.value);

    alert(`Card number is ${status}`);
  };
}

export default CardValidator;
