---
name: writing-tests
description: 'Write and review automated tests for this project following the official testing guidelines. Use when creating or changing code that needs test coverage, when adding unit / integration / E2E tests, when structuring tests with Arrange-Act-Assert or Given-When-Then, when using stubs/spies/mocks, or when checking coverage. Tooling: Vitest (run/write), Sinon (stub, spy, mock), Playwright (E2E). Triggers: "write tests", "add a test", "unit test", "integration test", "e2e test", "coverage", "test this".'
---

# Writing Tests

Authoritative workflow for authoring and reviewing tests in this project. This
skill is the single source of truth for how tests are written and reviewed.

## When to Use

- You created or modified code and it needs automated test coverage.
- You are adding or refactoring unit, integration, or E2E tests.
- You need to pick the right test level, structure, or tooling.
- You are reviewing tests for independence, repeatability, and clear assertions.

## Tooling

- **Vitest** — write and run tests.
- **Sinon** — test doubles: `stub`, `spy`, `mock`. (Vitest's `vi.fn()`/`vi.mock()` is also acceptable for simple mocks.)
- **Playwright** — end-to-end tests.

## Test Levels & Location

| Level | Scope | Location |
|-------|-------|----------|
| Unit | Isolated domain concept | `test/units` |
| Integration | More than one layer together (e.g. real HTTP endpoint) | `test/integration` |
| E2E | Full flow including the frontend | `e2e/tests` |

- Unit tests for domain concepts.
- Integration tests when more than one layer is involved.
- E2E (Playwright) for the complete end-to-end flow.

> Integration tests expect the API on http://localhost:3010 with migrations
> applied. E2E tests also need the frontend on http://localhost:5173.

## Procedure

1. **Pick the level.** Choose unit, integration, or E2E based on how many layers
   the behavior spans. Prefer the narrowest level that meaningfully covers the risk.
2. **Structure the test.** Use Arrange-Act-Assert (or Given-When-Then) with three
   clear blocks per test.
3. **Keep tests independent.** No shared state or ordering dependencies — each test
   must pass in isolation and in parallel.
4. **Extract common setup.** Put shared initialization in `beforeEach`.
5. **Clean up resources.** Close external resources (DB connections, servers) in
   `afterEach`.
6. **Make it repeatable.** Replace changing external dependencies (APIs, clocks,
   random data) with stubs/mocks so the result is deterministic. Use `test.each`
   for multiple isolated cases.
7. **Assert specifically.** One explicit expectation per validated piece of data.
   Avoid broad tests that cover too much and run slowly.
8. **Cover the behavior.** Ensure new/changed code is covered; aim for >80% of
   risk and change.
9. **Run and verify** using the commands below.

## Commands

Run from the project root:

```bash
# Run all unit + integration tests (watch mode)
yarn test

# Run with coverage report (output in coverage/, open coverage/index.html)
yarn test:coverage
```

E2E (from `e2e/`, requires backend on 3010 and frontend on 5173):

```bash
cd e2e
yarn install
npx playwright install   # first run only
npx playwright test
```

## Patterns (copy-ready)

Arrange-Act-Assert unit test:

```ts
import { test, expect } from "vitest";
import { validateName } from "../../src/validateName";

test("Should validate a full name", () => {
  // Arrange
  const name = "Joe Doe";
  // Act
  const isValid = validateName(name);
  // Assert
  expect(isValid).toBe(true);
});
```

Parameterized, independent cases:

```ts
import { test, expect } from "vitest";
import { validateCpf } from "../../src/validateCpf";

test.each(["97456321558", "71428793860"])(
  "Should verify if is a valid CPF for value: %s",
  (cpf: string) => {
    expect(validateCpf(cpf)).toBe(true);
  },
);
```

Setup/teardown with external resources:

```ts
import { beforeEach, afterEach, test, expect } from "vitest";
import { DBConnection } from "../../db/DBConnection";

let connection: DBConnection;

beforeEach(() => {
  connection = new DBConnection();
});

afterEach(async () => {
  await connection.close();
});
```

Stub/mock to remove external dependencies:

```ts
import { test } from "vitest";
import sinon from "sinon";

test("Should call the repository once", async () => {
  const repository = { save: sinon.stub().resolves() };
  await repository.save({ name: "Joe Doe" });
  sinon.assert.calledOnce(repository.save);
});
```

## Checklist

- [ ] Correct level (unit / integration / E2E) and location.
- [ ] Arrange-Act-Assert (or Given-When-Then) structure.
- [ ] Independent and repeatable (no shared state, deterministic).
- [ ] Shared setup in `beforeEach`; external resources closed in `afterEach`.
- [ ] External dependencies stubbed/mocked.
- [ ] Explicit expectation for every validated value.
- [ ] New/changed code covered (>80% of risk and change).
