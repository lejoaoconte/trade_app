---
name: code-standards
description: 'Coding standards for this project (TypeScript, Express, pg-promise, React). Use whenever you create, modify, refactor or review code, in the backend (src, db) or the frontend (frontend/react/src): function length, number of parameters, early returns, nested ternaries, empty try/catch, magic numbers/strings, blank lines in functions, comments, variable declaration placement. Make sure to apply it before writing any new code, even for small changes, and when asked to "review", "clean up" or "refactor" code.'
---

# Coding Standards

Examples use the project's stack: TypeScript, Express, pg-promise and React.

## 1. Do not write methods longer than 30 lines

Split long functions into small, well-named helpers.

```ts
// Bad: validation, persistence and response mixed in one handler
app.post("/signup", async (req, res) => {
  // ...40+ lines
});

// Good
app.post("/signup", async (req, res) => {
  const input = parseSignupInput(req.body);
  if (!isValidSignup(input)) return res.status(422).json({ message: INVALID_SIGNUP });
  const accountId = await createAccount(input);
  return res.status(201).json({ accountId });
});
```

## 2. Do not pass more than 3 parameters; prefer objects

```ts
// Bad
function createAccount(name: string, email: string, cpf: string, password: string) {}

// Good
type CreateAccountInput = { name: string; email: string; cpf: string; password: string };
function createAccount(input: CreateAccountInput) {}
```

The same applies to React components: group related props into an object type.

## 3. Declare variables as close as possible to where they are used

```ts
// Bad
async function signup(input: SignupInput) {
  const accountId = crypto.randomUUID();
  if (!validateCpf(input.cpf)) throw new Error(INVALID_CPF);
  await connection.query(INSERT_ACCOUNT, [accountId, input.cpf]);
}

// Good
async function signup(input: SignupInput) {
  if (!validateCpf(input.cpf)) throw new Error(INVALID_CPF);
  const accountId = crypto.randomUUID();
  await connection.query(INSERT_ACCOUNT, [accountId, input.cpf]);
}
```

## 4. Never use an empty try/catch

Handle the error, rethrow it, or let it propagate.

```ts
// Bad
try {
  await connection.query(INSERT_ACCOUNT, [accountId]);
} catch (error) {}

// Good
try {
  await connection.query(INSERT_ACCOUNT, [accountId]);
} catch (error) {
  logger.error({ error }, "Failed to insert account");
  throw error;
}
```

## 5. Do not leave blank lines inside methods and functions

Blank lines inside a function body are a sign it should be split into smaller functions.

```ts
// Bad
export function validateName(name: string): boolean {
  const trimmed = name.trim();

  if (!trimmed) return false;

  return NAME_REGEX.test(trimmed);
}

// Good
export function validateName(name: string): boolean {
  const trimmed = name.trim();
  if (!trimmed) return false;
  return NAME_REGEX.test(trimmed);
}
```

## 6. Avoid unnecessary comments

The code should express its intent clearly. Prefer descriptive names over comments.

```ts
// Bad
// checks if the cpf has 11 digits
if (cpf.length === 11) {}

// Good
const hasValidLength = cpf.length === CPF_LENGTH;
if (hasValidLength) {}
```

## 7. Always create constants for numbers or strings with important meaning

```ts
// Bad
if (cpf.length !== 11) throw new Error("Invalid CPF");
res.status(422);

// Good
const CPF_LENGTH = 11;
const INVALID_CPF = "Invalid CPF";
const HTTP_UNPROCESSABLE_ENTITY = 422;
if (cpf.length !== CPF_LENGTH) throw new Error(INVALID_CPF);
res.status(HTTP_UNPROCESSABLE_ENTITY);
```

## 8. Do not nest more than 2 if/else; prefer early returns

```ts
// Bad
function signup(input: SignupInput) {
  if (input.name) {
    if (input.email) {
      if (input.cpf) {
        return save(input);
      }
    }
  }
}

// Good
function signup(input: SignupInput) {
  if (!input.name) return;
  if (!input.email) return;
  if (!input.cpf) return;
  return save(input);
}
```

## 9. Do not nest ternaries

```tsx
// Bad
const label = isLoading ? "Loading..." : hasError ? "Error" : "Done";

// Good
function getStatusLabel({ isLoading, hasError }: StatusFlags): string {
  if (isLoading) return LOADING_LABEL;
  if (hasError) return ERROR_LABEL;
  return DONE_LABEL;
}
```

In React, this also applies to conditional rendering in JSX: extract the branches into small components or helper functions.
