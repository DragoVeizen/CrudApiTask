export interface User {
    id?: number;
    username: string;
    password: string;
  }
import knex from './db';
import { hashPassword } from './auth';

export async function createUser(user: User): Promise<User> {
  const hashedPassword = await hashPassword(user.password);
  const [createdUser] = await knex('users')
    .insert({ ...user, password: hashedPassword })
    .returning('*');
  return createdUser;
}

export async function getUserByUsername(username: string): Promise<User | undefined> {
  return knex('users').where({ username }).first();
}
