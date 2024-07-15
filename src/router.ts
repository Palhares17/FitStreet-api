import { Router } from 'express';
import { authController } from './app/controllers/authController';
// import { authMiddleware } from './middlewares/auth';
import { projectController } from './app/controllers/projectController';

export const router = Router();

router.get('/', async (req, res) => {
  res.send('Hello, World!');
});

// router.use('/projects', authMiddleware);

router.post('/auth/register', (req, res) => authController.register(req, res));
router.post('/auth/authenticate', (req, res) =>
  authController.authenticate(req, res)
);
// router.get('/projects', projectController.index);