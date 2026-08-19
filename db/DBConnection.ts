import pgp from "pg-promise";
import { getConnectionString } from "./config";

export default interface DatabaseConnection {
  query(statement: string, params: any): Promise<any>;
  close(): Promise<void>;
}

export class PgPromiseAdapter implements DatabaseConnection {
  connection: any;

  constructor() {
    this.connection = pgp()(getConnectionString());
  }

  query(statement: string, params: any) {
    return this.connection.query(statement, params);
  }

  close() {
    return this.connection.$pool.end();
  }
}
