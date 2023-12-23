import express from 'express';
import { body } from 'express-validator';
import { signIn } from '../controllers/user.controller';
import { requestValidator } from '../middlewares/request-validator';
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  requestValidator,
  signIn,
);

export { router as signinRouter };
