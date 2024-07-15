import { Request, Response } from 'express';
import { User } from '../models/user';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const authConfig = require('../../config/auth.json');

const genereteToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
};

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res.status(400).send({ errro: 'Email já cadastrado' });
      }

      const user = await User.create(req.body);

      res.json({
        user,
        token: genereteToken({ id: user.id }),
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: 'Erro fazer login' });
    }
  }

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) return res.status(401).send({ errro: 'Usuário não encontrado' });

    if (!(await compare(password, user.password))) {
      return res.status(401).send({ error: 'Senha ou email não encontrado' });
    }

    res.json({
      user,
      token: genereteToken({ id: user.id }),
    });
  }
}

export const authController = new AuthController();
