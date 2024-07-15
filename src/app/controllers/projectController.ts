import { Request, Response } from 'express';

class ProjectController {
  async index(res: Response, req: Request) {
    res.send({ ok: 'deu tudo certo' });
  }
}

export const projectController = new ProjectController();
