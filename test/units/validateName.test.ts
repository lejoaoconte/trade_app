import { expect, test } from "vitest";
import { validateName } from "../../src/validateName";
test("Should validate name correctly", () => {
  expect(validateName("John Doe")).toBe(true);
  expect(validateName("")).toBe(false);
  expect(validateName(" ")).toBe(false);
  expect(validateName("A")).toBe(false);
  expect(validateName("John123")).toBe(false);
  expect(validateName("John_Doe")).toBe(false);
  expect(validateName("John-Doe")).toBe(false);
});

test.each(["João Conte", "Antônio Araújo", "Cecília Gonçalves", "Luís Ândrade"])(
  "Should validate Portuguese accented name: %s",
  (name: string) => {
    expect(validateName(name)).toBe(true);
  },
);