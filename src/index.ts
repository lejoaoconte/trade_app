import express, { type Request, type Response } from "express";
import cors from "cors";
import pgp from "pg-promise";
import crypto from "crypto";
import { validateCpf } from "./validateCpf";
import { validateName } from "./validateName";

const app = express();
app.use(cors());
app.use(express.json());

const connection = pgp()(
  "postgresql://postgres:postgres@localhost:5432/postgres",
);

app.post("/signup", async (req: Request, res: Response) => {
  const accountId = crypto.randomUUID();
  const input = req.body;
  if (!validateName(input.name)) {
    return res.json({
      error: "Invalid name",
    });
  }
  if (!input.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)) {
    return res.json({
      error: "Invalid password",
    });
  }
  if (!input.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    return res.json({
      error: "Invalid email",
    });
  }
  if (!validateCpf(input.document)) {
    return res.json({
      error: "Invalid document",
    });
  }
  await connection.query(
    "insert into tradeapp.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)",
    [accountId, input.name, input.email, input.document, input.password],
  );
  res.json({
    accountId,
  });
});

app.get("/accounts/:accountId", async (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  const [account] = await connection.query(
    "select * from tradeapp.account where account_id = $1",
    [accountId],
  );
  const output = {
    accountId: account.account_id,
    name: account.name,
    email: account.email,
    document: account.document,
  };
  res.json(output);
});

app.listen(3010);
