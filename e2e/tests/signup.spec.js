// @ts-check
import { test, expect } from "@playwright/test";

test("Should create a account", async ({ page }) => {
  const input = {
    name: "Joe Doe",
    email: "joe.doe@gmail.com",
    document: "29860506035",
    password: "123QWe++",
  };

  await page.goto("http://localhost:5173");
  await page.locator(".input-name").fill(input.name);
  await page.locator(".input-email").fill(input.email);
  await page.locator(".input-document").fill(input.document);
  await page.locator(".input-password").fill(input.password);
  await page.locator(".button-signup").click();

  await expect(page.locator(".span-message")).toHaveText(
    "Signup successful!",
  );
});


test("Should not create account with invalid name", async ({ page }) => {
  const input = {
    name: "J",
    email: "joe.doe@gmail.com",
    document: "29860506035",
    password: "123QWe++",
  };

  await page.goto("http://localhost:5173");
  await page.locator(".input-name").fill(input.name);
  await page.locator(".input-email").fill(input.email);
  await page.locator(".input-document").fill(input.document);
  await page.locator(".input-password").fill(input.password);
  await page.locator(".button-signup").click();

  await expect(page.locator(".span-message")).toHaveText(
    "Invalid name",
  );
});