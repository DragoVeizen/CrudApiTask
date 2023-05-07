import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'testuser',
    password: 'test123',
    database: 'mydb'
  }
};

export default config;
