import { expect, test } from "vitest";

test("Should create a account", async () => {
  const input = {
    name: "Joe Doe",
    email: "joe.doe@gmail.com",
    document: "29860506035",
    password: "123QWe++",
  };

  const responseSignup = await fetch("http://localhost:3010/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const outputSignup = await responseSignup.json();
  expect(outputSignup.accountId).toBeDefined();

  const responseGetAccount = await fetch(
    `http://localhost:3010/accounts/${outputSignup.accountId}`,
  );
  const outputGetAccount = await responseGetAccount.json();

  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.document).toBe(input.document);
});

test("Should not create a account with invalid name", async () => {
  const input = {
    name: "Joe",
    email: "joe.doe@gmail.com",
    document: "29860506035",
    password: "123QWe++",
  };

  const responseSignup = await fetch("http://localhost:3010/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const outputSignup = await responseSignup.json();
  expect(outputSignup.error).toBe("Invalid name");
});


test("Should not create a account with invalid email", async () => {
  const input = {
    name: "Joe Doe",
    email: "joe.doe@gmail",
    document: "29860506035",
    password: "123QWe++",
  };

  const responseSignup = await fetch("http://localhost:3010/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const outputSignup = await responseSignup.json();
  expect(outputSignup.error).toBe("Invalid email");
});


test("Should not create a account with invalid document", async () => {
  const input = {
    name: "Joe Doe",
    email: "joe.doe@gmail.com",
    document: "2986050603aa",
    password: "123QWe++",
  };

  const responseSignup = await fetch("http://localhost:3010/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const outputSignup = await responseSignup.json();
  expect(outputSignup.error).toBe("Invalid document");
});

test("Should not create a account with invalid password", async () => {
  const input = {
    name: "Joe Doe",
    email: "joe.doe@gmail.com",
    document: "29860506035",
    password: "123", 
  };

  const responseSignup = await fetch("http://localhost:3010/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const outputSignup = await responseSignup.json();
  expect(outputSignup.error).toBe("Invalid password");
});