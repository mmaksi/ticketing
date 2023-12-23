import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { findUser } from '../models/users/users.model';
import { signUp } from '../controllers/user.controller';
import { requestValidator } from '../middlewares/request-validator';
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }),
  ],
  requestValidator,
  signUp,
);

export { router as signupRouter };
