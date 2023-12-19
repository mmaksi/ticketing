import express, { Request, Response } from 'express';
import { body } from 'express-validator';
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }),
  ],
  (req: Request, res: Response) => {
    return res.send('signup');
  },
);

export { router as signupRouter };
