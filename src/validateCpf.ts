const VALID_CPF_LENGTH = 11;
const FACTOR_DIGIT_1 = 10;
const FACTOR_DIGIT_2 = 11;

export function validateCpf(cpf: string) {
  if (!cpf) return false;
  cpf = removeNonDigits(cpf);
  if (cpf.length !== VALID_CPF_LENGTH) return false;
  if (areAllDigitsTheSame(cpf)) return false;
  const digit1 = calculateDigit(cpf, FACTOR_DIGIT_1);
  const digit2 = calculateDigit(cpf, FACTOR_DIGIT_2);
  const checkDigits = extractCheckDigits(cpf);
  return checkDigits === `${digit1}${digit2}`;
}

function removeNonDigits(cpf: string) {
  return cpf.replace(/[^\d]+/g, "");
}

function areAllDigitsTheSame(cpf: string) {
  const [firstDigit] = cpf;
  return [...cpf].every((digit: string) => digit === firstDigit);
}

function calculateDigit(cpf: string, factor: number) {
  let sum = 0;
  for (const digit of cpf) {
    if (factor < 2) break;
    sum += parseInt(digit) * factor--;
  }
  const remaining = sum % VALID_CPF_LENGTH;
  return remaining < 2 ? 0 : VALID_CPF_LENGTH - remaining;
}

function extractCheckDigits(cpf: string) {
  return cpf.slice(9);
}
