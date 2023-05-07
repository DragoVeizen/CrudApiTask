import db from './db';
import knex from 'knex';

export interface Item {
  id?: number;
  name: string;
  description: string;
  price: number;
}

export async function createItem(item: Item): Promise<Item> {
  const [id] = await db('items').insert(item);
  return { id, ...item };
}

export async function getItemById(id: number): Promise<Item | undefined> {
  const [item] = await db('items').where({ id });
  return item;
}

export async function updateItem(id: number, updates: Partial<Item>): Promise<Item | undefined> {
  await db('items').where({ id }).update(updates);
  return await getItemById(id);
}

export async function deleteItem(id: number): Promise<number> {
    const numDeleted = await knex('items').where({ id }).delete();
    return numDeleted;
  }

export async function getAllItems(): Promise<Item[]> {
  return db('items').select('*');
}
