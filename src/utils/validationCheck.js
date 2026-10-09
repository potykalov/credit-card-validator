import checkLuhn from "./checkLuhn.js";

function validationCheck(cardNumber) {
  const isValidate = checkLuhn(cardNumber);
  const message = isValidate ? "VALID" : "NO VALID";

  return message;
}

export default validationCheck;
