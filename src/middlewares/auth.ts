import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const authConfig = require('../config/auth.json');

interface CustomRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'Token não informado' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$^/i.test(scheme)) {
    return res.status(401).send({ error: 'Token mal formatado' });
  }

  jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido' });
    }

    req.userId = decoded.id;
    return next();
  });
};
