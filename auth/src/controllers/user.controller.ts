import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { createUser, findUser } from '../models/users/users.model';
import { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';

interface RequestBody {
  email: string;
  password: string;
}

const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body as RequestBody;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const existingUser = await findUser(email);

  if (existingUser) {
    throw new BadRequestError('Email already in use');
  }
  const user = await createUser(email, password);
  return res.status(201).json(user);
};

export { signUp };
