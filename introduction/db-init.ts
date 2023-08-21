import { Page } from "./http-init";
import { ServerResponse } from "http";
import { createConnection, Connection } from 'mysql2';

class User implements Page {
  page(response: ServerResponse): void {
    const database: Database = Database.getInstance();

    database.query('SELECT * FROM `user`', (err, results) => {
      response.end(JSON.stringify(results));
    });
  }
}

class Database {
  private static instance: Database;
  private connection: Connection;
  private constructor(connection: Connection) {
    this.connection = connection;
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database(createConnection({ host: 'localhost', user: 'root', "password": "qwer1234", database: 'test' }));
    }
    return Database.instance;
  }

  query(sql: string, callback: (err: any, results: any) => void): void {
    this.connection.query('SELECT * FROM `user`', callback);
  }
}