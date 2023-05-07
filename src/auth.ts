import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from './user';
import { Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET || 'mysecret';
export interface AuthRequest extends Request {
  user?: User;
}

export function generateToken(user: User): string {
  const payload = { id: user.id, username: user.username };
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}




export const authenticate = (req: AuthRequest, res: Response, next: () => void) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Authorization header missing');
  }
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).send('Invalid authorization header');
  }
  try {
    const decoded = jwt.verify(token, secret || '');
    req.user = decoded as User;
    next();
  } catch (error) {
    return res.status(401).send('Invalid token');
  }
};