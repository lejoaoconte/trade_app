import { test, expect } from "vitest";
import { validateCpf } from "../../src/validateCpf";

test.each(["97456321558", "71428793860", "87748248800"])(
  "Should verify if is a valid CPF for value: %s",
  (cpf: string) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(true);
  },
);

test.each([
  "97456321550",
  "11111111111",
  null,
  undefined,
  "974563215581000000000",
])(
  "Should verify if is an invalid CPF for value: %s",
  (cpf: string | null | undefined) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(false);
  },
);
